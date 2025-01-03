import {
  decimal,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { userTable } from "./auth";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

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

export const ticketTable = pgTable("ticket", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  price: decimal("price"),
  limit: integer("limit"),
  perks: text("perks"),
  eventId: integer("event_id")
    .notNull()
    .references(() => eventTable.id),
});

export const ticketResponseTable = pgTable("ticket-response", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  ticketId: integer("ticket_id")
    .notNull()
    .references(() => ticketTable.id),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
});

export type EventInsertType = InferInsertModel<typeof eventTable>;
export type EventSelectType = InferSelectModel<typeof eventTable>;

export type TicketInsertType = InferInsertModel<typeof ticketTable>;
export type TicketSelectType = InferSelectModel<typeof ticketTable>;

export type TicketResponseInsertType = InferInsertModel<
  typeof ticketResponseTable
>;
export type TicketResponseSelectType = InferSelectModel<
  typeof ticketResponseTable
>;
