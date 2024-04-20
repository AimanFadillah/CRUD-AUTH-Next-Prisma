"use client"

import Link from "next/link";
import { Suspense } from "react";

export default function Home () {
  return <div className="container">
    <div className="row">
      <div className="col-md-6">
        <Suspense fallback={<h1>Loading mas</h1>} >
          <h1>Hai saya di home</h1>
        </Suspense>
      </div>
      <div className="" >
        <Link href="/dashboard" >Menuju dashboard</Link>
      </div>
    </div>
  </div>
}