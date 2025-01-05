import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { eventTable } from "./event";
import { userTable } from "./auth";

export const contributorsCallTable = pgTable("contributors-call", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  role: text("role").notNull(),
  eventId: integer("event_id")
    .notNull()
    .references(() => eventTable.id),
});

export const contributorsCallResponseTable = pgTable(
  "contributors-call-response",
  {
    id: serial("id").primaryKey(),
    bio: text("bio").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id),
    callId: integer("call_id")
      .notNull()
      .references(() => contributorsCallTable.id),
  }
);
