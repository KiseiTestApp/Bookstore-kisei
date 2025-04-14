import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get('idToken')
    if (!token) {
        const signInUrl = new URL('/account/sign-in/', request.url);
        return NextResponse.redirect(signInUrl);
    }
    return  NextResponse.next();
}

export const config = {
    matcher: ['/customer/order-history/:path*']
}