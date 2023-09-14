"use server"

import { getServerSession } from "next-auth"

import prisma from '@/prisma/client'
import options from "@/auth/options"

export async function update({ name }: { name: string }) {

    // FIREWALL: Check if session is valid.
    const session = await getServerSession(options)
    if (!session || !session?.user.email) throw new Error('The session seems to be invalid.')

    // REFLECT: Updated data to the database.
    await prisma.user.update({
        where: { email: session?.user.email },
        data: { name }
    })
}
