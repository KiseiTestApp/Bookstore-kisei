import {NextRequest, NextResponse} from "next/server";

export async function middleware(req: NextRequest) {
    const {pathname, origin} = req.nextUrl;
    const publicPaths = ['/admin/sign-in'];
    if (publicPaths.includes(pathname)) {
        return NextResponse.next();
    }
    const response = await fetch(`${origin}/api/check-role`, {
        headers: {
            Cookie: req.headers.get('Cookie') || '',
        }
    })
    if (response.ok) {
        return NextResponse.next();
    }
    const url = req.nextUrl.clone();
    url.pathname = response.status === 401 ? '/admin/sign-in' : '/no-access';
    return NextResponse.redirect(url);
}

export const config = {
    matcher: ['/admin/:path*'],
}