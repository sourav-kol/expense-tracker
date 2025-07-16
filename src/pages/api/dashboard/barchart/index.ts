import type { NextApiRequest, NextApiResponse } from 'next'
import { mongoInitialize } from '@/src/mongo-database/mongodb';
import { ExpenseModel } from '@/src/model/expense';
import { BarChartData } from "@/src/types";
import { withAuth } from '@/src/helper/AuthMiddleware';

//expense controller
const handler = async function handler(
    req: NextApiRequest,
    res: NextApiResponse<BarChartData[] | string>
) {
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
                            _id: { $dateToString: { format: "%Y-%m", date: "$createdDate" } },
                            totalAmount: { $sum: "$amount" },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            month: "$_id",
                            totalAmount: 1
                        }
                    }
                ]);

                let sum = response.reduce((acc, curr) => acc + curr.totalAmount, 0);
                var result: BarChartData[] = response.map((item) => {
                    return {
                        month: item.month,
                        totalAmount: item.totalAmount
                    }
                });

                res.status(200).json(result);
                break;
        }
    } catch (err) {
        res.status(500).json(JSON.stringify("error: " + err));
        throw err;
    }
}

export default withAuth(handler);