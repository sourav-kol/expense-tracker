import type { NextApiRequest, NextApiResponse } from 'next'
import { mongoInitialize } from '@/src/mongo-database/mongodb';
import { ExpenseModel } from '@/src/model/expense';
import { DashBoard } from "@/src/types";

//expense controller
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<DashBoard | string> //todo: fix return type
) {
    // return res.status(401).json("Unauthorized");
    try {
        await mongoInitialize();
        switch (req.method) {
            case 'POST':
                //todo:
                //should be in BE service
                // Get the total amount in the current month
                var startDate: Date = req.body.startDate;
                var endDate: Date = req.body.endDate;

                const response = await ExpenseModel.aggregate([
                    {
                        $match: {
                            createdDate: {
                                $gte: new Date(startDate),
                                $lte: new Date(endDate)
                            }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            total: { $sum: "$amount" }
                        }
                    }
                ]);

                var result: DashBoard = {
                    currentMonthExpense: response[0]?.total || 0
                }
                res.status(200).json(result);
                break;
        }
    } catch (err) {
        res.status(500).json(JSON.stringify("error: " + err));
        throw err;
    }
}