import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { api } from "@/lib/trpc/api";

interface TestCardComponentProps {
  test: {
    id: string;
    name: string | null;
    testType: string | null;
    coaching: string | null;
    createdAt: Date | null;
    testNumber: number | null;
  };
}

const TestCardComponent: React.FC<TestCardComponentProps> = async ({ test }) => {
  const isAttempted = await api.users.getAttemptedTestOMRIdTrpc.query(test.id);

  return (
    <div className="flex flex-col gap-[1rem] h-[14rem] min-w-[20rem] border-[2px] border-black/20 p-4 rounded-lg">
      <h1>{test.name}</h1>
      <h1>{test.coaching}</h1>
      <h1>{test.createdAt ? new Date(test.createdAt).toDateString() : ""}</h1>

      {isAttempted.length > 0 ? (
        <Link href={`/result/${test.id}`}>
          <Button className="bg-emerald-500 hover:bg-emerald-500/80 w-full">
            Check Result
          </Button>
        </Link>
      ) : (
        <Link href={`/testseries/${test.id}`}>
          <Button className="w-full">Start Test</Button>
        </Link>
      )}
    </div>
  );
};

export default TestCardComponent;
