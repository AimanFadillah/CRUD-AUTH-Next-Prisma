import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const routeProtected = [
  "/"
]

const routeDynamicProtected = [
  "/barang",
]

const routePublic = [
  "/login",
  "/register"
]


export function middleware(request) {
  const session = cookies().get("session")?.value

  if(!session && routeProtected.includes(request.nextUrl.pathname) || request.nextUrl.pathname.includes(routeDynamicProtected)){ // dynamic route
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if(session && routePublic.includes(request.nextUrl.pathname)){
    return NextResponse.redirect(new URL("/",request.url))
  }

  return NextResponse.next()
}
 
export const config = {
  
}