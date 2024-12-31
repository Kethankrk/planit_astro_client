import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";

import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { db } from ".";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  username: text("username").notNull(),
  password: text("password").notNull(),
});

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const adapter = new DrizzlePostgreSQLAdapter(
  db(),
  sessionTable,
  userTable
);

export type UserInsertType = InferInsertModel<typeof userTable>;
export type UserSelectType = InferSelectModel<typeof userTable>;
export type SessionInsertType = InferInsertModel<typeof sessionTable>;
