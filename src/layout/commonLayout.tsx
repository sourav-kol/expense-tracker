import React from "react";
import { Layout, Flex } from 'antd';

const { Content } = Layout;

type Props = {
    children: React.ReactNode
}

export default function AppLayout(props: Props) {
    const { children } = props
    return (
        <Content className="layout-common">
            {children}
        </Content>
    );
}
