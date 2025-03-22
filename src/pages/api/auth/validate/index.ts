import type { NextApiRequest, NextApiResponse } from 'next'
import jwt, { JwtPayload } from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
    if (req.method === 'GET') {
        const token = req.headers["x-token"];

        if (!token) {
            return;
        } else {
            //validate token
            try {
                const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string) as JwtPayload;
                const { code } = decoded;

                if(process.env.CODE == code)
                    res.status(200).json("Token is valid");
                else
                    res.status(401).json("Invalid token");
            } catch (err) {
                res.status(401).json("Invalid or expired token");
            }
            //send response
            res.status(200).json('Token is valid');
        }
    }
}
