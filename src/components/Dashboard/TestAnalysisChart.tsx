"use client";

import { AreaChart} from "@tremor/react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface TestAnalysisChartProps {
  data: {
    testId: string | null;
    testTitle: string | null;
    coaching: string | null;
    testType: string | null;
    attempted_at: Date | null;
    marks: number;
  }[];
}

const TestAnalysisChart: React.FC<TestAnalysisChartProps> = ({ data }) => {
  if (data.length < 1)
    return (
      <div className="text-center h-80 border-neutral-200 border-2 flex flex-col items-center justify-center space-y-4">
        <h1>You haven&apos;t attempted any test yet. Please Subscribe Below to attempt test.</h1>
        <Button asChild>
          <Link href={"/subscribe"}>Subscribe</Link>
        </Button>
        <h1 className="mt-2 text-neutral-400 dark:text-neutral-100">If attempted, wait for result to be published.</h1>
      </div>
    );

    if (data[0].testType == "CSAT") {
      return (
        <div>
          <AreaChart
            className="h-80"
            data={data}
            index="testTitle"
            categories={["marks"]}
            colors={["cyan"]}
            // valueFormatter={dataFormatter}
            yAxisWidth={60}
            onValueChange={(v) => console.log(v)}
            showAnimation
            showLegend
            showGradient
            showGridLines
            enableLegendSlider
            title="CSAT Test Vs Marks"
          />
        </div>
      )
    }

  return (
    <div>
      <AreaChart
        className="h-80"
        data={data}
        index="testTitle"
        categories={["marks"]}
        colors={["rose"]}
        // valueFormatter={dataFormatter}
        yAxisWidth={60}
        onValueChange={(v) => console.log(v)}
        showAnimation
        showLegend
        showGradient
        showGridLines
        enableLegendSlider
        title="General Studies Test Vs Marks"
      />
    </div>
  );
};

export default TestAnalysisChart;
