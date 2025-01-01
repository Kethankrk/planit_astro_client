import { db } from "@/db";
import {
  userTable,
  type UserInsertType,
  type UserSelectType,
} from "@/db/schema/auth";
import { eq } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

interface IUserService {
  create(user: UserInsertType): Promise<void>;
  getUserByEmail(email: string): Promise<UserSelectType>;
}

export class UserService implements IUserService {
  private db: PostgresJsDatabase;
  constructor() {
    this.db = db();
  }
  async create(user: UserInsertType): Promise<void> {
    await this.db.insert(userTable).values(user);
  }
  async getUserByEmail(email: string): Promise<UserSelectType> {
    const [user] = await this.db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));
    return user;
  }
}
