import { parse } from 'url';
import { NextResponse } from 'next/server';
import { isBrother, isPledge } from './auth';

export default async function middleware(req) {
  const url = parse(req.url || '', true);
  const path = url.pathname || '';

  // Exclude the error page from the list of protected routes
  const errorPage = '/404';

  // Include every route that starts with /brothers
  const brotherRoutes = [
    '/brothers',
    '/brothers/*',  // Match any route starting with /brothers/
  ];

  // Additional pledge routes if needed
  const pledgeRoutes = [
    '/pledges/pledgecalendar',
    '/pledges/progress',
    '/brothers/memberdirectory',
  ];

  if (path.startsWith('/_next')) {
    return NextResponse.next();
  }

  const userEmail = req.cookies.get('userEmail');

  if (!userEmail) {
    return NextResponse.next();
  }

  const isUserBrother = await isBrother(userEmail);
  const isUserPledge = await isPledge(userEmail);

  if (!isUserBrother && brotherRoutes.some(route => path.startsWith(route)) && path !== errorPage) {
    const httpsRedirectUrl = new URL(errorPage, req.nextUrl).toString();
    return NextResponse.redirect(httpsRedirectUrl);
  }

  if (!isUserPledge && pledgeRoutes.some(route => path.startsWith(route)) && path !== errorPage) {
    if (isUserBrother && path === '/brothers/memberdirectory') {
      return NextResponse.next();
    } else {
      const httpsRedirectUrl = new URL(errorPage, req.nextUrl).toString();
      return NextResponse.redirect(httpsRedirectUrl);
    }
  }

  return NextResponse.next();
}
