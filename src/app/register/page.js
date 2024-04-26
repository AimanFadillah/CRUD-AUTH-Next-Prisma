"use client"

import Link from "next/link";
import ButtonForm from "../component/ButtonForm";
import {useFormState} from "react-dom"
import SubmitHandle from "./submitHandle";

export default function Login () {
    const [state,formAction] = useFormState(SubmitHandle,{errors:[]})

    return <div className="container mt-5" >
        <div className="row justify-content-center">
            <div className="col-8">
                <form action={formAction} className="border rounded p-3" >
                    <h1 className="text-center" >Register</h1>
                    <div className="mt-3" >
                        <label className="form-label" >Nama</label>
                        <input name="nama" className={`form-control ${!state.errors.nama || "is-invalid"}`} placeholder="Budi" />
                        {!state.errors.nama || 
                        <div className="invalid-feedback" >
                            {state.errors.nama}
                        </div>
                        }
                    </div>
                    <div className="mt-3" >
                        <label className="form-label" >Email</label>
                        <input name="email" type="email" className={`form-control ${!state.errors.email || "is-invalid"}`} placeholder="example@gmail.com" />
                        {!state.errors.email || 
                        <div className="invalid-feedback" >
                            {state.errors.email}
                        </div>
                        }
                    </div>
                    <div className="mt-3" >
                        <label className="form-label" >Password</label>
                        <input name="password" type="password" className={`form-control ${!state.errors.password || "is-invalid"}`} placeholder="****" />
                        {!state.errors.password || 
                        <div className="invalid-feedback" >
                            {state.errors.password}
                        </div>
                        }
                    </div>
                    <ButtonForm text={"Buat"} />
                    <div className="text-center mt-3" style={{fontSize:"14px"}} >Jika sudah punya aku bisa <Link href={"/login"} >Login</Link></div>
                </form>
            </div>
        </div>
    </div>
}