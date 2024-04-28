"use server"

import { PrismaClient } from "@prisma/client";
import { permanentRedirect } from "next/navigation";
import { z } from "zod"
import path from "path"
import { writeFile } from "fs/promises";

const validate = z.object({
    nama:z.string({invalid_type_error:"Nama harus type string"}).refine(value => value.trim() != "",{message:"Nama wajib ada"}),
    foto:z.any().refine(value => value.size != 0,{message:"Foto wajib ada"})
                .refine(validateTypeImage,{message:"Tipe foto tidak di izinkan"})
                .refine(validateSizeImage,{message:"Ukuran foto terlalu besar"})
})

export default async function submitHandle (state,formData) {
    const data = {
        nama:formData.get("nama"),
        foto:formData.get("foto")
    }
    
    const validateData = validate.safeParse(data);

    if(!validateData.success){
        return {errors:validateData.error.flatten().fieldErrors}
    }
    
    const namaFoto = `${Date.now()}${((Math.random() * 1e9).toString()).replace(".","")}${path.extname(data.foto.name)}`
    const bufferFoto = Buffer.from(await data.foto.arrayBuffer())
    await writeFile(`./public/images/${namaFoto}`,bufferFoto)

    const prisma = new PrismaClient();
    data.foto = namaFoto;
    await prisma.barang.create({data});
    
    return permanentRedirect("/");
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
