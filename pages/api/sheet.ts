import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
    message: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    switch(req.method)
    {
        case 'POST':
            res.status(200).json({ message: 'post' });
            break;
        case 'GET':
            res.status(200).json({ message: 'get' });
            break;
    }
}