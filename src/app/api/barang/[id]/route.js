import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export async function GET (request,{params}){
    const id = params.id;
    const data = await prisma.barang.findFirst({where:{id}});
    return Response.json(data);
}

export async function PUT (request,{params}) {
    const data = {};
    (await request.formData()).forEach((val,key) => {data[key] = val})
    const id = params.id;
    await prisma.barang.update({where:{id},data});
    return Response.json({msg:"success"});
}

export async function DELETE  (request,{params}) {
    const id = params.id;
    await prisma.barang.delete({where:{id}});
    return Response.json({msg:"success"});
}

