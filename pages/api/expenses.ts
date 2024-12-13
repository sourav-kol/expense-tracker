import type { NextApiRequest, NextApiResponse } from 'next'
import { mongoInitialize } from '@/Database/mongodb';
import { ExpenseModel } from '@/model/expense';
import { v4 } from 'uuid';

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

                let newExpense = await ExpenseModel.create({
                    ...reqBody, _id: v4()
                });
                newExpense.save();
                res.status(200).json("success!!");
                break;
            case 'GET':
                var result = await ExpenseModel.find({}); //todo: should be in BE service
                res.status(200).json(result);
                break;
        }
    } catch (err) {
        res.status(500).json(JSON.stringify("error: " + err));
        throw err;
    }
}