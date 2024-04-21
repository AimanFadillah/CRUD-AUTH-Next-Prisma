import { PrismaClient } from "@prisma/client"
import Link from "next/link"

export default async function Page () {
  const prisma = new PrismaClient()
  const barangs = await prisma.barang.findMany()

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
              </tr>
            </thead>
            <tbody>
              {barangs.map((barang,index) => 
                <tr>
                  <th>{index + 1}</th>
                  <td>{barang.nama}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  </div>
}