import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/src/components/ui/button';
import AppLayout from '@/src/layout/commonLayout';
import { Card } from '@/src/components/ui/card';

const MagicLinkValidation = () => {
    const router = useRouter();
    const [isValidating, setIsValidating] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const { token } = router.query;
        if (token) {
            // Simulate API call to validate the token
            // setTimeout(() => {
            //     if (token === 'valid-token') {
            //         setIsValid(true);
            //     } else {
            //         setErrorMessage('Invalid or expired magic link.');
            //     }
            //     setIsValidating(false);
            // }, 2000);
        }
    }, [router.query]);

    return (
        <AppLayout title="Verify">
            <div className="flex items-center justify-center h-80">
                <div className="bg-white h-40 p-6 rounded-md shadow-md w-full max-w-sm">
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
                </div>
            </div>
        </AppLayout>
    );
};

export default MagicLinkValidation;
