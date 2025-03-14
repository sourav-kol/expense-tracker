import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken';
import { sendEmail } from "@/src/service/email.service";
import emailTemplate from "@/src/emailTemplates/index.json";
import { replaceMergeFields } from '@/src/helper/stringHelper';

export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
    if (req.method === 'POST') {
        const { email } = req.body;
        
        if (!email) {
            res.status(400).json('Email is required');
            return;
        } else {
            //generate token
            //generate url
            //send url via mail
            const token = jwt.sign({ email }, process.env.JWT_SECRET as string, { expiresIn: '20m' });

            // Read content from file
            if (token) {
                const replacements = {
                    magicLink: process.env.APP_URL + "/auth/validate?token=" + token,
                    year: new Date().getFullYear().toString(),
                    name: "User - 01"
                };

                const subject = "Spend Track - Login";
                const templateBody = emailTemplate.magicLink.join("");
                const body = replaceMergeFields(templateBody, replacements);

                // await sendEmail(email, subject, body);

                res.status(200).json(body);
            } else {
                res.status(500).json('Token not generated');
            }
        }
    }
}
