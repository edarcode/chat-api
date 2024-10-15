import { sql } from "drizzle-orm";
import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export enum Role {
  client = "CLIENT",
  admin = "ADMIN",
}

export const accounts = sqliteTable("accounts", {
  id: text("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  role: text("role", { enum: [Role.admin, Role.client] }).default(Role.client),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  name: text("name"),
  img: text("img").unique(),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updateAt: text("updated_at")
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export const follows = sqliteTable(
  "follows",
  {
    followerId: text("follower_id", { length: 36 })
      .notNull()
      .references(() => accounts.id, { onDelete: "cascade" }),
    followedId: text("followed_id", { length: 36 })
      .notNull()
      .references(() => accounts.id, { onDelete: "cascade" }),

    createdAt: text("created_at")
      .default(sql`(CURRENT_TIMESTAMP)`)
      .notNull(),
  },
  (follows) => {
    return {
      id: primaryKey({
        columns: [follows.followerId, follows.followedId],
      }),
    };
  }
);

export const messages = sqliteTable("messages", {
  id: text("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updateAt: text("updated_at")
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  text: text("text").notNull(),

  senderId: text("sender_id")
    .notNull()
    .references(() => accounts.id, { onDelete: "cascade" }),
  receiverId: text("receiver_id")
    .notNull()
    .references(() => accounts.id, { onDelete: "cascade" }),
});

export type InsertAccount = typeof accounts.$inferInsert;
export type SelectAccount = typeof accounts.$inferSelect;

export type InsertFollows = typeof follows.$inferInsert;
export type SelectFollows = typeof follows.$inferSelect;

export type InsertMessages = typeof messages.$inferInsert;
export type SelectMessages = typeof messages.$inferSelect;
