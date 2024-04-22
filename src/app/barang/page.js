"use client"

import { redirect, useRouter } from "next/navigation"

export default function Page() {
    return <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-8">
                <form action={async (formData) => {
                    await fetch("/api/barang",{method:"POST",body:formData})
                    redirect("/")
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