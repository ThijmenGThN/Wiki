"use server"

import jwt from 'jsonwebtoken'
import crypto from "crypto"
import bcrypt from 'bcrypt'
import { getServerSession } from "next-auth"

import prisma from '@/prisma/client'
import options from "@/auth/options"

import { vTypes } from '@/helpers/validation'

export async function create({ name }: { name: string }) {

    // ENSURE: All environment variables are set.
    if (!process.env.NEXTAUTH_SECRET) throw new Error('Missing NEXTAUTH environment variables.')

    // FIREWALL: Check if session is valid.
    const session = await getServerSession(options)
    if (!session || !session?.user.email) throw new Error('The session seems to be invalid.')

    // VALIDATE: If the supplied data meets the requirements.
    if (!vTypes.name.safeParse(name).success) throw new Error('The "name" attribute does not meet the requirements.')

    // CHECK: If the requester meets the criterias of creating a new token.
    if (await prisma.apiToken.findFirst({ where: { name, owner: session.user.email } })) throw new Error('An API token with the same name has already been generated.')
    if (await prisma.apiToken.count({ where: { owner: session.user.email } }) >= 25) throw new Error('You have reached the maximum limit for API tokens.')

    const token = crypto.randomBytes(20).toString()

    // INSERT: Newly created token into the database.
    await prisma.apiToken.create({
        data: {
            name,
            token: await bcrypt.hash(token, 12),
            owner: session.user.email
        }
    })

    // CONVERT: Token into json web token format and return it to the requester.
    return jwt.sign({ name, owner: session.user.email, token }, process.env.NEXTAUTH_SECRET)
}

export async function remove({ id }: { id: string }) {

    // ENSURE: All environment variables are set.
    if (!process.env.NEXTAUTH_SECRET) throw new Error('Missing NEXTAUTH environment variables.')

    // FIREWALL: Check if session is valid.
    const session = await getServerSession(options)
    if (!session || !session?.user.email) throw new Error('Invalid session.')

    await prisma.apiToken.delete({ where: { id, owner: session.user.email } })
}
