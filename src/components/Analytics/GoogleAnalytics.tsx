"use client";

import React from 'react'
import { GoogleAnalytics } from "nextjs-google-analytics";

const GoogleAnalyticsProvider = () => {
  return (
    <div>
      <GoogleAnalytics trackPageViews />
    </div>
  );
}

export default GoogleAnalyticsProvider
