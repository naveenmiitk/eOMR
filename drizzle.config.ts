import type { Config } from "drizzle-kit";
import { defineConfig } from "drizzle-kit";
import { env } from "@/lib/env.mjs";
import 'dotenv/config';

// export default {
//   schema: "./src/lib/db/schema",
//   out: "./src/lib/db/migrations",
//   // driver: "",
//   dialect : "postgresql", 
//   verbose : true,
//   dbCredentials: {
//     connectionString: process.env.DATABASE_URL!,
//   }
// } satisfies Config;

export default defineConfig({
  schema: "./src/lib/db/schema",
  out: "./src/lib/db/migrations",
  dialect : "postgresql", 
  verbose : true,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  strict : true, 
})
