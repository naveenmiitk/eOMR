import { LinkTestToModule, getAllModule, getUserIdByEmail, subscribeUserToModule } from "@/lib/db/queries/queries";
import { adminProcedure, publicProcedure, router } from "@/lib/server/trpc";
import { z } from "zod";

export const adminRouter = router({
    getAllModuleTrpc : adminProcedure.query(async () => {
        const response = await getAllModule();
        return response;
    }), 

    getUserIdByEmailTrpc : adminProcedure.input(z.string()).query(async ({ input }) => {
        const response = await getUserIdByEmail(input);
        return response;
    }), 

    LinkTestToModuleTrpc : adminProcedure.input(z.object({
        testId : z.string().uuid({message: "Invalid Test-ID"}),
        moduleId : z.string().uuid({message: "Invalid Module-ID"}),
    })).mutation(async ({ input }) => {
        const response = await LinkTestToModule(input);
        return response;
    }), 

    subscribeUserToModuleTrpc : adminProcedure.input(z.object({
        userId : z.string().uuid({message: "Invalid User-ID"}),
        moduleId : z.string().uuid({message: "Invalid Module-ID"}),
        expiryDate : z.date(),
        isExpired : z.boolean(),
    })).mutation(async ({ input }) => {
        const response = await subscribeUserToModule(input);
        return response;
    }), 
})