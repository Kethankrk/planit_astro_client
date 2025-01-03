import { db } from "@/db";
import {
  eventTable,
  ticketResponseTable,
  ticketTable,
  type EventInsertType,
  type EventSelectType,
  type TicketResponseInsertType,
  type TicketResponseSelectType,
} from "@/db/schema/event";
import { CustomError } from "@/lib/api";
import { eq, getTableColumns } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

interface IEventService {
  create(data: EventInsertType): Promise<number>;
  get(id: number): Promise<EventSelectType>;
  createResponse(responseData: TicketResponseInsertType): Promise<number>;
  getAllResponse(eventId: number): Promise<TicketResponseSelectType[]>;
}

export class EventService implements IEventService {
  private db: PostgresJsDatabase;
  private static instance: EventService;
  constructor() {
    this.db = db();
  }

  static getInstance(): EventService {
    if (!EventService.instance) {
      EventService.instance = new EventService();
    }

    return EventService.instance;
  }

  async create(data: EventInsertType): Promise<number> {
    const [event] = await this.db
      .insert(eventTable)
      .values(data)
      .returning({ id: eventTable.id });

    if (!event) {
      throw new CustomError("Failed to create event", 500);
    }

    return event.id;
  }

  async get(id: number): Promise<EventSelectType> {
    const [event] = await this.db
      .select()
      .from(eventTable)
      .where(eq(eventTable.id, id));

    if (!event) {
      throw new CustomError("Event not found", 404);
    }
    return event;
  }

  async createResponse(
    responseData: TicketResponseInsertType
  ): Promise<number> {
    const [response] = await this.db
      .insert(ticketResponseTable)
      .values(responseData)
      .returning({ id: ticketResponseTable.id });

    return response.id;
  }

  async getAllResponse(eventId: number): Promise<TicketResponseSelectType[]> {
    const responses = await this.db
      .select({
        ...getTableColumns(ticketResponseTable),
      })
      .from(ticketResponseTable)
      .leftJoin(ticketTable, eq(ticketTable.id, ticketResponseTable.ticketId))
      .leftJoin(eventTable, eq(ticketTable.eventId, eventTable.id))
      .where(eq(eventTable.id, eventId));

    return responses;
  }
}
