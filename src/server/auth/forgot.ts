"use server"

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { redirect } from 'next/navigation'

import prisma from '@/prisma/client'
import Email from '@/emails/client'

import eReset from '@/emails/Reset'

import { vTypes } from '@/helpers/validation'

export async function request(email: string) {
    try {

        // ENSURE: All environment variables are set.
        if (
            !process.env.NEXTAUTH_SECRET ||
            !process.env.NEXTAUTH_URL
        ) throw new Error('Missing NEXTAUTH environment variables.')

        const passwordResetToken = jwt.sign({ email }, process.env.NEXTAUTH_SECRET, { expiresIn: '45m' })

        await prisma.user.update({
            where: { email },
            data: { passwordResetToken }
        })

        await Email(
            eReset({
                email,
                link: process.env.NEXTAUTH_URL + '/forgot/' + passwordResetToken,
                assets: { logoUrl: process.env.NEXTAUTH_URL + '/logo.webp' }
            }),
            {
                to: email,
                subject: 'Reset your password'
            }
        )
    }
    catch (_) { redirect('/login') }
}

export async function update({ password, token }: { password: string, token: string }) {
    try {

        // ENSURE: All environment variables are set.
        if (!process.env.NEXTAUTH_SECRET) throw new Error('Missing NEXTAUTH environment variables.')

        // VALIDATE: If the supplied data meets the requirements, it'll throw an error if this isn't the case.
        vTypes.password.parse(password)

        // CHECK: If the supplied token is valid and extract the content.
        const { email }: string | any = jwt.verify(token, process.env.NEXTAUTH_SECRET)

        // CHECK: If the supplied email exists and get the password reset token from the user account.
        const { passwordResetToken }: string | any = await prisma.user.findUnique({ where: { email } })

        // COMPARE: Supplied token to the account token which has been created upon password reset.
        if (token != passwordResetToken) throw new Error('The provided token is not valid.')

        await prisma.user.update({
            where: { email },
            data: {
                password: await bcrypt.hash(password, 12),
                passwordResetToken: null
            }
        })
    }
    catch (_) { redirect('/login') }
}
