import jwt from 'jsonwebtoken'

import prisma from '@/prisma/client'
import Encoding from '@/helpers/encoding'

import Reset from './Reset'

export default async function Page({ params: { token } }: { params: { token: string } }) {

    if (!process.env.NEXTAUTH_SECRET) throw new Error('Internal server error, please try again later.')

    const decodedToken = Encoding.fromBase64(token)

    let { email }: any = jwt.decode(decodedToken)

    jwt.verify(decodedToken, process.env.NEXTAUTH_SECRET)

    const { passwordResetToken }: any = await prisma.user.findUnique({ where: { email } })

    if (decodedToken != passwordResetToken) throw new Error('The password reset has reached its expiration date.')

    return <Reset
        token={token}
        email={email}
    />
}
