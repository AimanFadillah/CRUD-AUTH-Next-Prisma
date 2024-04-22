"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"

export default function Page () {
  const [barangs,setBarangs] = useState([]);
    
  useEffect(() => {
      getBarangs();
  },[])

  const getBarangs = useCallback(async () => {
      const response = await fetch("/api/barang");
      const data = await response.json();
      setBarangs(data);
      return data;
  },[]);

  return <div className="container">
    <div className="row" >
      <div className="col-6">
        <div>
          <h1 className="my-3" >Kumpulan Barang</h1>
        </div>
      </div>
      <div className="col-6 d-flex align-items-center justify-content-end">
        <div>
          <Link href={"/barang"} className="btn btn-success" >Buat Barang</Link>
        </div>
      </div>
      <div className="col-12" >

        <div>
          <table className="table table-striped table-bordered text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Nama</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {barangs.map((barang,index) => 
                <tr key={index} >
                  <th>{index + 1}</th>
                  <td>{barang.nama}</td>
                  <td>
                    <Link href={`/barang/${barang.id}`} className="btn btn-primary me-2" >Edit</Link>
                    <button onClick={async () => {
                      if(confirm("Yakin?")){
                        const response = await fetch(`/api/barang/${barang.id}`,{
                          method:"DELETE"
                        })
                        getBarangs()
                      }
                    }} className="btn btn-danger" >Delete</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  </div>
}