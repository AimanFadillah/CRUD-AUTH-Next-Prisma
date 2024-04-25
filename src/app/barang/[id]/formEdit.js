"use client"

import ButtonForm from "@/app/component/ButtonForm";
import {useFormState} from "react-dom"
import submitHandle from "./submitHandle";

export default function FormEdit ({barang}) {
    const [state,formAction] = useFormState(submitHandle,{errors:{},id:barang.id})

    return <form action={formAction} className="border rounded p-3">
    <h1 className="text-center" >Edit Barang</h1>
    <div className="mt-4" >
        <label className="form-label" >Nama Barang</label>
        <input name="nama" defaultValue={barang.nama} className={`form-control ${!state.errors.nama || "is-invalid" }`} placeholder="Jeruk"  />
        {!state.errors.nama || 
        <div className="invalid-feedback" >
            {state.errors.nama}
        </div>
        }
    </div>
    <ButtonForm text={"Update"} />
</form>
}