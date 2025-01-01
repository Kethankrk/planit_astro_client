import { db } from "@/db";
import { eventTable, type EventInsertType } from "@/db/schema/event";
import { CustomError } from "@/lib/api";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

interface IEventService {
  create(data: EventInsertType): Promise<number>;
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
}
