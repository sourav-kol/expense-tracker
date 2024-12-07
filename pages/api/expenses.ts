import type { NextApiRequest, NextApiResponse } from 'next'
import { mongoInitialize, Response } from '@/Database/mongodb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {
    try {
        var db = await mongoInitialize();
        switch (req.method) {
            case 'POST':
                res.status(201);
                break;
            case 'GET':
                var result = await db.collection("expenses").find().toArray()
                res.status(200).json(result);
                break;
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}