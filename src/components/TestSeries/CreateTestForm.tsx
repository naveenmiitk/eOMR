"use client";

import React, { useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import AnswerForm from './AnswerForm';
import { cn } from '@/lib/utils';
// import { api } from '@/lib/trpc/api';
import { trpc } from '@/lib/trpc/client';
import { Test } from '@/lib/db/schema/auth';
import { createNewTest } from '@/lib/db/queries/queries';
import { Toaster } from '../ui/sonner';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { SUBJECTCODES, SUBJECTS } from '@/lib/types';
import test from 'node:test';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';


const formSchema = z.object({
  testTitle: z.string().min(1, {
    message: "Test title is required",
  }),
  testNumber : z.string().min(1, {
    message: "test number is required",
  }), 
  coaching: z.string().min(1, {
    message: "coaching is required",
  }),
  examType: z.enum(["UPSC"]),
  testStatus : z.enum(["PUBLISHED", "SCHEDULED"]),
  publishTime : z.string({ required_error: "publish time is required" }),
  testType: z.string().min(1, {
    message: "test type is required",
  }),
  // answers : z.string().array().min(1, {
  //     message: "answers are required",
  // })
  // answers : z.enum(["A", "B", "C", "D"], {
  // required_error: "You need to select an option.",
  // }),

  answers: z
    .array(
      z.enum(["A", "B", "C", "D"], {
        required_error: "You need to select an option.",
      })
    )
    .length(100, {
      message: "answers are required",
    }),
  subject: z
    .array(
      z.enum(["P", "E", "AI", "MI", "MD", "AC", "ST", "EN", "G", "M", "IR", "CA", "CP", "QU", "R"], {
        required_error: "You need to select an option.",
      })
    )
    .length(100, {
      message: "subject are required",
    }),
});

const CreateTestForm = () => {

    const [questions, setQuestions] = React.useState(new Array(100).fill("A"));
    const router = useRouter();


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            testTitle: "",
            coaching : "",
            testNumber : "4352", 
            examType : "UPSC",
            testStatus : "PUBLISHED", 
            testType : "General Studies",
            answers : new Array(100).fill("A"),
            subject : new Array(100).fill("P"),
            // publishTime : new Date(),
        },
    });

    const createNewTest = trpc.users.createNewTestTrpc.useMutation({onSuccess(data, variables, context) {
        // console.log(data, variables, context);
        toast.success("Test created successfully");
        form.reset();
        router.replace("/mod");
    },});

    // useEffect(() => {
    //   form.watch("testType") == "CSAT" ? setQuestions(new Array(80).fill("B")) : setQuestions(new Array(100).fill("A"));
    //   console.log(questions);
    // }, [form, questions]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
      // console.log(values);

      const data  = {
        testTitle : values.testTitle,
        coaching : values.coaching,
        testNumber : parseInt(values.testNumber),
        testStatus : values.testStatus,
        publishTime : new Date(values.publishTime),
        examType : values.examType,
        testType : values.testType,
        answers : values.answers,
        subject : values.subject,
      }
      console.log(data);


      const result = createNewTest.mutate(data);
      // const result = await createNewTest(data);

     
    }

    const isLoading = form.formState.isSubmitting;

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2rem] my-4 border-[2px] border-black/10 p-4 rounded-xl">
            <FormField
              control={form.control}
              name="testTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Test Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Abhyaas Test-1" {...field} />
                  </FormControl>
                  <FormDescription>This is Test Title name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coaching"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coaching</FormLabel>
                  <FormControl>
                    <Input placeholder="VisionIAS" {...field} />
                  </FormControl>
                  <FormDescription>This is Coaching name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="testNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Test Number</FormLabel>
                  <FormControl>
                    <Input placeholder="4352" {...field} />
                  </FormControl>
                  <FormDescription>This is Test Unique Number.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="examType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exam Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    // defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the Exam Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="UPSC">UPSC CSE</SelectItem>
                      {/* <SelectItem value="CSAT">CSAT</SelectItem> */}
                    </SelectContent>
                  </Select>
                  {/* <FormControl>
                    <Input placeholder="UPSC" {...field} />
                  </FormControl> */}
                  <FormDescription>
                    This is Exam type of which Test Belong.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="testType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Test Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    // defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the Test Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="General Studies">
                        General Studies
                      </SelectItem>
                      <SelectItem value="CSAT">CSAT</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* <FormControl>
                    <Input placeholder="General Studies" {...field} />
                  </FormControl> */}
                  <FormDescription>
                    This is Test Type : General Studies or CSAT
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="testStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Test Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the Test Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="PUBLISHED">PUBLISHED</SelectItem>
                      <SelectItem value="SCHEDULED">SCHEDULED</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormDescription>
                    This is Test Status : PUBLISHE OR SCHEDULED.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publishTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scheduled Time</FormLabel>
                  <FormControl>
                    <Input {...field} aria-label='Date and time' type='datetime-local'/>
                  </FormControl>
                  <FormDescription>This is Scheduled Time Result will be Published.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="border-t-[2px] border-black/10 border-dashed p-4 space-y-4 max-w-[1400px] mx-auto">
            <h1 className="text-xl font-semibold">Part II</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1rem]">
              {questions.map((item, index) => (
                <div
                  key={index}
                  // className="grid grid-cols-1 md:grid-cols-2 gap-[2rem] my-4 border-[2px] border-black/10 p-4 rounded-xl"
                  className={cn(
                    index % 2 == 0 ? "bg-neutral-100" : "bg-rose-200",
                    "p-2 rounded-xl px-8 flex items-center space-x-[2rem]"
                  )}
                >
                  <FormField
                    control={form.control}
                    name={`answers.${index}`}
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            // defaultValue={field.value[index]}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex space-x-2">
                              <div className="flex items-center justify-end ml-1 w-[1rem]">
                                <h1>Q{index + 1}.</h1>
                              </div>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="A" />
                                </FormControl>
                                {/* <FormLabel className="font-normal">A</FormLabel> */}
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="B" />
                                </FormControl>
                                {/* <FormLabel className="font-normal">B</FormLabel> */}
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="C" />
                                </FormControl>
                                {/* <FormLabel className="font-normal">C</FormLabel> */}
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="D" />
                                </FormControl>
                                {/* <FormLabel className="font-normal">D</FormLabel> */}
                              </FormItem>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`subject.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Subject</FormLabel> */}
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {SUBJECTS.map((item, index) => (
                              <SelectItem
                                key={index}
                                value={SUBJECTCODES[index]}
                              >
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {/* <FormDescription>Subject</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end pr-10">
            <Button type="submit">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin transition" />
                  <h1>Creating...</h1>
                </>
              ) : (
                "Create Test"
              )}
            </Button>
          </div>
        </form>
      </Form>
    );
}

export default CreateTestForm











 {
   /* <FormField
                    control={form.control}
                    name={`subject.${index}`}
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex space-x-2">
                        
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="P" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Polity
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="E" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Economy
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="AI" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Ancient India
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="MI" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Medieval India
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="MD" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Modern India
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="AC" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Art & Culture
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="ST" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  S&T
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="EN" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Environment
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="G" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Geography
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="M" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Map
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="IR" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  IR
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="CA" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Current Affairs
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="CP" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Comprehsion
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="QU" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Quant
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="R" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Reasoning
                                </FormLabel>
                              </FormItem>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */
 }