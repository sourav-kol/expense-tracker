import React from 'react';
import type { AppProps } from 'next/app'
import NavigationBar from '@/src/components/Navigation/NavigationBar';
import { Nav } from '@/src/constants/AppConstants';

import '../public/global.css';

const metadata = {
    title: 'Expense tracker',
    description: 'Track your expenses',
}

export default function RootLayout({ Component, pageProps }: AppProps) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-200">
            <NavigationBar NavItem={Nav()} />
            <main className="flex-grow container mx-auto mt-24 p-2">
                <Component {...pageProps} />
            </main>
        </div>
    )
}
