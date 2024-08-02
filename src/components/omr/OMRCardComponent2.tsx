"use client";

import { Button } from '@tremor/react';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react'
import { toast } from 'sonner';

const OMRCardComponent2 = () => {
    const [questions, setQuestions] = React.useState(new Array(100).fill("A"));
    const [omrId, setOMRId] = React.useState("");
    const [trigger, setTrigger] = React.useState(false);
    const testId = "a5cd2f45-53b1-4318-ba88-1638327e992e";

    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const handleSubmit = async (event: React.SyntheticEvent) => {
    //   event.preventDefault();
    //   const target = event.target as HTMLFormElement;
    //   const form = new FormData(target);
    //   const { name } = Object.fromEntries(form.entries()) as { name: string };
    //   if (name.length < 3) {
    //     toast.error("Name must be longer than 3 characters.");
    //     return;
    //   }

    const data = {
        testId, 
        user_answers: questions
    }

      startTransition(async () => {
        const res = await fetch("/api/submit", {
          method: "PUT",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        });
        if (res.status === 200) {
            toast.success("Successfully Submiited OMR!");   
            router.replace(`/result/${testId}`);
        }
        router.refresh();
      });
    };


  return (
    <div>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  )
}

export default OMRCardComponent2
