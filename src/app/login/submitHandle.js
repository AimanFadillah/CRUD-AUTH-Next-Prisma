"use server"

import { PrismaClient } from "@prisma/client";
import { permanentRedirect } from "next/navigation";
import { z } from "zod"
import { createSession } from "../session";
import bcrypt from "bcrypt";

const validate = z.object({
    email:z.string().email({message:"Email tidak valid"}),
    password:z.string().refine(value => value.trim() != "",{message:"Password wajib ada"})
})

export default async function SubmitHandle (state,formData) {
    const data = {
        email:formData.get("email"),
        password:formData.get("password")
    }

    const validateData = validate.safeParse(data);

    if(!validateData.success){
        return {errors:validateData.error.flatten().fieldErrors}
    }

    const prisma = new PrismaClient()
    const user = await prisma.user.findFirst({where:{email:data.email}});

    if(user && bcrypt.compareSync(data.password,user.password)){
        delete user.password
        await createSession(user);
        return permanentRedirect("/")
    }

    return {errors:{
            email:"  ",
            password:"Email atau password salah"
        }
    }
}