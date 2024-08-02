import { checkAuth } from "@/lib/auth/utils";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import NextAuthProvider from "@/lib/auth/Provider";
import TrpcProvider from "@/lib/trpc/Provider";
import { cookies } from "next/headers";
import GoogleAnalyticsProvider from "@/components/Analytics/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
// import { unstable_noStore as noStore } from "next/cache";
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();
  return (
    <main>
      <NextAuthProvider>
        <TrpcProvider cookies={cookies().toString()}>
          <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 md:p-8 pt-2 p-8 overflow-y-auto">
              <Navbar />
              {children}
              <GoogleAnalyticsProvider />
              <Analytics />
              <SpeedInsights />
            </main>
          </div>
        </TrpcProvider>
      </NextAuthProvider>

      <Toaster richColors />
    </main>
  );
}
