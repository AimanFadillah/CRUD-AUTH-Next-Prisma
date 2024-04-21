import { PrismaClient } from "@prisma/client"
import { redirect } from 'next/navigation'

const prisma = new PrismaClient();

export async function POST (request) {
    const data = {};
    (await request.formData()).forEach((val,key) => {data[key] = val})
    await prisma.barang.create({data})
    return Response.json({msg:"success"})
}