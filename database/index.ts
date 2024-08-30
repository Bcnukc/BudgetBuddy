import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";
import "dotenv/config";

export const db = drizzle(postgres(process.env.DATABASE_URL!), {
  schema,
  logger: true,
});
