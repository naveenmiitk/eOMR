"use client";

import OMRCardComponent2 from "@/components/omr/OMRCardComponent2";
import { Button } from "@tremor/react";
import React, { useTransition } from "react";
import { toast } from "sonner";

const Testpage = () => {
  const [isPending, startTransition] = useTransition();
  const data = {
    name: "naveen",
    question: "20",
  };
  const handleSubmit = async (event: React.SyntheticEvent) => {
    startTransition(async () => {
      const mail = await fetch("/api/mail/submit", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (mail.status === 200) {
        toast.success("Successfully Sent Mail!");
      }
    });
  };

  return (
    <div className="space-y-4 p-[4.2rem]">
      {/* <h1>Testing Page here</h1> */}
      {/* <OMRCardComponent2 /> */}
      {/* <Button onClick={handleSubmit}>Send Mail</Button> */}
      <div className="border-2 border-black rounded-full p-[3rem] w-60 h-60 flex items-center justify-center bg-black dark:bg-white">
        <h1 className="text-6xl font-semibold text-white dark:text-black">
          eOMR
        </h1>
      </div>
    </div>
  );
};

export default Testpage;
