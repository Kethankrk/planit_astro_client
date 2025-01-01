import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { userTable } from "./auth";
import type { InferInsertModel } from "drizzle-orm";

export const eventTable = pgTable("event", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  startAt: timestamp("start_at").notNull(),
  endingAt: timestamp("ending_at").notNull(),
  banner: text("banner").notNull(),
  location: text("location").notNull(),
  requirements: text("requirements"),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
});

export type EventInsertType = InferInsertModel<typeof eventTable>;
export type EventSelectType = InferInsertModel<typeof eventTable>;
