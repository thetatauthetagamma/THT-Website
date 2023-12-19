// middleware/middleware.js
import { parse } from 'url';
import { NextResponse } from 'next/server';
import { isBrother } from './auth';

export default async function middleware(req) {

  const url = parse(req.url || '', true);
  const path = url.pathname || '';

  const protectedRoutes = ["/brothers", "/brothers/broresources", "/brothers/memberdirectory", "/brothers/pledgetracking"];

  if (path.startsWith("/_next")) {
    return NextResponse.next();
  }

  const Cookie = req.cookies.get('userEmail').value

  if (Cookie == '' && protectedRoutes.includes(path)) {
    const httpsRedirectUrl = new URL(`/404`, req.nextUrl).toString();
    return NextResponse.redirect(httpsRedirectUrl);
  }

  if (Cookie != '' && protectedRoutes.includes(path)) {
    const isUserBrother = await isBrother(Cookie);


    if (!isUserBrother) {
      const httpsRedirectUrl = new URL(`/404`, req.nextUrl).toString();
      return NextResponse.redirect(httpsRedirectUrl);
    }
  }

  return NextResponse.next();
}
