import React from "react";
import { Col, Row, Layout, Flex } from 'antd';

const { Content } = Layout;

type Props = {
    children: React.ReactNode,
    sideContent: React.ReactNode | undefined
}

export default function AppLayout(props: Props) {
    const { children, sideContent } = props
    return (
        <Flex className="common-layout" gap={"middle"} align="start" wrap>
            <Content className="layout-left-content">
                {children}
            </Content>
            {/* todo: do not show sider when min-width */}
            {sideContent ?
                <Content className="layout-right-content">
                    {sideContent}
                </Content> : null
            }
        </Flex>
    );
}
