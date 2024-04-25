"use server"
import { SignJWT,jwtVerify } from "jose"
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;

export async function encrypt (payload) {
    return new SignJWT(payload)
        .setProtectedHeader({alg:"HS256"})
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(secretKey)
}

export async function decrypt (session) {
    const {payload} = await jwtVerify(session,secretKey,{
        algorithms:["HS256"]
    })
    return payload
}

export async function createSession (data) {
    const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await encrypt({data,expiredAt})

    cookies().set("session",session,{
        httpOnly:true,
        secure:true,
        expires:expiredAt,
        sameSite:"lax",
        path:"/"
    })
}

export function deleteSession (){
    cookies().delete("session")
}