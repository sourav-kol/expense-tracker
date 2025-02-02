import React from "react";

type Props = {
    children: React.ReactNode
}

export default function AppLayout(props: Props) {
    const { children } = props
    return (
        <div className="">
            {children}
        </div>
    );
}
