import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from "next/server"

import prisma from '@/prisma/client'

let apiSessionRequests = 0

export async function GET(req: NextRequest) {

    // REQUIRE: The requester to have a valid api token, the code block below will check it's integrity.
    try {
        if (!process.env.NEXTAUTH_SECRET) throw new Error('Missing NEXTAUTH environment variables.')

        const bearerToken = req.headers.get('authorization')?.split(' ')[1]
        if (!bearerToken) return NextResponse.json('An authorization bearer token is required.', { status: 400 })

        var { name, owner, token } = jwt.verify(bearerToken, process.env.NEXTAUTH_SECRET) as { name: string, owner: string, token: string }

        const { token: hashToken } = await prisma.apiToken.findFirstOrThrow({ where: { name, owner } })

        if (!await bcrypt.compare(token, hashToken)) throw new Error("The provided API token does not match with our records.")
    }
    catch (_) { return NextResponse.json('The authorization bearer token provided has expired.', { status: 401 }) }

    // ----- Requester has a valid API Token -----

    apiSessionRequests++

    return NextResponse.json({
        users: {
            total: await prisma.user.count()
        },
        api: {
            requester: {
                name,
                owner
            },
            session: {
                requests: apiSessionRequests
            }
        }
    }, { status: 200 })
}
