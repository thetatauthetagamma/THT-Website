// middleware/middleware.js
import { parse } from 'url';
import { NextResponse } from 'next/server';
import { isBrother } from './auth';
import { isPledge } from './auth'
export default async function middleware(req) {

  const url = parse(req.url || '', true);
  const path = url.pathname || '';

  const protectedRoutes = ["/brothers", "/brothers/broresources", "/brothers/memberdirectory", "/brothers/pledgetracking"];

  if (path.startsWith("/_next")) {
    return NextResponse.next();
  }

  const Cookie = req.cookies.get('userEmail')

  if(Cookie == null)
  {
    return NextResponse.next();
  }

  if (Cookie.value == '' && protectedRoutes.includes(path)) {
    const httpsRedirectUrl = new URL(`/404`, req.nextUrl).toString();
    return NextResponse.redirect(httpsRedirectUrl);
  }

  if (Cookie.value != '' && protectedRoutes.includes(path)) {
    const isUserBrother = await isBrother(Cookie.value);


    if (!isUserBrother) {
      const httpsRedirectUrl = new URL(`/404`, req.nextUrl).toString();
      return NextResponse.redirect(httpsRedirectUrl);
    }
  }

  return NextResponse.next();
}
