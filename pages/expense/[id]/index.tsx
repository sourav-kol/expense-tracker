'use client'

import { useState, useEffect } from "react"
import AppLayout from "@/layout/commonLayout";
import { Expense } from "@/types";
import { useRouter } from "next/router"
import { ExpenseData } from "@/api/fake-api";
import { Flex, Row } from "antd";
import Image from "next/image";

import { TagsOutlined, CalendarOutlined, DollarOutlined, ClockCircleOutlined, FileTextOutlined } from "@ant-design/icons";
import svgImg from "@/public/images/arrow-down_gray.svg"

type Props = {

}

function ExpenseDetails() {
    const router = useRouter();
    const { id } = router.query;
    const [expense, setExpense] = useState<Expense | undefined>();

    useEffect(() => {
        setExpense(ExpenseData.expenseList.find(s => s.id.toString() == id));
    }, []);

    return <AppLayout>
        <h1>Expense Detail</h1>
        <section className="detail-section">
            <Flex vertical align={"start"} gap={"small"}>
                <Image alt="image" src={svgImg} className="detail-img" />
                <Row>
                    <h2>{expense?.title}</h2>
                </Row>
                <Row>
                    <TagsOutlined />
                    <label><strong>Category</strong></label>
                    <p>{expense?.category}</p>
                </Row>

                <Row>
                    <CalendarOutlined />
                    <label><strong>Date</strong></label>
                    <p>{expense?.date}</p>
                </Row>
                <Row>
                    <FileTextOutlined />
                    <label><strong>Notes</strong></label>
                    <p>{expense?.notes}</p>
                </Row>
                <Row>
                    <DollarOutlined />
                    <label><strong>Amount</strong></label>
                    <p>{expense?.amount}</p>
                </Row>
                <Row>
                    <ClockCircleOutlined />
                    <label><strong>Created On</strong></label>
                    <p>{expense?.createdDate}</p>
                </Row>
            </Flex>
        </section>
    </AppLayout>;
}

export default ExpenseDetails;