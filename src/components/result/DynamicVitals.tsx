import React from 'react'
import { AreaChart, Button, Card, Metric, Text } from "@tremor/react";

interface DynamicVitalsProps {
    data : {
      rank  : number;
      total_students : number;
      percentile : string;
    }
}

const DynamicVitals:React.FC<DynamicVitalsProps> = ({data}) => {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Card
          className="mx-auto max-w-[40rem]"
          decoration="left"
          decorationColor="green"
        >
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            AIR 
          </p>
          <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
            {data.rank} / {data.total_students}
          </p>
        </Card>

        <Card
          className="mx-auto max-w-[40rem]"
          decoration="left"
          decorationColor="purple"
        >
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Pecentile
          </p>
          <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
            {data.percentile} %
          </p>
        </Card>
        {/* <Card
          className="mx-auto max-w-[20rem]"
          decoration="left"
          decorationColor="indigo"
        >
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Unanswered
          </p>
          <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
            {data.unattempted_questions}
          </p>
        </Card>
        <Card
          className="mx-auto max-w-[20rem]"
          decoration="left"
          decorationColor="cyan"
        >
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Total Marks
          </p>
          <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
            {data.total_marks}
          </p>
        </Card> */}
      </div>
    </div>
  );
}

export default DynamicVitals
