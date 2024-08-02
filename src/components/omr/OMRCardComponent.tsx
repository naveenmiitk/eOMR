"use client";

import React, { useTransition } from "react";
import OMRRowComponent, {
  OMRRowComponentAlpha,
  OMRRowComponentBeta,
} from "./OMRRowComponent";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc/client";
import { useRouter } from "next/navigation";
import { checkAnswers, sleep } from "@/lib/utils";
import GeneratingResult from "../result/GeneratingResult";
import { randomUUID } from "crypto";
import { OMRCalculationData } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { coachingImageLinks } from "@/lib/rawdata";
import Image from "next/image";
import { event } from "nextjs-google-analytics";

interface OMRCardComponentProps {
  id: string;
  userId: string;
  test: {
    id: string;
    name: string;
    examType:
       "UPSC"
      | "SSC"
      | "JEE"
      | "NEET"
      | "GATE"
      | "IBPS"
      | "CET"
      | "CAT"
      | "RAS"
      | "BPSC"
      | "UPPSC"
      | "MPPSC"
      | "HSC";
    testType: string;
    coaching: string | null;
    createdAt: Date;
  };
}

const OMRCardComponent: React.FC<OMRCardComponentProps> = ({ id, userId, test }) => {
  const [questions, setQuestions] = React.useState(new Array(100).fill("0"));
  const [trigger, setTrigger] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const coaching = coachingImageLinks(test.coaching!);

  const handleChange = (index: number, value: string) => {
    if (index > 99 && test.testType == "General Studies") return;
    if (index > 79 && test.testType == "CSAT") return;
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (eventA: React.SyntheticEvent) => {
    setSubmitting(true);
    const data = {
      user_answers: test.testType == "CSAT" ? questions.slice(0, 80) : questions,
      testId: id,
    };

    const mailData = {
      testId : id, 
      userId : userId, 
    };

    event("submitOMR", { testId: id, userId: userId, testName: test.name, createdAt: new Date()});

    startTransition(async () => {
      const res = await fetch("/api/submit", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200) {
        toast.success("Successfully Submiited OMR!");
        router.replace(`/result/${id}`);
        const mail = await fetch("/api/mail/submit", {
          method: "PUT",
          body: JSON.stringify(mailData),
          headers: { "Content-Type": "application/json" },
        });
        if (mail.status === 200) {
          toast.success("Successfully Sent Mail!");
        }
      }
      router.refresh();
    });


    setSubmitting(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between py-4 my-4 border-[2px] border-neutral-300 px-[1rem] min-w-fit">
        {/* <h1>OMR ID : {id}</h1> */}
        {/* <h1>UserID : {userId}</h1> */}
        <div className="border-2 border-black rounded-full p-[3rem] w-20 h-20 flex items-center justify-center bg-black dark:bg-white">
          <h1 className="text-xl font-semibold text-white dark:text-black">eOMR</h1>
        </div>
        <div className="">
          <Image src={coaching} alt="coaching" width={80} height={80} className="rounded-full" />
        </div>
        
      </div>

      <div className="hidden lg:flex items-center justify-between py-4 mt-4 border-[2px] border-rose-400 px-4 text-rose-500 min-w-fit">
        <h1>Center</h1>
        <h1>Subject</h1>
        <h1>Subject Code</h1>
        <h1>Booklet Code</h1>
        <h1>Roll Number</h1>
      </div>

      <div className="hidden lg:flex  items-start justify-end space-x-2 border-t-[0px] border-r-[0px] border-[2px] border-rose-400 text-rose-500 min-w-fit">
        <div className="min-w-[500px]">

        </div>
        <div className="flex items-center justify-end space-x-2 py-4 border-t-[0px] border-b-0 border-[2px] border-rose-400 px-4 text-rose-500">
          <OMRRowComponent />
          <OMRRowComponent />
        </div>

        <div className="space-x-2 py-4 border-t-[0px] border-0 border-rose-400 px-4 text-rose-500">
          <OMRRowComponentAlpha />
        </div>

        <div className="flex items-center justify-end space-x-2 py-4 border-t-[0px] border-b-0 border-[2px] border-rose-400 px-4 text-rose-500">
          <OMRRowComponent />
          <OMRRowComponent />
          <OMRRowComponent />
          <OMRRowComponent />
          <OMRRowComponent />
          <OMRRowComponent />
          <OMRRowComponent />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between my-2 border-[2px] border-rose-400 h-full min-w-fit max-w-2xl lg:max-w-6xl mx-auto">
        <div className="hidden lg:flex flex-col items-center justify-between flex-grow h-full gap-[16rem]">
          <div className=" border-rose-400 border-0">
            <OMRRowComponentBeta
              val={"0"}
              valChange={(value) => handleChange(0, value)}
              mutable={false}
            />
          </div>
          <div className=" border-rose-400 border-0 flex flex-col items-center justify-center">
            <h1>Booklet Code</h1>
            <OMRRowComponentBeta
              val={"C"}
              valChange={(value) => handleChange(0, value)}
              mutable={false}
            />
          </div>
          <div className="border-rose-400 border-0 flex space-x-2 items-center justify-center">
            <div className="">
              <h1 className="font-semibold text-xs rotate-90">
                Signature of Invigilator
              </h1>
            </div>

            <div className="border-rose-400 border-2 h-[16rem] w-[6rem] pr-2"></div>
          </div>
        </div>
        <div className="flex flex-col space-y-2 lg:border-l-[2px] border-rose-400 px-4 py-2 lg:py-4 max-w-fit bg-green-">
          {...Array(40)
            .fill("A")
            .map((_, index) => (
              <div key={index} className="flex space-x-2">
                <div className="flex items-center justify-end w-[1rem] border-x-0 border-rose-400 px-4">
                  <h1>{index + 1}</h1>
                </div>
                <OMRRowComponentBeta
                  val={questions[index]}
                  valChange={(value) => handleChange(index, value)}
                  mutable={true}
                />
              </div>
            ))}
        </div>

        <div className="flex flex-col space-y-2 lg:border-l-[2px] border-rose-400 px-4 pb-2 lg:py-4 bg-blue-">
          {...Array(40)
            .fill("A")
            .map((_, index) => (
              <div key={index} className="flex space-x-2">
                <div className="flex items-center justify-end w-[1rem] border-x-0 border-rose-400 px-4">
                  <h1>{index + 41}</h1>
                </div>
                <OMRRowComponentBeta
                  val={questions[index + 41]}
                  valChange={(value) => handleChange(index + 41, value)}
                  mutable={true}
                />
              </div>
            ))}
        </div>

        <div className="flex flex-col space-y-2 lg:border-l-[2px] border-rose-400 px-4 pb-2 lg:py-4">
          {...Array(40)
            .fill("A")
            .map((_, index) => (
              <div key={index} className="flex space-x-2">
                <div className="flex items-center justify-end w-[1rem] border-x-0 border-rose-400 px-4">
                  <h1>{index + 81}</h1>
                </div>
                <OMRRowComponentBeta
                  val={questions[index + 81]}
                  valChange={(value) => handleChange(index + 81, value)}
                  mutable={true}
                />
              </div>
            ))}
        </div>

        <div className="flex flex-col space-y-2 lg:border-l-[2px] border-rose-400 px-4 pb-2 lg:py-4">
          {...Array(40)
            .fill("A")
            .map((_, index) => (
              <div key={index} className="flex space-x-2">
                <div className="flex items-center justify-end w-[1rem] border-x-0 border-rose-400 px-4">
                  <h1>{index + 121}</h1>
                </div>
                <OMRRowComponentBeta
                  val={questions[index + 121]}
                  valChange={(value) => handleChange(index + 121, value)}
                  mutable={true}
                />
              </div>
            ))}
        </div>
      </div>

      <div className="flex items-center justify-center my-[4rem]">
        <Button className="px-8 rounded-full" onClick={handleSubmit} disabled={submitting}>
          {submitting ? (
            <Loader2 className="mx-auto h-6 w-6 animate-spin" />
          ) : (
            <h1>Submit</h1>
          )}
        </Button>
      </div>
    </div>
  );
};

export default OMRCardComponent;
