import GoogleAnalyticsProvider from "@/components/Analytics/GoogleAnalytics";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/Homepage/NavBar";
import React from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

function HomePageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen dark:bg-[#101116]">
      <NavBar />
      {children}
      <Footer />
      <GoogleAnalyticsProvider/>
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default HomePageLayout;
