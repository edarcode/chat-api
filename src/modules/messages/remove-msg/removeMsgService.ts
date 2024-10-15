import { and, eq } from "drizzle-orm";
import { db } from "../../../db/db";
import { UUID } from "crypto";
import { messages } from "../../../db/schemas";
import { RecordNotFoundErr } from "../../../errors/RecordNotFoundErr";

export const removeMsgService = async (accountId: UUID, msgId: UUID) => {
  const result = await db
    .delete(messages)
    .where(and(eq(messages.senderId, accountId), eq(messages.id, msgId)))
    .execute();

  if (result.rowsAffected === 0) throw new RecordNotFoundErr();
};
