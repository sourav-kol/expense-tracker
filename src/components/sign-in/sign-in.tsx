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
import { signIn } from "@/src/service/authService";

interface SignInProps {

}

const formSchema = z.object({
    email: z.string().min(5, {
        message: "Email cannot be empty",
    })
});

const SignInPage: React.FC<SignInProps> = () => {
    const form = useForm<SignIn>({
        resolver: zodResolver(formSchema)
    });
    const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);

    const onFinish = (data: SignIn) => {
        //make api call
        signIn(data).then((res: string) => {
            console.log(res);
        }).catch((err: any) => {
            console.log(err);
        });
    }
    const onSubmit: SubmitHandler<SignIn> = (data) => {
        setSubmitDisabled(true);
        onFinish(data);
    };
    const onError: SubmitErrorHandler<SignIn> = (errors) => {
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
        <div className="flex items-center justify-center h-80">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm">
                <Form {...form}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={submitDisabled} className="mt-4 w-full" onClick={onHandleSubmit}>
                        Sign In
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default SignInPage;
