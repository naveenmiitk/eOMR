"use client";

import React, { useTransition } from "react";
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
import { trpc } from "@/lib/trpc/client";
import { event } from "nextjs-google-analytics";

interface AddTestToModuleProps {
  data: {
    id: string;
    name: string;
    testType: string;
    coaching: string | null;
    createdAt: Date;
  }[];
  moduleData: {
    id: string;
    name: string;
    moduleNo: number;
    examType: string;
    testType: string | null;
    coaching: string | null;
  }[];
}

const formSchema = z.object({
  moduleId: z.string().min(1, {
    message: "module id is required",
  }),
  email: z.string().email({ message: "Please enter a valid email" }),
});


const SubscribeUserToModule:React.FC<AddTestToModuleProps> = ({data, moduleData}) => {
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // name: "",
      moduleId: "",
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    const data = {
      moduleId: values.moduleId,
      email: values.email,
    }
    event("subscribeToModule", { moduleId: values.moduleId, email: values.email , createdAt: new Date()});

    startTransition(async () => {
      const res = await fetch("/api/addUserToModule", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200) {
        toast.success("User subscribed to module successfully!");
        form.reset();
      } else {
        toast.error("Something went wrong!");
      }
    });
  }

  return (
    <div className="lg:p-[2rem]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2rem] my-4 border-[2px] border-black/10 p-4 rounded-xl">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="naveen@gmail.com" {...field} />
                  </FormControl>
                  <FormDescription>Enter the Email of User.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="moduleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Module Number</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    // defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the Module" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* <SelectItem value="UPSC">UPSC CSE</SelectItem> */}
                      {/* <SelectItem value="CSAT">CSAT</SelectItem> */}
                      {moduleData.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.moduleNo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Select the Module.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default SubscribeUserToModule





