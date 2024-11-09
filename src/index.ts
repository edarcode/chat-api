import "./services/dotenv";
import { PORT, SERVER_ON } from "./server/consts";
import server from "./server/server";
import { Server } from "socket.io";
import http from "http";
import { saveMsgService } from "./modules/messages/save-msg/saveMsgService";

// socket.io

const httpServer = http.createServer(server);
const io = new Server(httpServer, { cors: { origin: process.env.CLIENT_URL } });

io.on("connection", (socket) => {
  console.log("clint connected", socket.id);

  socket.on("joinRoom", ({ senderId, receiverId }) => {
    const room = [senderId, receiverId].sort().join("-");
    socket.join(room);
  });

  socket.on("message", async (msg) => {
    const { senderId, receiverId, text } = msg;
    const room = [senderId, receiverId].sort().join("-");
    await saveMsgService(senderId, receiverId, { text });
    io.to(room).emit("message", text);
  });
});

// server-up

httpServer.listen(PORT, () => {
  console.log(SERVER_ON);
  // setInterval(ping, 14 * 60 * 1000);
});

const ping = async () => {
  await fetch(process.env.API_BASE_URL!);
  console.log("pong");
};
