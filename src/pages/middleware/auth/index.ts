import Jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

//return 1 if valid else null
//todo: convert retrun type to enum
export default async function AuthMiddleWare(token: string) {
    if (!token) {
        return null;
    } else {
        //validate token
        try {
            const decoded = Jwt.verify(token as string, process.env.JWT_SECRET as string);
            var { code } = decoded as JwtPayload;
            let isValidCode: boolean = false;
            await bcrypt.compare(code, process.env.CODE as string)
                .then((res) => {
                    isValidCode = res;
                })
            if (isValidCode) {
                return 1;
            }
        } catch (err) {
            return null
        }

        return null;
    }
}