import type { NextApiRequest, NextApiResponse } from 'next';
import Jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
    if (req.method === 'POST') {
        const { code } = req.body;
        try {
            if (!code) {
                res.status(401).json('Code is required');
                return;
            } else {
                let isValidCode: boolean = false;
                var decodedHash: string = atob(process.env.CODE as string);

                isValidCode = await bcrypt.compare(code, decodedHash)

                if (isValidCode) {
                    var token = Jwt.sign({ code: process.env.CODE }, process.env.JWT_SECRET as string, { expiresIn: '30m' });
                    return res.status(200).json(token);
                } else {
                    return res.status(401).json('Invalid code');
                }
            }
        } catch (error: any) {
            return res.status(403).json(error);
        }
    }
}
