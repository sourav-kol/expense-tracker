import { Expense } from "@/src/types";
import {
    Drawer,
    DrawerContent,
    DrawerHeader
} from "@/src/components/ui/drawer";
import { Button } from "@/src/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/src/components/ui/form";
import { Select, SelectItem, SelectValue, SelectTrigger } from "@/src/components/ui/select"
import { Input } from "@/src/components/ui/input"
import { SelectContent } from "@radix-ui/react-select"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
    openDrawer: boolean,
    onFinish: (e: Expense) => void,
    toggleDrawer: () => void
}

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

function AddExpenseDrawer(prop: Props) {
    const { openDrawer, onFinish, toggleDrawer } = prop;

    const form = useForm<Expense>({
        resolver: zodResolver(formSchema)
    });

    return (
        <Drawer open={openDrawer} direction="left">
            <DrawerContent className="w-full md:w-1/2 h-full">
                <div className="p-4">
                    <DrawerHeader>
                        <h3 className="text-xl font-bold mb-4 text-crimson">Add Expense</h3>
                    </DrawerHeader>
                    <Form {...form}>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter title" {...field} />
                                    </FormControl>
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
                                        {/* todo: take from list */}
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
                        <div className="flex space-x-2 py-8">
                            <Button type="submit" className="" onClick={form.handleSubmit(onFinish)}>Submit</Button>
                            <Button variant="outline" onClick={toggleDrawer}>Cancel</Button>
                        </div>
                    </Form>
                </div>
            </DrawerContent>
        </Drawer>
    );
}

export default AddExpenseDrawer;