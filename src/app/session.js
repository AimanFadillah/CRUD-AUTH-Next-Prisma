"use server"
import { SignJWT,jwtVerify } from "jose"
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodeKey = new TextEncoder().encode(secretKey)

export async function encrypt (payload) {
    return new SignJWT(payload)
        .setProtectedHeader({alg:"HS256"})
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(encodeKey)
}

export async function decrypt (session) {
    const {payload} = await jwtVerify(session,encodeKey,{
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

export async function deleteSession (){
    cookies().delete("session")
}