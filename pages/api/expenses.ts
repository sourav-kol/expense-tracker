import type { NextApiRequest, NextApiResponse } from 'next'
import { mongoInitialize, Response } from '@/Database/mongodb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response | string>
) {
    //test- netlify
    switch (req.method) {
        case 'POST':
            res.status(200).json("post SUCCESS!!");
            break;
        case 'GET':
            res.status(200).json("get success!!");
            break;
    }
    //
    // try {
    //     var db = await mongoInitialize();
    //     switch (req.method) {
    //         case 'POST':
    //             res.status(201).json("SUCCESS!!");
    //             break;
    //         case 'GET':
    //             var result = await db.collection("expenses").find().toArray()
    //             res.status(200).json(result as Response);
    //             break;
    //     }
    // } catch (err) {
    //     res.status(500).json(JSON.stringify(err));
    //     throw err;
    // }
}