import type { NextApiRequest, NextApiResponse } from 'next'
import { mongoInitialize } from '@/src/Database/mongodb';
import { ExpenseModel } from '@/src/model/expense';
import { v4 } from 'uuid';
import { Expense, Paged, Pagination } from "@/src/types";

//expense controller
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any> //todo: fix return type
) {
    try {
        await mongoInitialize();
        switch (req.method) {
            case 'POST':
                let reqBody = req.body;

                let newExpense = await ExpenseModel.create({ //should be in BE service
                    ...reqBody, _id: v4()
                });
                newExpense.save();
                res.status(200).json("success!!");
                break;
            case 'GET':
                //todo:
                //should be in BE service
                let pageSize: number = parseInt(req.query.pageSize as string) || 10;
                let page: number = parseInt(req.query.page as string) || 1;

                var expenses = await ExpenseModel.find({}).sort({ createdDate: 'desc' }).skip((page - 1) * pageSize).limit(pageSize);
                var total = await ExpenseModel.countDocuments();
                var result: Paged<Expense> = {
                    data: expenses as Expense[],
                    total: total
                }
                res.status(200).json(result);
                break;
        }
    } catch (err) {
        res.status(500).json(JSON.stringify("error: " + err));
        throw err;
    }
}