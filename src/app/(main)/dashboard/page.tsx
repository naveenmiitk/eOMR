import SubjectWiseAnalysis from "@/components/Dashboard/SubjectWiseAnalysis";
import TestAnalysisChart from "@/components/Dashboard/TestAnalysisChart";
import SignIn from "@/components/auth/SignIn";
import { getUserAuth } from "@/lib/auth/utils";
import { api } from "@/lib/trpc/api";

export default async function Home() {
  const { session } = await getUserAuth();

  if (!session) return <SignIn />;

  // const data = await api.users.getUserData.query();
  const data = await api.users.getAllTestGivenByUserTrpc.query();
  const gsData = data.filter((item) => item.testType === "General Studies");
  const csatData = data.filter((item) => item.testType === "CSAT");


  // console.log(data);

  return (
    <main className="space-y-4">
      {/* {session ? (
        <pre className="bg-secondary p-4 rounded-sm shadow-sm text-secondary-foreground break-all whitespace-break-spaces">
          {JSON.stringify(session, null, 2)}
        </pre>
      ) : null}
      <SignIn /> */}
      {/* <pre className="p-4 break-all rounded-sm shadow-sm bg-secondary text-secondary-foreground whitespace-break-spaces">
        {JSON.stringify(data, null, 2)}
      </pre> */}
      {/* <ClientTest/> */}
      <div>General Studies Test Progress</div>
      <TestAnalysisChart data={gsData.reverse()} />
      <div>CSAT Test Progress</div>
      <TestAnalysisChart data={csatData.reverse()} />
      <SubjectWiseAnalysis data={data}/>
    </main>
  );
}
