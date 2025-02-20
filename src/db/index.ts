import "dotenv/config";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { sessionTable, userTable } from "./schema/auth";

export const db = () => {
  const client = postgres(process.env.DATABASE_URL!);
  return drizzle({ client, logger: true });
};

export const adapter = new DrizzlePostgreSQLAdapter(
  db(),
  sessionTable,
  userTable
);
