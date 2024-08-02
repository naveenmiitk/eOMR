import { Button } from "@/components/ui/button";
import { api } from "@/lib/trpc/api";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const IndividualTestPage = async ({ params: { id } }: Props) => {
  const test = await api.users.getTestByIdTrpc.query(id).catch((err) => {
    return notFound();
  });
  // console.log(test);

  if (test.length < 1) {
    return (
      <div>
        <h1 className="text-lg font-semibold">This Test doesn&apos;t exists.</h1>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1>Test ID : {id}</h1>
      <pre className="p-4 break-all rounded-sm shadow-sm bg-secondary text-secondary-foreground whitespace-break-spaces">
        {JSON.stringify(test, null, 2)}
      </pre>
      <Button>
        <Link href={`/omr/${id}`}>Start Test</Link>
      </Button>
    </div>
  );
};

export default IndividualTestPage;
