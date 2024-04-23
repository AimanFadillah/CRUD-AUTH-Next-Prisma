import { permanentRedirect } from "next/navigation"
import { PrismaClient } from "@prisma/client"
import ButtonForm from "../component/ButtonForm";

export default async function Page() {
    return <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-8">
                <form action={async (formData) => {
                    "use server"
                    const prisma = new PrismaClient();
                    await prisma.barang.create({data:{
                        nama:formData.get("nama")
                    }})
                    permanentRedirect("/")
                }} className="border rounded p-3">
                    <h1 className="text-center" >Buat Barang</h1>
                    <div className="mt-4" >
                        <label className="form-label" >Nama Barang</label>
                        <input name="nama" className="form-control" placeholder="Jeruk" required={true} />
                    </div>
                    <ButtonForm text={"Tambah"} />
                    </form>
            </div>
        </div>
    </div>
}
