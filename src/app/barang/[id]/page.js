import ButtonForm from "@/app/component/ButtonForm";
import { PrismaClient } from "@prisma/client";
import { permanentRedirect } from "next/navigation";

export default async function Page({params}) {
    const id = params.id;
    const prisma = new PrismaClient()
    const barang = await prisma.barang.findFirst({where:{id}})
    return <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-8">
                <form action={async (formData) => {
                    "use server"
                    const prisma = new PrismaClient();
                    await prisma.barang.update({where:{id},data:{
                        nama:formData.get("nama")
                    }})
                    permanentRedirect("/")
                }} className="border rounded p-3">
                    <h1 className="text-center" >Edit Barang</h1>
                    <div className="mt-4" >
                        <label className="form-label" >Nama Barang</label>
                        <input name="nama" defaultValue={barang.nama} className="form-control" placeholder="Jeruk" required={true} />
                    </div>
                    <ButtonForm text={"Update"} />
                </form>
            </div>
        </div>
    </div>
}