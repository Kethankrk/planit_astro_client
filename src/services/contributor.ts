import { db } from "@/db";
import { userTable } from "@/db/schema/auth";
import {
  contributorsCallResponseTable,
  contributorsCallTable,
  type ContributorsCallInsertType,
  type ContributorsCallResponseInsertType,
  type ContributorsCallSelectType,
} from "@/db/schema/contributors";
import { eq } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

type Contributor = {
  name: string | null;
  email: string | null;
  role: string | null;
};

interface IContributorService {
  create(inputData: ContributorsCallInsertType): Promise<number>;
  createResponse(
    inputData: ContributorsCallResponseInsertType
  ): Promise<number>;
  getAll(eventId: number): Promise<Contributor[]>;
  getCall(eventId: number): Promise<ContributorsCallSelectType[]>;
  getAllCall(): Promise<ContributorsCallSelectType[]>;
}

export class ContributorService implements IContributorService {
  public static instance: ContributorService;
  private db: PostgresJsDatabase;
  constructor() {
    this.db = db();
  }

  public static getInstance() {
    if (!ContributorService.instance) {
      ContributorService.instance = new ContributorService();
    }
    return ContributorService.instance;
  }

  async create(inputData: ContributorsCallInsertType): Promise<number> {
    const [contributorCall] = await this.db
      .insert(contributorsCallTable)
      .values(inputData)
      .returning({ id: contributorsCallTable.id });

    return contributorCall.id;
  }

  async createResponse(
    inputData: ContributorsCallResponseInsertType
  ): Promise<number> {
    const [response] = await this.db
      .insert(contributorsCallResponseTable)
      .values(inputData)
      .returning({ id: contributorsCallResponseTable.id });

    return response.id;
  }

  async getAll(eventId: number): Promise<Contributor[]> {
    const contributors = await this.db
      .select({
        name: userTable.username,
        email: userTable.email,
        role: contributorsCallTable.role,
      })
      .from(contributorsCallResponseTable)
      .leftJoin(
        contributorsCallTable,
        eq(contributorsCallTable.id, contributorsCallResponseTable.callId)
      )
      .leftJoin(
        userTable,
        eq(userTable.id, contributorsCallResponseTable.userId)
      )
      .where(eq(contributorsCallTable.eventId, eventId));

    return contributors;
  }

  async getCall(eventId: number): Promise<ContributorsCallSelectType[]> {
    return await this.db
      .select()
      .from(contributorsCallTable)
      .where(eq(contributorsCallTable.eventId, eventId));
  }
  async getAllCall(): Promise<ContributorsCallSelectType[]> {
    return await this.db.select().from(contributorsCallTable);
  }
}
