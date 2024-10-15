import { and, eq } from "drizzle-orm";
import { db } from "../../../db/db";
import { UUID } from "crypto";
import { follows } from "../../../db/schemas";
import { RecordNotFoundErr } from "../../../errors/RecordNotFoundErr";

export const unfollowToService = async (followerId: UUID, followedId: UUID) => {
  const result = await db
    .delete(follows)
    .where(
      and(
        eq(follows.followerId, followerId),
        eq(follows.followedId, followedId)
      )
    )
    .execute();

  if (result.rowsAffected === 0) throw new RecordNotFoundErr();
};
