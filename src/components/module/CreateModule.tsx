"use client";

import React from 'react'
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
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { trpc } from '@/lib/trpc/client';
import { Loader2 } from 'lucide-react';


const formSchema = z.object({
  name: z.string().min(2).max(50),
  moduleNo: z.string().min(2).max(8),
  coaching: z.string().min(1, {
    message: "coaching is required",
  }),
  examType: z.enum(["UPSC"]),
  testType: z.string().min(1, {
    message: "test type is required",
  }),
});

const CreateModule = () => {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        moduleNo: "2231",
        coaching: "Vision IAS",
        examType: "UPSC",
        testType: "General Studies",
      },
    });

    const createNewModule = trpc.users.createNewModuleTrpc.useMutation({onSuccess(data, variables, context) {
        toast.success("Module created successfully");
        form.reset();
    },});

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      // console.log(values);
      const data = {
        name : values.name,
        moduleNo : values.moduleNo,
        coaching : values.coaching,
        examType : values.examType,
        testType : values.testType
      }

      createNewModule.mutate(data);
    }

    const isLoading = form.formState.isSubmitting;
  return (
    <div className="space-y-8 p-[1rem] grid grid-cols-1 md:grid-cols-2 gap-[2rem]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2rem] my-4 border-[2px] border-black/10 p-4 rounded-xl">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Module Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Vision GS" {...field} />
                  </FormControl>
                  <FormDescription>This is Module name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="moduleNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Module Number</FormLabel>
                  <FormControl>
                    <Input placeholder="2231" {...field} />
                  </FormControl>
                  <FormDescription>This is Module Number.</FormDescription>
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
          </div>
          <Button type="submit" disabled={isLoading}>
            {" "}
            {isLoading ? (
              <Loader2 className="mx-auto h-6 w-6 animate-spin" />
            ) : (
              <h1>Submit</h1>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default CreateModule
