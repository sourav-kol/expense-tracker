import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (<div className="flex items-center justify-center h-80">
        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm">
            {children}
        </div>
    </div>
    );
}