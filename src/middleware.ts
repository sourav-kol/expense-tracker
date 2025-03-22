// /middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import jwt, { JwtPayload } from "jsonwebtoken";

// Apply middleware only to API routes
export const config = {
    matcher: ["/api/expenses/:path*", "/api/dashboard/:path*"],
    // runtime: "nodejs"
};

export function middleware(req: NextRequest) {
    const token: string | null = req.headers.get("x-token");

    if (!token) {
        return NextResponse.json({ message: "Unauthorized: token not passed" }, { status: 401 });
    } else {
        //validate token
        // const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string) as JwtPayload;
    //     const { code } = decoded;
    //     console.log("code ", code);

    //     if (process.env.CODE == code)
    //         return NextResponse.next();
    //     else
    //         return NextResponse.json({ message: "Unauthorized: token not matched" }, { status: 401 });
    }
    return NextResponse.next();

}
