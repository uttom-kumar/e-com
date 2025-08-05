import { NextResponse } from "next/server";

export function middleware(request) {
    const token = request.cookies.get('token'); // ✅ Read cookie from request
    console.log(token)
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/add-cart', '/wishes', '/order', '/profile'], // ✅ Add leading slash
};
