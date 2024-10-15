import { db } from "../../../db/db";
import { UUID } from "crypto";
import { RecordNotFoundErr } from "../../../errors/RecordNotFoundErr";
import { accounts, follows } from "../../../db/schemas";
import { eq } from "drizzle-orm";

export const getAccountService = async (accountId: UUID) => {
  const [account] = await db
    .select()
    .from(accounts)
    .where(eq(accounts.id, accountId))
    .limit(1);

  if (!account) throw new RecordNotFoundErr();

  const [followingTo, followedBy] = await Promise.all([
    db
      .select({
        id: accounts.id,
        name: accounts.name,
        img: accounts.img,
        email: accounts.email,
      })
      .from(follows)
      .where(eq(follows.followerId, accountId))
      .innerJoin(accounts, eq(accounts.id, follows.followedId)),

    db
      .select({
        id: accounts.id,
        name: accounts.name,
        img: accounts.img,
        email: accounts.email,
      })
      .from(follows)
      .where(eq(follows.followedId, accountId))
      .innerJoin(accounts, eq(accounts.id, follows.followerId)),
  ]);

  return { ...account, followingTo, followedBy };
};
