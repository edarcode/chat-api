import { relations } from "drizzle-orm/relations";
import { accounts, follows, messages } from "./schemas";

export const followsRelations = relations(follows, ({ one }) => ({
  account_followedId: one(accounts, {
    fields: [follows.followedId],
    references: [accounts.id],
    relationName: "follows_followedId_accounts_id",
  }),
  account_followerId: one(accounts, {
    fields: [follows.followerId],
    references: [accounts.id],
    relationName: "follows_followerId_accounts_id",
  }),
}));

export const accountsRelations = relations(accounts, ({ many }) => ({
  follows_followedId: many(follows, {
    relationName: "follows_followedId_accounts_id",
  }),
  follows_followerId: many(follows, {
    relationName: "follows_followerId_accounts_id",
  }),
  messages_receiverId: many(messages, {
    relationName: "messages_receiverId_accounts_id",
  }),
  messages_senderId: many(messages, {
    relationName: "messages_senderId_accounts_id",
  }),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  account_receiverId: one(accounts, {
    fields: [messages.receiverId],
    references: [accounts.id],
    relationName: "messages_receiverId_accounts_id",
  }),
  account_senderId: one(accounts, {
    fields: [messages.senderId],
    references: [accounts.id],
    relationName: "messages_senderId_accounts_id",
  }),
}));
