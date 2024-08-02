import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db/index";
import { users } from "@/lib/db/schema/auth";
import { api } from "@/lib/trpc/api";
import { checkAnswers } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import test from "node:test";

// export async function POST(req: NextApiRequest) {
//   const data = req.body.data;
//   console.log(data);
// return new Response(JSON.stringify({ message: "ok" }), { status: 200 });
// }

export async function PUT(request: Request) {
  const { session } = await getUserAuth();
  if (!session) return new Response("Error", { status: 400 });
  const body = (await request.json()) as { testId: string; user_answers: string[] };
  if(body.testId === undefined) return new Response("TestId is undefined Error", { status: 400 });
  if(body.user_answers === undefined) return new Response("User Answers are undefiend Error", { status: 400 });
  // console.log(body);
  const submitOMR = await api.users.submitOMRResponseTrpc.mutate(body).catch((err) => {
    console.log(err);
    return new Response("OMR Didn't submmited successfully Error", { status: 400 });
  });
  // console.log(submitOMR);
  if(submitOMR === undefined) return new Response("OMR Doesn't exits Error", { status: 400 });

  const getOMRData = await api.users.getOMRIdByUserIdAndTestIdTrpc.query(body.testId);
  // console.log(getOMRData);
  if(getOMRData === undefined) return new Response("OMR Data is undefined Error", { status: 400 });

  const marks = checkAnswers(getOMRData[0].answers! , getOMRData[0].actual_answers!, getOMRData[0].subject!, getOMRData[0].testType!);
  // console.log(marks);

  const resultData = {
    testId: body.testId,
    correct: marks.right_questions,
    incorrect: marks.wrong_questions,
    unanswered: marks.unattempted_questions,
    totalQuestions:
      marks.right_questions +
      marks.wrong_questions +
      marks.unattempted_questions,
    marks: marks.total_marks,
    subjectCorrect : marks.subject_correct,
    subjectIncorrect : marks.subject_wrong,
    subjectUnanswered : marks.subject_unattempted,
  };

  const result = await api.users.createResultTrpc.mutate(resultData).catch((err) => {
    console.log(err);
    return new Response("Submmitting Result Error", { status: 400 });
  });
  // console.log(result);
  if(result === undefined) return new Response("Result doesn't exists Error", { status: 400 });
  revalidatePath("/testseries");
  return new Response(JSON.stringify({ message: "ok" }), { status: 200 });
}



