import NextAuthProvider from "@/lib/auth/Provider";
import { getUserAuth } from "@/lib/auth/utils";
import TrpcProvider from "@/lib/trpc/Provider";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import React from "react";
import { getUserRole } from "@/lib/db/queries/queries";

export default async function SecuredAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = await getUserAuth();
  const user = session?.user;

  const role = await getUserRole(user?.id!);

  if (!session && !user?.email) redirect("/");

  if (role[0].role !== "ADMIN") {
    return (
      <div className="min-h-screen text-center flex items-center justify-center">
        This page doesn&apos;t exists.
      </div>
    );
  }
  return (
    <main>
      <NextAuthProvider>
        <TrpcProvider cookies={cookies().toString()}>
          <div>{children}</div>
        </TrpcProvider>
      </NextAuthProvider>

      <Toaster richColors />
    </main>
  );
}
