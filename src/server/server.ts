import express from "express";
import cors from "cors";
import { welcomeRouter } from "../modules/welcome/welcomeRoute";
import { routeNotFoundHandler } from "./routeNotFoundHandler";
import { errorHandler } from "./errHandler";
import { authRouter } from "../modules/auth/authRouter";
import { accountsRouter } from "../modules/account/accountsRouter";
import { followsRouter } from "../modules/follows/followsRouter";
import { messagesRouter } from "../modules/messages/messagesRouter";

// server

const server = express();

// middlewares

server.use(cors());
server.use(express.json());

// routes

server.use("", welcomeRouter);
server.use("/auth", authRouter);
server.use("/account", accountsRouter);
server.use("/follows", followsRouter);
server.use("/messages", messagesRouter);

// handlers

server.use(routeNotFoundHandler);
server.use(errorHandler);

export default server;
