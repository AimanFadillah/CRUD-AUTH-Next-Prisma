"use server"

import { PrismaClient } from "@prisma/client";
import FormEdit from "./formEdit";


export default async function Page({params}) {
    const id = params.id;
    const prisma = new PrismaClient()
    const barang = await prisma.barang.findFirst({where:{id}})
    return <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-8">
                <FormEdit barang={barang} />
            </div>
        </div>
    </div>
}