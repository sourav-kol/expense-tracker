import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app'
import NavigationBar from '@/src/components/Navigation/NavigationBar';
import { Nav } from '@/src/constants/AppConstants';

import '../public/global.css';

const metadata = {
    title: 'Expense tracker',
    description: 'Track your expenses',
}

export default function RootLayout({ Component, pageProps }: AppProps) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-200">
            <div className={`z-10 fixed w-full h-24 ${isScrolled ? 'bg-gray-200' : ''}`}>
                <NavigationBar NavItem={Nav()} />
            </div>
            <main className="flex-grow w-full sm:w-4/5 container mx-auto mt-24 p-2">
                <Component {...pageProps} />
            </main>
        </div>
    )
}
