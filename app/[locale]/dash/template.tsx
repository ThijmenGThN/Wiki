import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import pb from "@/helpers/pocketbase"

import type { ReactNode } from "react"

export default async function RestrictiveTemplate({ children }: { children: ReactNode }) {

    const authCookie = await cookies().get('pb_auth')
    pb.authStore.loadFromCookie('pb_auth=' + authCookie?.value)

    if (!pb.authStore.isValid) return redirect('/login')

    return (
        <>
            {children}
        </>
    )
}
