import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export async function GET (request) {
    const data = await prisma.barang.findMany();
    return Response.json(data);
}

export async function POST (request) {
    const data = {};
    (await request.formData()).forEach((val,key) => {data[key] = val})
    await prisma.barang.create({data})
    return Response.json({msg:"success"})
}
