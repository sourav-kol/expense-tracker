import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
    if (req.method === 'GET') {
        const { token } = req.query;

        if (!token) {
            res.status(400).json('Token is required');
            return;
        } else {
            //validate token
            try {
                const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string);
                console.log("decoded value ",decoded);
                res.status(200).json("Token is valid");
            } catch (err) {
                res.status(401).json("Invalid or expired token");
            }
            //send response
            res.status(200).json('Token is valid');
        }
    }
}
