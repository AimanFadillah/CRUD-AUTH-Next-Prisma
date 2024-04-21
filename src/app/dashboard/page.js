import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";

export default function Dashboard () {
    return <Suspense fallback={<h1>Loading</h1>} >
        <h1>Ini Dashboard hai</h1>
    </Suspense>
}