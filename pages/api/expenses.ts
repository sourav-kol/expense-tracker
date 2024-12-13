import type { NextApiRequest, NextApiResponse } from 'next'
import { mongoInitialize } from '@/Database/mongodb';
import { Expense } from '@/model/expense';

//expense controller
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any> //todo: fix return type
) {
    try {
        await mongoInitialize();
        switch (req.method) {
            case 'POST':
                res.status(200).json("SUCCESS!!");
                break;
            case 'GET':
                var result = await Expense.find({}); //todo: should be in BE service
                res.status(200).json(result);
                break;
        }
    } catch (err) {
        res.status(500).json(JSON.stringify("error: " + err));
        throw err;
    }
}