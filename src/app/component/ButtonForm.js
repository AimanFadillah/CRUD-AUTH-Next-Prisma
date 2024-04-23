"use client"

import {useFormStatus} from "react-dom";

export default function ButtonForm ({text,className}) {
    const {pending} = useFormStatus()

    return <button className={className || "btn btn-success mt-3 w-100"} disabled={pending} >
        {!pending || <span class="spinner-border spinner-border-sm me-1" aria-hidden="true"></span>}
        {text || "Submit"}
    </button>   
}