"use server"

import { PrismaClient } from "@prisma/client";
import { permanentRedirect } from "next/navigation";
import { z } from "zod"
import bcrypt from "bcrypt"

const validate = z.object({
    nama:z.string().refine(value => value.trim() != "",{message:"Nama wajib ada"}),
    email:z.string().email({message:"Email tidak valid"}),
    password:z.string().refine(value => value.trim() != "",{message:"Password wajib ada"})
})

export default async function SubmitHandle (state,formData) {
    const data = {
        nama:formData.get("nama"),
        email:formData.get("email"),
        password:formData.get("password")
    }

    const validateData = validate.safeParse(data);

    if(!validateData.success){
        return {errors:validateData.error.flatten().fieldErrors}
    }

    data.password = bcrypt.hashSync(data.password,10)

    const prisma = new PrismaClient()
    await prisma.user.create({data})

    permanentRedirect("/login")
}