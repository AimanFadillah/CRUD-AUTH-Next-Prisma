import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const routePublic = [
  "/barang",
  "/"
]

export function middleware(request) {
  if(request.nextUrl.pathname.includes(routePublic)){
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}
 
export const config = {
  
}