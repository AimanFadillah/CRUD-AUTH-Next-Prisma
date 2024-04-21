"use client"

import { PrismaClient } from "@prisma/client"
import { useRouter } from 'next/navigation'

export default function Page() {
    const prisma = new PrismaClient();
    const router = useRouter()

    return <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-8">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.target);
                    prisma.barang.create({data:{
                        nama:formData.get("nama")
                    }})
                    router.push("/")
                }} className="border rounded p-3">
                    <h1 className="text-center" >Buat Barang</h1>
                    <div className="mt-4" >
                        <label className="form-label" >Nama Barang</label>
                        <input name="nama" className="form-control" placeholder="Jeruk" required={true} />
                    </div>
                    <button className="btn btn-success mt-3 w-100" >Tambah</button>
                </form>
            </div>
        </div>
    </div>
}