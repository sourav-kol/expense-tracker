'use client'

import { useState, useEffect } from "react"
import AppLayout from "@/src/layout/commonLayout";
import { Expense } from "@/src/types";
import { useRouter } from "next/router"
import { getExpenseById } from "@/src/service/expense.service";
import { formattedDate } from "@/src/helper/dateTimeHelper";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { TagsOutlined, DollarOutlined, ClockCircleOutlined, FileTextOutlined } from "@ant-design/icons";
import { Button } from "@/src/components/ui/button";

type Props = {

}

function ExpenseDetails() {
    const router = useRouter();
    const { id } = router.query;
    const [expense, setExpense] = useState<Expense | undefined>();

    useEffect(() => {
        if (id) {
            getExpenseById(id as string)
                .then(res => {
                    var date = formattedDate(res?.createdDate);
                    setExpense({ ...res, createdDate: date });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [id]);

    const handleBack = () => {
        router.back();
    };

    return (
        <AppLayout title="Expense Detail">
            <Button variant="outline" onClick={handleBack}>Back</Button>
            {expense && (
                <Card className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-4 mx-auto">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">{expense.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center mb-2">
                            <TagsOutlined className="mr-2" />
                            <span className="font-semibold">Category:</span>
                            <span className="ml-2">{expense.category}</span>
                        </div>
                        <div className="flex items-center mb-2">
                            <FileTextOutlined className="mr-2" />
                            <span className="font-semibold">Notes:</span>
                            <span className="ml-2">{expense.notes}</span>
                        </div>
                        <div className="flex items-center mb-2">
                            <DollarOutlined className="mr-2" />
                            <span className="font-semibold">Amount:</span>
                            <span className="ml-2">₹{expense.amount}</span>
                        </div>
                        <div className="flex items-center mb-2">
                            <ClockCircleOutlined className="mr-2" />
                            <span className="font-semibold">Created On:</span>
                            <span className="ml-2">{expense.createdDate}</span>
                        </div>
                    </CardContent>
                </Card>
            )}
        </AppLayout>
    );
}

export default ExpenseDetails;