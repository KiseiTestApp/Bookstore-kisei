import {NextRequest, NextResponse} from "next/server";

export async function middleware(req: NextRequest) {
    const {pathname, origin} = req.nextUrl;
    const publicPaths = ['/admin/sign-in', '/admin/api/set-token'];
    if (publicPaths.some(path => pathname.startsWith(path))) {
        return NextResponse.next();
    }
    try {
        const response = await fetch(`${origin}/api/check-role`, {
            headers: {
                Cookie: req.cookies.toString(),
                'x-middleware-request': 'true'
            }
        });
        if (!response.ok) {
            console.log('Error occured with status code: ' + response.status);
        }
        const { role } = await response.json();
        const headers = new Headers(req.headers);
        headers.set('x-user-role', role);

        return NextResponse.next({
            request: {
                headers
            }
        });
    } catch (error: any) {
        console.log('Admin middleware error', error);
        const url = req.nextUrl.clone();
        url.pathname = error.message.includes('401') ? '/admin/sign-in' : '/no-access';
        return NextResponse.redirect(url);
    }
}

export const config = {
    matcher: ['/admin/:path*'],
}