import { getUserAuth } from "@/lib/auth/utils";
import { api } from "@/lib/trpc/api";



export async function PUT(request: Request) {
  const { session } = await getUserAuth();
  if (!session) return new Response("Error", { status: 400 });
  const body = (await request.json()) as { moduleId: string; email: string };
  if(body.moduleId === undefined) return new Response("ModuleId is undefined Error", { status: 400 });
  if(body.email === undefined) return new Response("Email is undefiend Error", { status: 400 });

  const userId = await api.admin.getUserIdByEmailTrpc.query(body.email);

  if(!userId) return new Response("User Doesn't Exists Error", { status: 400 });

  // console.log(userId);

   const today = new Date();
    const oneYearFromToday = new Date(
      today.getFullYear() + 1,
      today.getMonth(),
      today.getDate()
    );
    const data = {
      moduleId: body.moduleId,
      userId: userId,
      createdAt: today,
      expiryDate : oneYearFromToday,
      isExpired : false,
    }

    // console.log(data);

    const subscribeUserToModule = api.admin.subscribeUserToModuleTrpc.mutate(data).catch((err) => {
      console.log(err);
      return new Response("User Didn't subscribed to Module Error", { status: 400 });
    })

    if(!subscribeUserToModule) return new Response("User Didn't subscribed to Module Error", { status: 400 });

  return new Response(JSON.stringify({ message: "ok" }), { status: 200 });
}