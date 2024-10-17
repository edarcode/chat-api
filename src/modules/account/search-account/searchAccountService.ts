import { UUID } from "crypto";
import { db } from "../../../db/db";
import { RecordNotFoundErr } from "../../../errors/RecordNotFoundErr";
import { EdarErr } from "../../../errors/EdarErr";

export const searchAccountService = async (accountId: UUID, email: string) => {
  const accountFound = await db.query.accounts.findFirst({
    where: (accounts, { eq }) => eq(accounts.email, email),
    columns: { id: true, email: true, img: true },
  });

  if (!accountFound) throw new RecordNotFoundErr();
  if (accountFound.id === accountId)
    throw new EdarErr({ status: 400, msg: "Maní eres tú mismo." });

  const follow = await db.query.follows.findFirst({
    where: (follows, { eq, and }) =>
      and(
        eq(follows.followerId, accountId),
        eq(follows.followedId, accountFound.id)
      ),
  });

  return { ...accountFound, isReadyFolloweb: !!follow };
};
