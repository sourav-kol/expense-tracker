import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";

// Middleware wrapper
export const withAuth = (handler: NextApiHandler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        let token: string | null = req.headers["x-token"] as string;

        if (!token) {
            return res.status(403).json({ message: "Unauthorized: token not passed" });
        } else {
            //validate token
            const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string) as JwtPayload;
            const { code } = decoded;

            if (process.env.CODE == code) {
                return handler(req, res);
            }
            else
                return res.status(403).json({ message: "Unauthorized: token not matched" });
        }
    };
};
