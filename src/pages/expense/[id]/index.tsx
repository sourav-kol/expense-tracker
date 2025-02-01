'use client'

import { useState, useEffect } from "react"
import AppLayout from "@/src/layout/commonLayout";
import { Expense } from "@/src/types";
import { useRouter } from "next/router"
import { Col, Flex, Row } from "antd";
import Image from "next/image";
import { getExpenseById } from "@/src/clientService/expenseService";
import { formattedDate } from "@/src/helper/dateTimeHelper";

import { TagsOutlined, DollarOutlined, ClockCircleOutlined, FileTextOutlined } from "@ant-design/icons";
import svgImg from "@/src/public/images/arrow-down_gray.svg"

type Props = {

}

function ExpenseDetails() {
    const router = useRouter();
    const { id } = router.query;
    const [expense, setExpense] = useState<Expense | undefined>();

    useEffect(() => {
        getExpenseById(id as string)
            .then(res => {
                var date = formattedDate(res?.createdDate);
                setExpense({ ...res, createdDate: date });
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return <AppLayout>
        <h1>Expense Detail</h1>
        <section className="detail-section">
            <Flex align={"start"} gap={"small"}>
                <Col>
                    <Image alt="image" src={svgImg} className="detail-img" />
                </Col>
                <Col>
                    <Row>
                        <h2>{expense?.title}</h2>
                    </Row>
                    <Row>
                        <TagsOutlined />
                        <label><strong>Category</strong></label>
                        <p>{expense?.category}</p>
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
                </Col>
            </Flex>
        </section>
    </AppLayout>;
}

export default ExpenseDetails;