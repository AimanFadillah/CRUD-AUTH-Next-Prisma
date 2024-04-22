"use client"

import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react";

export default function Page({params}) {
    const id = params.id;
    const router = useRouter()
    const [barang,setBarang] = useState({});

    useEffect(() => {
        getBarang();
    },[]);

    const getBarang = useCallback(async () => {
        const response = await fetch(`/api/barang/${id}`);
        const data = await response.json();
        setBarang(data);
        return data;
    },[]);


    return <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-8">
                <form onSubmit={async (e) => {
                    e.preventDefault()
                    await fetch(`/api/barang/${id}`,{method:"PUT",body:new FormData(e.target)})
                    router.push("/")
                }} className="border rounded p-3">
                    <h1 className="text-center" >Edit Barang</h1>
                    <div className="mt-4" >
                        <label className="form-label" >Nama Barang</label>
                        <input name="nama" defaultValue={barang.nama} className="form-control" placeholder="Jeruk" required={true} />
                    </div>
                    <button className="btn btn-success mt-3 w-100" >Tambah</button>
                </form>
            </div>
        </div>
    </div>
}