"use client";
import { AreaChart, Button, Card, Metric, Text } from "@tremor/react";
import React from "react";

interface BasicScoreProps {
  data: {
    raw_marks: number[];
    raw_marks_alpha: number[];
    total_marks: number;
    right_questions: number;
    wrong_questions: number;
    unattempted_questions: number;
    raw_movingSum_marks: number[];
    movingSum_object: {
      question: number;
      Marks: number;
    }[];
    subject_correct: number[];
    subject_wrong: number[];
    subject_unattempted: number[];
  };
}

const BasicScore:React.FC<BasicScoreProps> = ({data}) => {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Card
          className="mx-auto max-w-[20rem]"
          decoration="left"
          decorationColor="green"
        >
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Correct
          </p>
          <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
            {data.right_questions}
          </p>
        </Card>

        <Card
          className="mx-auto max-w-[20rem]"
          decoration="left"
          decorationColor="red"
        >
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Incorrect
          </p>
          <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
            {data.wrong_questions}
          </p>
        </Card>
        <Card
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
        </Card>
      </div>
    </div>
  );
};

export default BasicScore;
