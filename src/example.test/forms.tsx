import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/src/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import { Select, SelectItem, SelectValue, SelectTrigger } from "@/src/components/ui/select"
import { Expense } from "../types"
import { SelectContent } from "@radix-ui/react-select"

const formSchema = z.object({
    _id: z.string().optional(),
    title: z.string().min(2, {
        message: "Title cannot be empty",
    }),
    category: z.string().default("1"),
    amount: z.string().min(1, {
        message: "Amount must be a positive number",
    })
})

export function ProfileForm() {
    // 1. Define your form.
    const form = useForm<Expense>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            category: 1,
            amount: 0,
            createdDate: new Date().toISOString(),
            notes: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values:Expense) {
        // Do something with the form values.
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter title" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange}>
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="w-full bg-white z-50">
                                    <SelectItem className="w-full" value={"1"}>Food</SelectItem>
                                    <SelectItem className="w-full" value={"2"}>Shopping</SelectItem>
                                    <SelectItem className="w-full" value={"3"}>Bills</SelectItem>
                                    <SelectItem className="w-full" value={"4"}>Entertainment</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Enter amount" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
