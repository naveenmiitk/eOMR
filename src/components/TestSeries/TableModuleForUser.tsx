import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";

interface TableModuleForUserProps {
  data: {
    id: string;
    name: string | null;
    moduleNo: number | null;
    coaching: string | null;
    examType: string | null;
    testType: string | null;
    expiryDate: Date;
  }[];
}

const TableModuleForUser:React.FC<TableModuleForUserProps> = ({data}) => {
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
            <TableHeaderCell>Expiry Date</TableHeaderCell>
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
              <TableCell><h1 className="text-red-600/90 font-semibold">{new Date(item.expiryDate).toLocaleDateString()}</h1></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TableModuleForUser
