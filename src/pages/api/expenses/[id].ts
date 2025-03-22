import type { NextApiRequest, NextApiResponse } from 'next'
import { mongoInitialize } from '@/src/mongo-database/mongodb';
import { ExpenseModel } from '@/src/model/expense';
import { withAuth } from '@/src/helper/AuthMiddleware';
//expense controller
const handler =  async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any> //todo: fix return type
) {
    try {
        await mongoInitialize();
        var { id } = req.query;
        if (id) {
            switch (req.method) {
                case 'GET':
                    //todo:
                    //should be in BE service
                    var result = await ExpenseModel.findById(id);
                    res.status(200).json(result);
                    break;
            }
            res.status(200).json(req.query);
        }else{
            res.status(500).json("Id cannot be null");
        }

    } catch (err) {
        res.status(500).json(JSON.stringify("error: " + err));
        throw err;
    }
}

export default withAuth(handler);