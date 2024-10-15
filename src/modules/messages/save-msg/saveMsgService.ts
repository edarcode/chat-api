import { SaveMsg } from "./saveMsgSchema";
import { db } from "../../../db/db";
import { UUID } from "crypto";
import { messages } from "../../../db/schemas";

export const saveMsgService = async (
  senderId: UUID,
  receiverId: UUID,
  { text }: SaveMsg
) => {
  await db.insert(messages).values({ senderId, receiverId, text });
};
