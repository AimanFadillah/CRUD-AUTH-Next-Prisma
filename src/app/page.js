import { PrismaClient } from "@prisma/client"
import Link from "next/link";
import { permanentRedirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page () {
  const prisma = new PrismaClient();
  const barangs = await prisma.barang.findMany();
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
              <Suspense fallback={<tr>
                <td colspan="3">Loading</td>
              </tr>} >
                {barangs.map((barang,index) => 
                  <tr key={index} >
                    <th>{index + 1}</th>
                    <td>{barang.nama}</td>
                    <td>
                      <Link href={`/barang/${barang.id}`} className="btn btn-primary me-2" >Edit</Link>
                      <form  className="d-inline" action={async () => {
                          "use server"
                          const prisma = new PrismaClient();
                          await prisma.barang.delete({where:{id:barang.id}});
                          permanentRedirect("/")
                        }} >
                        <button className="btn btn-danger" >Delete</button>
                      </form>
                    </td>
                  </tr>
                )}
              </Suspense>
             
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  </div>
}