"use server"

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import prisma from '@/prisma/client'
import Email from '@/emails/client'

import eRegister from '@/emails/Register'

import validate from '@/helpers/validation'

interface iUser {
    name: string
    email: string
    password: string
}

export async function request(email: string) {

    // ENSURE: All environment variables are set.
    if (
        !process.env.NEXTAUTH_URL ||
        !process.env.NEXTAUTH_SECRET
    ) throw new Error('Missing NEXTAUTH environment variables.')

    // ENFORCE: No duplicate user entries.
    if (await prisma.user.findUnique({ where: { email } })) throw new Error('This email address is already taken')

    // CREATE: A new token which will be supplied within the email to ensure right of registration.
    const token = jwt.sign({ email }, process.env.NEXTAUTH_SECRET, { expiresIn: '1d' })

    await Email(
        eRegister({
            email,
            link: process.env.NEXTAUTH_URL + '/register/' + token,
            assets: { logoUrl: process.env.NEXTAUTH_URL + '/logo.webp' }
        }),
        {
            to: email,
            subject: 'Complete your registration'
        }
    )
}

export async function create(userData: iUser) {

    // ENSURE: All environment variables are set.
    if (
        !process.env.NEXTAUTH_URL ||
        !process.env.NEXTAUTH_SECRET
    ) throw new Error('Missing NEXTAUTH environment variables.')

    // VALIDATE: If the supplied data meets the requirements.
    const { name, email, password } = validate.objects.user.parse(userData)

    // CREATE: New user account.
    await prisma.user.create({
        data: {
            name, email,
            password: await bcrypt.hash(password, 12)
        }
    })
}