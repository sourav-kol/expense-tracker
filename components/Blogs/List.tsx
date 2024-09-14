import React, { useEffect, useState } from "react";
import { Layout, Flex, Row, Col } from 'antd';
import { Blog } from "@/types";
import BlogItem from "./Item";

const { Content } = Layout

const template: Blog = {
    Icon: 0,
    Title: `Title for `,
    Likes: 100,
    PublishedDate: "",
    Shares: 2,
    ShortDescription: `This is a Description for`
} 

export default function BlogList() {
    //will be set from the api
    const [tabItems, setTabItems] = useState<string[]>([]);
    const [data, setData] = useState<Blog[]>([]);
    const [selectedKey, setSelectedKey] = useState<string>("");

    const keySelect = (key: string) => {
        //make a api call using the key
        //get the data 
        //map to tabItems
        setSelectedKey(key);
    };

    useEffect(() => {
        //set the data
      //  setData([template]);
    }, [selectedKey]);

    useEffect(() => {
        //assuming api call...
        setTabItems(['Software Development', 'Coding', 'BlockChain', 'Next-Js', 'LeetCode']);

        var d = template;
        setData([d]);
    }, []);

    return (
        tabItems ? <>
            <Flex vertical>
                <Row>
                    <Flex className="tab" gap={"small"} align={"start"} justify="space-between">
                        {
                            tabItems.map(item =>
                                <span key={"item"} className="tab-btn" onClick={() => keySelect(item)}>
                                    {item}
                                </span>
                            )
                        }
                    </Flex>
                </Row>
                <Row>
                    <BlogItem Items={data} />
                </Row>
            </Flex>
        </>
            :
            <>
                <Content>
                    <h1>No Data</h1>
                </Content>
            </>
    );
}
