import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/lib/env.mjs";
import 'dotenv/config';

export const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client);