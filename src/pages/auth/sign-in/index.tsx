import React, { useEffect, useState } from 'react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/src/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { Input } from "@/src/components/ui/input";
import { z } from "zod";
import { SignIn } from "@/src/types";
import { Button } from "@/src/components/ui/button";
import { signIn } from "@/src/service/auth.service";
import AuthLayout from '@/src/components/auth/layout';

interface SignInProps {

}

const formSchema = z.object({
    code: z.string().min(3, {
        message: "code cannot be empty",
    })
});
import AppLayout from "@/src/layout/commonLayout";

export default function SignInPage() {
    const form = useForm<SignIn>({
        resolver: zodResolver(formSchema)
    });
    const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);

    const onFinish = (data: SignIn) => {
        //make api call
        signIn(data).then((res: string) => {
            localStorage.setItem('token', res);
        }).catch((err: any) => {
            console.log(err);
        });
    }
    const onSubmit: SubmitHandler<SignIn> = (data) => {
        setSubmitDisabled(true);
        onFinish(data);
    };
    const onError: SubmitErrorHandler<SignIn> = (error) => {
        setSubmitDisabled(false);
    };

    const onHandleSubmit = () => {
        form.handleSubmit(onSubmit, onError)();
    }

    useEffect(() => {
        setSubmitDisabled(false);

        return () => {
            setSubmitDisabled(true);
            form.reset();
        }
    }, []);

    return (
        <AppLayout title="Sign In">
            <AuthLayout>
                <Form {...form}>
                    <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Enter PIN</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your pin" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={submitDisabled} className="mt-4 w-full" onClick={onHandleSubmit}>
                        Sign In
                    </Button>
                </Form>
            </AuthLayout>
        </AppLayout>
    );
}