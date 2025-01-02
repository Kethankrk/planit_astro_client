import { db } from "@/db";
import {
  ticketTable,
  type TicketInsertType,
  type TicketSelectType,
} from "@/db/schema/event";
import { CustomError } from "@/lib/api";
import { eq } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

interface ITicketService {
  create(ticketData: TicketInsertType): Promise<number>;
  get(id: number): Promise<TicketSelectType | null>;
  getAll(eventId: number): Promise<TicketSelectType[]>;
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

  async getAll(eventId: number): Promise<TicketSelectType[]> {
    const tickets = await this.db
      .select()
      .from(ticketTable)
      .where(eq(ticketTable.eventId, eventId));

    return tickets;
  }
}
