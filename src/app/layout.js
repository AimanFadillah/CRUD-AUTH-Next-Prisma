"use client"

import { Poppins } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css"
import "./globals.css";
import { useEffect } from "react";

const poppins = Poppins({ subsets:["latin"],weight:"400" });

export default function RootLayout({ children  }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.js")
  },[])

  return (
    <html lang="en">
      <head>
        <title>Website</title>
      </head>
      <body data-bs-theme="dark" className={poppins.className}>
          {children}
      </body>
    </html>
  );
}
