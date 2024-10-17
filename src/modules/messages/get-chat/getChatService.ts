import { UUID } from "crypto";
import { db } from "../../../db/db";

export const getChatService = async (senderId: UUID, receiverId: UUID) => {
  const messages = await db.query.messages.findMany({
    where: (messages, { eq, or, and }) =>
      or(
        and(
          eq(messages.senderId, senderId),
          eq(messages.receiverId, receiverId)
        ),
        and(
          eq(messages.senderId, receiverId),
          eq(messages.receiverId, senderId)
        )
      ),
    orderBy: (messages, { desc }) => [desc(messages.createdAt)],
    limit: 16,
  });

  return messages.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
};
