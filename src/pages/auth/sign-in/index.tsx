import SignInPage from "@/src/components/sign-in/sign-in";
import AppLayout from "@/src/layout/commonLayout";

export default function SignIn() {
    return (
        <AppLayout title="Sign In">
            <SignInPage />
        </AppLayout>
    );
}