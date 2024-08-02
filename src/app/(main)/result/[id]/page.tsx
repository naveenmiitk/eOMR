import BasicScore from "@/components/result/BasicScore";
import DynamicVitals from "@/components/result/DynamicVitals";
import ScoreChart from "@/components/result/ScoreChart";
import SubjectWiseScore from "@/components/result/SubjectWiseScore";
import { api } from "@/lib/trpc/api";
import { OMRCalculationData } from "@/lib/types";
import { checkAnswers, getTimeDifference } from "@/lib/utils";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};


const TestResultPage =  async ({ params: { id } }: Props) => {
     const isAttempted = await api.users.getAttemptedTestOMRIdTrpc.query(id);
    //  console.log(isAttempted);
     if (isAttempted.length < 1) return <div>This Test doesn&apos;t exists.</div>;
     if (!isAttempted[0].id) return <div>Test Not Attempted Yet!</div>;
     if(isAttempted[0].testStatus === "SCHEDULED") return <div>
      <h1>Result will be declared at {new Date(isAttempted[0].publishTime!).toLocaleString()}</h1>
      {/* <h1>Time Remaining : {}</h1> */}
     </div>
     const data = await api.users.getOMRDataByIdTrpc.query(isAttempted[0].id);
    //  console.log(data);

     const marks = checkAnswers(
       data[0].answers!,
       data[0].actual_answers!,
       data[0].subject!,
       data[0].testType!
     );
    //  console.log(marks);

    const dynamicdata = await api.users.getRankingInTestTrpc.query(id);
    // console.log(dynamicdata);


  return (
    <div className="space-y-4">
      <h1>Result For Test : {id}</h1>
      <h1>OMR ID : {isAttempted[0].id}</h1>
      <ScoreChart data={marks?.movingSum_object} />
      <BasicScore data={marks} />
      {/* <pre className="p-4 break-all rounded-sm shadow-sm bg-secondary text-secondary-foreground whitespace-break-spaces">
        {JSON.stringify(dynamicdata, null, 2)}
      </pre> */}
      <DynamicVitals data={dynamicdata} />
      <SubjectWiseScore data={marks} />
    </div>
  );
};

export default TestResultPage;


