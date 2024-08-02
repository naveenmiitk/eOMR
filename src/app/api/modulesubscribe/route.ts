import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db/index";
import { users } from "@/lib/db/schema/auth";
import { api } from "@/lib/trpc/api";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function PUT(request: Request) {
  const { session } = await getUserAuth();
  if (!session) return new Response("Error", { status: 400 });
  const body = (await request.json()) as { id: string };

  if (body.id === undefined)
    return new Response("ModuleId is undefined Error", { status: 400 });

  const today = new Date();
  const oneYearFromToday = new Date(
    today.getFullYear() + 1,
    today.getMonth(),
    today.getDate()
  );
  const data = {
    userId: session.user.id,
    moduleId: body.id,
    createdAt: today,
    expiryDate: oneYearFromToday,
    isExpired: false,
  };
  const subscribe = await api.users.subscribeUserToModuleTrpc
    .mutate(data)
    .catch((err) => {
      console.log(err);
      return new Response("User Didn't subscribed to Module Error", {
        status: 400,
      });
    });
  if (subscribe === undefined)
    return new Response("User Doesn't Exists Error", { status: 400 });

  revalidatePath("/testseries");
  revalidatePath("/subscribe");
  return new Response(JSON.stringify({ message: "ok" }), { status: 200 });
}
