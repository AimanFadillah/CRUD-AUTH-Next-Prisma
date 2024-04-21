import { PrismaClient } from "@prisma/client"

export async function GET (request){
    const prisma = new PrismaClient()

    const barang = await prisma.barang.findMany();

    return Response.json(barang)
}
