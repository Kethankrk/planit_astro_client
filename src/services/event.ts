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
import { count, eq, getTableColumns, min } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

interface IEventService {
  create(data: EventInsertType): Promise<number>;
  get(id: number): Promise<EventSelectType>;
  getAllPaginated(page: number, limit: number): Promise<EventSelectType[]>;
  createResponse(responseData: TicketResponseInsertType): Promise<number>;
  getAllResponse(eventId: number): Promise<TicketResponseSelectType[]>;
}

export type EventListType = Omit<EventSelectType, "startAt" | "endingAt"> & {
  startAt: string;
  endingAt: string;
  startingPrice: number;
  attendees: number;
};

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

  async getAllPaginated(
    page: number,
    limit: number
  ): Promise<EventSelectType[]> {
    const events = await this.db
      .select()
      .from(eventTable)
      .limit(limit)
      .offset((page - 1) * limit);

    return events;
  }

  async getManagedEvents(userId: string): Promise<EventListType[]> {
    const events = await this.db
      .select({
        ...getTableColumns(eventTable),
        startingPrice: min(ticketTable.price),
        attendees: count(ticketResponseTable.id),
      })
      .from(eventTable)
      .leftJoin(ticketTable, eq(ticketTable.eventId, eventTable.id))
      .leftJoin(
        ticketResponseTable,
        eq(ticketResponseTable.ticketId, ticketTable.id)
      )
      .where(eq(eventTable.userId, userId))
      .groupBy(eventTable.id);

    return events.map((data) => ({
      ...data,
      startingPrice: Number(data.startingPrice),
      startAt: data.startAt.toLocaleString(),
      endingAt: data.endingAt.toLocaleString(),
    }));
  }
}
