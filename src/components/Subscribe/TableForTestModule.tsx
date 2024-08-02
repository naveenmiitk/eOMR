import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";

interface TableForTestModuleProps {
  data: {
    id: string;
    name: string | null;
    testType: string | null;
    coaching: string | null;
    createdAt: Date | null;
    testNumber: number | null;
  }[];
}

const TableForTestModule:React.FC<TableForTestModuleProps> = ({data}) => {
  return (
    <div className="mx-auto max-w-4xl">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>#SR</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell className="text-right">Coaching</TableHeaderCell>
            <TableHeaderCell>Test Type</TableHeaderCell>
            <TableHeaderCell>Test Code</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell className="text-right">{item.coaching}</TableCell>
              <TableCell>{item.testType}</TableCell>
              <TableCell>{item.testNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TableForTestModule
