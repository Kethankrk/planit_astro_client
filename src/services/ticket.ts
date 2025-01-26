import { db } from "@/db";
import {
  ticketResponseTable,
  ticketTable,
  type TicketInsertType,
  type TicketResponseSelectType,
  type TicketSelectType,
} from "@/db/schema/event";
import { CustomError } from "@/lib/api";
import { and, eq, getTableColumns } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

type EventUpdateType = Pick<
  TicketInsertType,
  "title" | "price" | "limit" | "perks"
>;

interface ITicketService {
  create(ticketData: TicketInsertType): Promise<number>;
  get(id: number): Promise<TicketSelectType | null>;
  getAll(eventId: number): Promise<TicketSelectType[]>;
  update(id: number, ticketData: EventUpdateType): Promise<void>;
  ticketsFromOneEvent(
    eventId: number,
    email: string
  ): Promise<TicketSelectType[]>;
  getResponse(id: number): Promise<TicketResponseSelectType>;
}

export class TicketService implements ITicketService {
  private static instance: TicketService;
  private db: PostgresJsDatabase;
  constructor() {
    this.db = db();
  }

  public static getInstance(): TicketService {
    if (!TicketService.instance) {
      TicketService.instance = new TicketService();
    }
    return TicketService.instance;
  }

  async create(ticketData: TicketInsertType): Promise<number> {
    const [ticket] = await this.db
      .insert(ticketTable)
      .values(ticketData)
      .returning({ id: ticketTable.id });

    if (!ticket) {
      throw new CustomError("Ticket creation failed", 500);
    }
    return ticket.id;
  }

  async get(id: number): Promise<TicketSelectType | null> {
    const [ticket] = await this.db
      .select()
      .from(ticketTable)
      .where(eq(ticketTable.id, id));
    return ticket;
  }

  async getResponse(id: number): Promise<TicketResponseSelectType> {
    const [response] = await this.db
      .select()
      .from(ticketResponseTable)
      .where(eq(ticketResponseTable.id, id));
    return response;
  }

  async getAll(eventId: number): Promise<TicketSelectType[]> {
    const tickets = await this.db
      .select()
      .from(ticketTable)
      .where(eq(ticketTable.eventId, eventId));

    return tickets;
  }

  async update(id: number, ticketData: EventUpdateType): Promise<void> {
    await this.db
      .update(ticketTable)
      .set(ticketData)
      .where(eq(ticketTable.id, id));
  }

  async ticketsFromOneEvent(
    eventId: number,
    email: string
  ): Promise<TicketSelectType[]> {
    return await this.db
      .select({ ...getTableColumns(ticketTable) })
      .from(ticketTable)
      .leftJoin(
        ticketResponseTable,
        eq(ticketResponseTable.ticketId, ticketTable.id)
      )
      .where(
        and(
          eq(ticketTable.eventId, eventId),
          eq(ticketResponseTable.email, email)
        )
      );
  }
}
