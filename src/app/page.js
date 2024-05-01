import { PrismaClient } from "@prisma/client"
import Link from "next/link";
import { permanentRedirect } from "next/navigation";
import { Suspense } from "react";
import ButtonForm from "./component/ButtonForm";
import { decrypt, deleteSession } from "./session";
import { cookies } from "next/headers";
import { unlinkSync } from "fs";

export default async function Page () {
  const user = (await decrypt(cookies().get("session")?.value)).data;
  const prisma = new PrismaClient();
  const barangs = await prisma.barang.findMany();
  return <div className="container">
    <div className="row" >
      <div className="col-6">
        <div>
          <h1 className="my-3" >User: {user.nama}</h1>
        </div>
      </div>
      <div className="col-6 d-flex align-items-center justify-content-end">
        <div>
          <Link href={"/barang"} className="btn btn-success" >Buat Barang</Link>
        </div>
        <div>
          <form action={async () => {
            "use server"
            await deleteSession()
            permanentRedirect("/")
          }} >
            <button className="btn btn-danger ms-1" >Logout</button>
          </form>
        </div>
      </div>
      <div className="col-12" >

        <div>
          <table className="table table-striped table-bordered text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Foto</th>
                <th>Nama</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <Suspense fallback={<tr>
                <td colSpan="4">Loading</td>
              </tr>} >
                {barangs.map((barang,index) => 
                  <tr key={index} >
                    <th>{index + 1}</th>
                    <td><img src={`/storage/${barang.foto}`} alt={barang.nama} className="img-fluid" width={100} /></td>
                    <td>{barang.nama}</td>
                    <td>
                      <Link href={`/barang/${barang.id}`} className="btn btn-primary me-2" >Edit</Link>
                      <form  className="d-inline" action={async () => {
                          "use server"
                          const prisma = new PrismaClient();
                          await unlinkSync(`./public/images/${barang.foto}`)
                          await prisma.barang.delete({where:{id:barang.id}});
                          permanentRedirect("/")
                        }} >
                          <ButtonForm className="btn btn-danger" text="Delete" />
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