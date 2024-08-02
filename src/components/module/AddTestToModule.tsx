"use client";

import React from "react";
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
  moduleNo: z.string().min(1, {
    message: "module id is required",
  }),
  testId : z.string().min(1, {
    message: "test id is required",
  })
});

const AddTestToModule:React.FC<AddTestToModuleProps> = ({data, moduleData}) => {

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        // name: "",
        moduleNo: "",
        testId : "",
      },
    });

    const createNewModule = trpc.users.createNewModuleTrpc.useMutation({
      onSuccess(data, variables, context) {
        toast.success("Module created successfully");
        form.reset();
      },
    });

    const linkTestToModule = trpc.admin.LinkTestToModuleTrpc.useMutation({
      onSuccess(data, variables, context) {
        toast.success("Test Added to Module successfully");
        form.reset();
      },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      // console.log(values);
      const data = {
        testId : values.testId,
        moduleId : values.moduleNo, 
      }

      linkTestToModule.mutate(data);
    }

  return (
    <div className="lg:p-[2rem]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2rem] my-4 border-[2px] border-black/10 p-4 rounded-xl">
            <FormField
              control={form.control}
              name="moduleNo"
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
                  <FormDescription>
                    Select the Test you want to add to Module.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="testId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Test Id</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    // defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the Test" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* <SelectItem value="UPSC">UPSC CSE</SelectItem> */}
                      {/* <SelectItem value="CSAT">CSAT</SelectItem> */}
                      {data.map((test) => (
                        <SelectItem key={test.id} value={test.id}>
                          {test.coaching}-{test.testType}-{test.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the Test you want to add to Module.
                  </FormDescription>
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

export default AddTestToModule
