import type { NextApiRequest, NextApiResponse } from 'next'
import { sendEmail } from "@/src/service/emailService";
import { mongoInitialize } from '@/src/database/mongodb';
import { ExpenseModel } from '@/src/model/expense';
import { Expense, Paged } from "@/src/types";
import { replaceMergeFields } from "@/src/helper/stringHelper";
import emailTemplate from "@/src/emailTemplates/index.json";
import { DefaultCategory } from "@/src/constants/AppConstants";

//expense controller
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    try {
        await mongoInitialize();

        switch (req.method) {
            case 'POST':
                console.log("Sending email");

                var subject = `Spend Track - Monthly Expense Summary (${new Date().getMonth() + 1}/${new Date().getFullYear()})`;

                let pageSize: number = 10;
                let page: number = 1;

                var expenses = await ExpenseModel.find({}).sort({ createdDate: 'desc' }).skip((page - 1) * pageSize).limit(pageSize);
                var total = await ExpenseModel.countDocuments();
                var result: Paged<Expense> = {
                    data: expenses as Expense[],
                    total: total
                }

                var dynamicTableContent = "";
                result.data.map(expense => {
                    dynamicTableContent +=  `<tr>
                    <td>${expense.title}</td>
                    <td>${DefaultCategory[expense.category.toString()]}</td>
                    <td>${expense.amount}</td>`
                });

                // Read content from file
                const replacements = {
                    elements: dynamicTableContent,
                    month: "",
                    year: new Date().getFullYear().toString(),
                    totalExpense: "0"
                };
                
                const templateBody = emailTemplate.monthlyExpense.join("");
                const body = replaceMergeFields(templateBody, replacements);

                await sendEmail(subject, body);
                res.status(200).json("Email sent successfully");
                break;
        }
    } catch (err) {
        res.status(500).json(JSON.stringify("error: " + err));
        throw err;
    }
}