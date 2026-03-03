import type { NextApiRequest, NextApiResponse } from 'next';
import { mongoInitialize } from '@/src/mongo-database/mongodb';
import { ExpenseModel } from '@/src/model/expense';
import { withAuth } from '@/src/helper/AuthMiddleware';

//expense controller
const handler = async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any> //todo: fix return type
) {
    try {
        await mongoInitialize();
        switch (req.method) {
            case 'GET':
                break;
            case 'POST':
                const fourWeeksAgo = new Date();
                fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28); // 4 weeks * 7 days

                var result = await ExpenseModel.aggregate([
                    {
                        $match: {
                            createdDate: { $gte: fourWeeksAgo }
                        }
                    },
                    {
                        $group: {
                            _id: {
                                // Using $dateToParts ensures we handle the date correctly
                                year: { $year: "$createdDate" },
                                week: { $week: "$createdDate" }
                            },
                            expenses: { $push: "$$ROOT" },
                            totalAmount: { $sum: "$amount" },
                            weekStartDate: { $min: "$createdDate" }
                        }
                    },
                    { $sort: { "_id.year": -1, "_id.week": -1 } },
                    {
                        $project: {
                            _id: 0,
                            weekNumber: "$_id.week",
                            year: "$_id.year",
                            totalAmount: 1,
                            expenses: 1,
                            weekStartDate: 1
                        }
                    }
                ]);
                res.status(200).json(result);
                break;
        }
    } catch (err) {
        res.status(500).json(JSON.stringify("error: " + err));
        throw err;
    }
}

export default withAuth(handler); 