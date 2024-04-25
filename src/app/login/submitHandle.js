"use server"

import { PrismaClient } from "@prisma/client";
import { permanentRedirect } from "next/navigation";
import { z } from "zod"

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

    permanentRedirect("/")
}