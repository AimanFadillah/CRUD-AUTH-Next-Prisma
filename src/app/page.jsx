import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";

export default function Home () {
  return <div className="container">
    <div className="row">
      <div className="col-md-6">
        <Suspense fallback={<h1>Tolongg</h1>} >
          <h1>Hai saya di home</h1>
        </Suspense>
      </div>
      <div className="" >
        <Link href="/dashboard" >Menuju dashboard</Link>
      </div>
    </div>
  </div>
}