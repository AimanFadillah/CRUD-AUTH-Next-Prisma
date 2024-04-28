"use client"

import ButtonForm from "../component/ButtonForm";
import { useFormState } from "react-dom"
import submitHandle from "./submitHandle";

const initialState = {
    errors:{}
}

export default function Page() {
    const [state,formAction] = useFormState(submitHandle,initialState)
    return <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-8">
                <form action={formAction} className="border rounded p-3">
                    <h1 className="text-center" >Buat Barang</h1>
                    <div className="mt-4" >
                        <label className="form-label" >Nama Barang</label>
                        <input name="nama" className={`form-control ${!state.errors.nama || "is-invalid"}`} placeholder="Jeruk" />
                        {!state.errors.nama ||
                        <div className="invalid-feedback" >
                            {state.errors.nama[0]}
                        </div>
                        }
                    </div>
                    <div className="mt-4" >
                        <label className="form-label" >Foto Barang</label>
                        <input type="file" name="foto" className={`form-control ${!state.errors.foto || "is-invalid"}`} />
                        {!state.errors.foto ||
                        <div className="invalid-feedback" >
                            {state.errors.foto[0]}
                        </div>
                        }
                    </div>
                    <ButtonForm text={"Tambah"} />
                    </form>
            </div>
        </div>
    </div>
}
