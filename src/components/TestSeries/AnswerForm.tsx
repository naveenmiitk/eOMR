import React from 'react'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


const formSchema = z.object({

  answers: z
    .enum(["A", "B", "C", "D"], {
      required_error: "You need to select an option.",
    })
    .array(),
});

const AnswerForm = () => {
        const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            answers: ["A", "B", "C", "D"],
        },
        });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
            console.log(values);
    }

    return (
        <div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
            control={form.control}
            name="answers"
            render={({ field }) => (
                <FormItem className="space-y-3">
                <FormControl>
                    <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value[0]}
                    className="flex flex-col space-y-1"
                    >
                    <div className="flex space-x-2">
                        <h1>Q1.</h1>
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
        </form>
        </div>
    );
}

export default AnswerForm
