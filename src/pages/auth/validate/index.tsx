import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/src/components/ui/button';
import AppLayout from '@/src/layout/commonLayout';
import { Card } from '@/src/components/ui/card';
import AuthLayout from '@/src/components/auth/layout';
import { ValidateToken } from '@/src/service/auth.service';

const MagicLinkValidation = () => {
    const router = useRouter();
    const [isValidating, setIsValidating] = useState(false);
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        const { token } = router.query;
        if (token) {
            ValidateToken(token as string).then((res: string) => {
                setIsValid(true);
                setIsValidating(false);
                localStorage.setItem('token', token as string);
            }).catch((err: any) => {
                setIsValid(false);
            });
        }
    }, [router.query]);

    return (
        <AppLayout title="Verify">
            <AuthLayout>
                {isValidating ? (
                    <Card className="border-none shadow-none flex items-center justify-center">
                        <p className="text-center text-[25px] font-semibold text-crimson">
                            Validating your magic link
                            <span className="animate-ping">...</span>
                        </p>
                    </Card>
                ) : isValid ? (
                    <Card className="border-none shadow-none flex flex-col items-center justify-center">
                        <p className="text-center text-[25px] font-semibold text-crimson">Magic link validated successfully!</p>
                        <Button className="mt-4" onClick={() => router.push('/dashboard')}>Go to Dashboard</Button>
                    </Card>
                ) : (
                    <Card className="border-none shadow-none flex flex-col items-center justify-center">
                        <Button className="mt-4" onClick={() => router.push('/auth/sign-in')}>Regenerate Magic Link</Button>
                    </Card>
                )}
            </AuthLayout>
        </AppLayout>
    );
};

export default MagicLinkValidation;
