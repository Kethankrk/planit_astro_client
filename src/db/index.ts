import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export const db = () => {
  const client = postgres(process.env.DATABASE_URL!);
  return drizzle({ client, logger: true });
};
