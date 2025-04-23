import {NextRequest, NextResponse} from "next/server";

export async function middleware(req: NextRequest) {
    const {pathname, origin} = req.nextUrl;
    const publicPaths =
        [
            '/admin/sign-in',
            '/admin/api/admin/set-token',
            '/admin/api/set-token',
            '/account/sign-in',
        ];
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
        const responseData = await response.json();
        console.log('Full response:', responseData);
        if (!response.ok) {
            throw new Error(responseData.error || 'Authorization failed.');
        }
        const { role, error } = responseData;
        console.log('Role received:', role);
        console.log('Error received:', error);
        if (pathname.startsWith('/admin')) {
            if (role !== 'admin') {
                const url = req.nextUrl.clone();
                url.pathname = error === 'Admin user unauthorized' ? '/admin/sign-in' : '/no-access';
                return NextResponse.redirect(url);
            }
        }
        else if (pathname.startsWith('/customer')) {
            if (role !== 'user') {
                const url = req.nextUrl.clone();
                url.pathname = error === 'User not found' ? '/account/sign-in' : '/account/sign-up';
                return NextResponse.redirect(url);
            }
        }
        const headers = new Headers(req.headers);
        headers.set('x-user-role', role);

        return NextResponse.next({
            request: {
                headers
            }
        });
    } catch (error: any) {
        console.error('Middleware error:', {
            error: error?.message || 'Unknown error',
            stack: error?.stack,
            pathname
        });
        const url = req.nextUrl.clone();
        if (pathname.startsWith('/admin')) {
            url.pathname = '/admin/sign-in';
        } else {
            url.pathname = '/account/sign-in';
        }
        return NextResponse.redirect(url);
    }
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/customer/:path*',
    ],
}