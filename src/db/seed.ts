import "../services/dotenv";
import bcrypt from "bcrypt";
import { accounts, follows, Role } from "./schemas";
import { BCRYPT } from "../config/bcrypt";
import { db } from "./db";

const EDAR = {
  id: crypto.randomUUID(),
  email: process.env.ADMIN_EMAIL!,
  password: process.env.ADMIN_PASSWORD!,
  role: Role.admin,
};

const LORE = {
  id: crypto.randomUUID(),
  email: "lore@gmail.com",
  password: "123456",
};

const MYKE = {
  id: crypto.randomUUID(),
  email: "myke@gmail.com",
  password: "123456",
};

const seed = async () => {
  EDAR.password = await bcrypt.hash(EDAR.password, BCRYPT.salt);
  LORE.password = await bcrypt.hash(LORE.password, BCRYPT.salt);
  MYKE.password = await bcrypt.hash(MYKE.password, BCRYPT.salt);

  await db.delete(accounts).execute();
  await db.insert(accounts).values([EDAR, LORE, MYKE]);

  await db.insert(follows).values([
    { followerId: EDAR.id, followedId: LORE.id },
    { followerId: EDAR.id, followedId: MYKE.id },
    { followerId: LORE.id, followedId: EDAR.id },
  ]);
};

seed().catch(console.error);
