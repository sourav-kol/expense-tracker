import React from "react";

type Props = {
    children: React.ReactNode,
    title: string
}

export default function AppLayout(props: Props) {
    const { children, title } = props
    return (
        <div className="">
            <h1 className="text-center text-2xl font-bold mb-4 sticky top-24 z-10">
                {title}
            </h1>
            {children}
        </div>
    );
}
