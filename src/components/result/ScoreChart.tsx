"use client";
import { AreaChart, Button, Card, Metric, Text } from "@tremor/react";
import React from 'react'


interface ScoreChartProps {
    data: any
}

const chartdata = [
  {
    date: "Jan 22",
    SemiAnalysis: 2890,
    "The Pragmatic Engineer": 2338,
  },
  {
    date: "Feb 22",
    SemiAnalysis: 2756,
    "The Pragmatic Engineer": 2103,
  },
  {
    date: "Mar 22",
    SemiAnalysis: 3322,
    "The Pragmatic Engineer": 2194,
  },
  {
    date: "Apr 22",
    SemiAnalysis: 3470,
    "The Pragmatic Engineer": 2108,
  },
  {
    date: "May 22",
    SemiAnalysis: 3475,
    "The Pragmatic Engineer": 1812,
  },
  {
    date: "Jun 22",
    SemiAnalysis: 3129,
    "The Pragmatic Engineer": 1726,
  },
  {
    date: "Jul 22",
    SemiAnalysis: 3490,
    "The Pragmatic Engineer": 1982,
  },
  {
    date: "Aug 22",
    SemiAnalysis: 2903,
    "The Pragmatic Engineer": 2012,
  },
  {
    date: "Sep 22",
    SemiAnalysis: 2643,
    "The Pragmatic Engineer": 2342,
  },
  {
    date: "Oct 22",
    SemiAnalysis: 2837,
    "The Pragmatic Engineer": 2473,
  },
  {
    date: "Nov 22",
    SemiAnalysis: 2954,
    "The Pragmatic Engineer": 3848,
  },
  {
    date: "Dec 22",
    SemiAnalysis: 3239,
    "The Pragmatic Engineer": 3736,
  },
];

const dataFormatter = (number: any) =>
  `$${Intl.NumberFormat("us").format(number).toString()}`;


const ScoreChart:React.FC<ScoreChartProps> = ({data}) => {
  // console.log(data);
  return (
    <div>
      {/* <AreaChart
        className="h-80"
        data={chartdata}
        index="date"
        categories={["SemiAnalysis", "The Pragmatic Engineer"]}
        colors={["indigo", "rose"]}
        valueFormatter={dataFormatter}
        yAxisWidth={60}
        onValueChange={(v) => console.log(v)}
      /> */}
      <AreaChart
        className="h-80"
        data={data}
        index="question"
        categories={["Marks"]}
        colors={["indigo"]}
        // valueFormatter={dataFormatter}
        yAxisWidth={60}
        onValueChange={(v) => console.log(v)}
        showAnimation
        showLegend
        showGradient
        showGridLines
        enableLegendSlider
        title="Question Vs Total Marks"
        
      />

      {/* <Button variant="primary">Search</Button> */}
    </div>
  );
}

export default ScoreChart
