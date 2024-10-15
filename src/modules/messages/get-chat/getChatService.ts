import { UUID } from "crypto";
import { db } from "../../../db/db";

export const getChatService = async (senderId: UUID, receiverId: UUID) => {
  const msgSent = await db.query.messages.findMany({
    where: (messages, { eq, and }) =>
      and(eq(messages.senderId, senderId), eq(messages.receiverId, receiverId)),
    orderBy: (messages, { desc }) => [desc(messages.createdAt)],
    limit: 2,
  });

  const msgReceived = await db.query.messages.findMany({
    where: (messages, { eq, and }) =>
      and(eq(messages.senderId, receiverId), eq(messages.receiverId, senderId)),
    orderBy: (messages, { desc }) => [desc(messages.createdAt)],
    limit: 2,
  });

  return [...msgSent, ...msgReceived].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
};
