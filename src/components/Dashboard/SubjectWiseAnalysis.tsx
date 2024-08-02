import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { SUBJECTS } from "@/lib/types";
interface SubjectWiseAnalysisProps {
  data: {
    testId: string | null;
    testTitle: string | null;
    coaching: string | null;
    testType: string | null;
    attempted_at: Date | null;
    marks: number;
    subjectCorrect: number[] | null;
    subjectIncorrect: number[] | null;
    subjectUnanswered: number[] | null;
  }[];
}

const SubjectWiseAnalysis: React.FC<SubjectWiseAnalysisProps> = ({ data }) => {
  const totalCorrect: number[] = new Array(15).fill(0);
  const totalIncorrect: number[] = new Array(15).fill(0);
  const totalUnanswered: number[] = new Array(15).fill(0);
  let count = 0;

  if (data.length === 0)
    return (
      <h1 className="text-center font-semibold">
        Please attempt at least one test to see detailed analysis.
      </h1>
    );

  for (let i = 0; i < data.length; i++) {
    const { subjectCorrect, subjectIncorrect, subjectUnanswered } = data[i];
    if (subjectCorrect) {
      for (let j = 0; j < subjectCorrect.length; j++) {
        totalCorrect[j] += subjectCorrect[j];
      }
    }
    if (subjectIncorrect) {
      for (let j = 0; j < subjectIncorrect.length; j++) {
        totalIncorrect[j] += subjectIncorrect[j];
      }
    }
    if (subjectUnanswered) {
      for (let j = 0; j < subjectUnanswered.length; j++) {
        totalUnanswered[j] += subjectUnanswered[j];
      }
    }
  }
  // console.log(totalCorrect, totalIncorrect, totalUnanswered);
  return (
    <div className="mx-auto max-w-5xl">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>#SR</TableHeaderCell>
            <TableHeaderCell>Subject</TableHeaderCell>
            <TableHeaderCell>Correct</TableHeaderCell>
            <TableHeaderCell>Incorrect</TableHeaderCell>
            <TableHeaderCell>Unattempted</TableHeaderCell>
            <TableHeaderCell>Accuracy</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {SUBJECTS.map((subject, index) => {
            if (totalCorrect[index] + totalIncorrect[index] === 0) return null;
            count += 1;
            return (
              <TableRow key={index}>
                <TableCell>{count}</TableCell>
                <TableCell>{subject}</TableCell>
                <TableCell>{totalCorrect[index]}</TableCell>
                <TableCell>{totalIncorrect[index]}</TableCell>
                <TableCell>{totalUnanswered[index]}</TableCell>
                <TableCell>
                  {(
                    (totalCorrect[index] /
                      (totalCorrect[index] + totalIncorrect[index])) *
                    100
                  ).toFixed(2)}
                  %
                </TableCell>
              </TableRow>
            );
          })}
          {data.length > 0 && (
            <>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>{totalCorrect.reduce((a, b) => a + b, 0)}</TableCell>
                <TableCell>
                  {totalIncorrect.reduce((a, b) => a + b, 0)}
                </TableCell>
                <TableCell>
                  {totalUnanswered.reduce((a, b) => a + b, 0)}
                </TableCell>
                <TableCell>
                  {(
                    (totalCorrect.reduce((a, b) => a + b, 0) /
                      (totalCorrect.reduce((a, b) => a + b, 0) +
                        totalIncorrect.reduce((a, b) => a + b, 0))) *
                    100
                  ).toFixed(2)}
                  %
                </TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SubjectWiseAnalysis;
