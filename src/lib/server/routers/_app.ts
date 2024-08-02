import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { usersRouter } from "./users";
import { adminRouter } from "./admin";

export const appRouter = router({
  computers: computersRouter,
  users : usersRouter,
  admin : adminRouter, 
});

export type AppRouter = typeof appRouter;
