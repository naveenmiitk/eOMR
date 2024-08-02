import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { SUBJECTS } from '@/lib/types';

interface SubjectWiseScoreProps {
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

const SubjectWiseScore:React.FC<SubjectWiseScoreProps> = ({data}) => {
    let count = 0;
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
          </TableRow>
        </TableHead>

        <TableBody>
          {SUBJECTS.map((subject, index) => 
          {
            if(data.subject_correct[index] + data.subject_wrong[index] + data.subject_unattempted[index] == 0) return null;
            count += 1;
            return (
            <TableRow key={index}>
              <TableCell>{count}</TableCell>
              <TableCell>{subject}</TableCell>
              <TableCell>{data.subject_correct[index]}</TableCell>
              <TableCell>{data.subject_wrong[index]}</TableCell>
              <TableCell>{data.subject_unattempted[index]}</TableCell>
            </TableRow>
            ) 
        })}
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>{data.right_questions}</TableCell>
            <TableCell>{data.wrong_questions}</TableCell>
            <TableCell>{data.unattempted_questions}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default SubjectWiseScore
