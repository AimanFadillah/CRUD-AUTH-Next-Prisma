"use server"

import { PrismaClient } from "@prisma/client";
import { permanentRedirect } from "next/navigation";
import { z } from "zod"

const validate = z.object({
    nama:z.string({invalid_type_error:"Nama harus type string"}).refine(value => value.trim() != "",{message:"Nama wajib ada"})
})

export default async function submitHandle ({id},formData) {
    const data = {
        nama:formData.get("nama")
    }
    const validateData = validate.safeParse(data);

    if(!validateData.success){
        return {errors:validateData.error.flatten().fieldErrors,id}
    }

    const prisma = new PrismaClient();
    await prisma.barang.update({where:{id},data})
    permanentRedirect("/")
}