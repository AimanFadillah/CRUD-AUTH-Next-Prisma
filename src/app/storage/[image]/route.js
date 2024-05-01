import fs from "fs/promises"

export async function GET (request,{params}){
    try{
        const image = params.image;
        const readImage = await fs.readFile(`c:/project/learn-next/public/images/${image}`)
        return new Response(readImage,{
            status:"200",
            headers: { 'Content-Type': `image/jpeg`, },
        })
    }catch(e){
        return new Response("Page not found",{
            status:"400"
        })
    }
}