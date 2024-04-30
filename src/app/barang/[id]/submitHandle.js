"use server"

import { PrismaClient } from "@prisma/client";
import { permanentRedirect } from "next/navigation";
import { z } from "zod"
import path from "path"
import { writeFile } from "fs/promises";
import { unlinkSync } from "fs";

const validate = z.object({
    nama:z.string({invalid_type_error:"Nama harus type string"}).refine(value => value.trim() != "",{message:"Nama wajib ada"}),
})

const validateImage = z.any().refine(validateTypeImage,{message:"Tipe foto tidak di izinkan"})
                                .refine(validateSizeImage,{message:"Ukuran foto terlalu besar"})

export default async function submitHandle ({id},formData) {
    const prisma = new PrismaClient();
    const foto = formData.get("foto")
    const data = {
        nama:formData.get("nama"),
    }

    const validateData = validate.safeParse(data);

    const result = {
        success:validateData.success,
        errors:!validateData.success ? validateData.error.flatten().fieldErrors : {},
        id,
    }

    if(foto.size != 0){
        const validateDataImage = validateImage.safeParse(foto);
        if(!validateDataImage.success){
            result.errors.foto = validateDataImage.error.errors[0].message
            result.success = false
        }
    }

    if(!result.success){
        return result;
    }

    if(foto.size != 0){
        const afterFoto = await prisma.barang.findFirst({where:{id}})
        unlinkSync(`./public/images/${afterFoto.foto}`)
        const namaFoto = `${Date.now()}${((Math.random() * 1e9).toString()).replace(".","")}${path.extname(foto.name)}`
        const bufferFoto = Buffer.from(await foto.arrayBuffer())
        await writeFile(`./public/images/${namaFoto}`,bufferFoto)
        data.foto = namaFoto;
    }

    await prisma.barang.update({where:{id},data})
    permanentRedirect("/")
}

function validateTypeImage (image) {
    if(!image) return false
    const allowedType = [".jpg",".jpeg",".png"]
    const ext = path.extname(image.name)
    if(!allowedType.includes(ext.toLocaleLowerCase())) return false
    return true
}

function validateSizeImage (image) {
    if(!image) return false;
    if(image.size > mb(5)) return false
    return true;
}

function mb (angka) {
    return angka * 1000000;
}