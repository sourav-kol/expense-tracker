import { Blog } from "@/types";
import { Layout, Flex, Row, Col } from "antd";
import React from "react";

const { Content } = Layout;

type Props = {
    Items: Blog[]
}

//alternative: can use list component here...
export default function BlogItem(props: Props) {
    const { Items } = props;
    return (
        <>
            {
                Items.map(item => {
                    return <Content className="tab-content-holder">
                        <Flex vertical>
                            <Row>
                                <Col>
                                    icon
                                </Col>
                                <Col>
                                    {item.Title}
                                </Col>
                            </Row>
                            <Row>
                                {item.ShortDescription}
                            </Row>
                            <Row>
                                <Col>
                                    {item.Shares}
                                </Col>
                                <Col>
                                    {item.Likes}
                                </Col>
                            </Row>
                        </Flex>
                    </Content>
                })
            }
        </>
    );
}
