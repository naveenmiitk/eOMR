import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { examType } from '@/lib/db/schema/auth';

interface TableModuleProps  {
  data : {
    id : string, 
    name : string,
    moduleNo : number, 
    coaching : string | null,
    examType : string, 
    testType : string | null, 
  }[]
}


const TableModule:React.FC<TableModuleProps> = ({data}) => {
    // console.log(data);
  return (
    <div className="mx-auto max-w-4xl">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>#SR</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell className="text-right">Coaching</TableHeaderCell>
            <TableHeaderCell>Exam Type</TableHeaderCell>
            <TableHeaderCell>Test Type</TableHeaderCell>
            <TableHeaderCell>Module Number</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell className="text-right">{item.coaching}</TableCell>
              <TableCell>{item.examType}</TableCell>
              <TableCell>{item.testType}</TableCell>
              <TableCell>{item.moduleNo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TableModule
