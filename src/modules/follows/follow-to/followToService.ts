import { UUID } from "crypto";
import { db } from "../../../db/db";
import { follows } from "../../../db/schemas";

export const followToService = async (followerId: UUID, followedId: UUID) => {
  await db.insert(follows).values({ followerId, followedId });
};
