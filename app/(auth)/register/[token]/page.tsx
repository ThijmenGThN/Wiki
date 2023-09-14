import Link from 'next/link'
import Image from 'next/image'
import jwt from 'jsonwebtoken'

import gravatar from '@/helpers/gravatar'

import Register from '@/components/auth/Register'

import aLogo from '@/assets/logo.webp'

export default function Page({ params: { token } }: { params: { token: string } }) {
    let { email }: any = jwt.decode(token)

    try {
        
        // ENSURE: All environment variables are set.
        if (!process.env.NEXTAUTH_SECRET) throw new Error('Missing NEXTAUTH environment variables.')

        jwt.verify(token, process.env.NEXTAUTH_SECRET)
        
    }
    catch (_) { email = undefined }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link href="/">
                    <Image
                        className="mx-auto h-10 w-auto"
                        src={aLogo}
                        alt=""
                    />
                </Link>
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    {
                        email
                            ? "Complete your registration"
                            : "Registration has expired"
                    }
                </h2>
            </div>

            <div className="relative my-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    {
                        email
                            ? (
                                <>
                                    <div className="flex mb-8 flex-col items-center justify-center gap-y-4">
                                        <Image
                                            className="h-16 w-16 rounded-full bg-gray-50 border"
                                            src={gravatar(email)}
                                            width={80}
                                            height={80}
                                            alt=""
                                        />
                                        <p className="truncate text-sm font-medium text-gray-900">{email}</p>
                                    </div>

                                    <Register email={email} />
                                </>
                            )
                            : (
                                <>
                                    <p className="truncate text-sm font-medium text-gray-900">
                                        The registration has reached its expiration date
                                    </p>

                                    <Link href="/register" className="mt-5 flex w-full gap-x-2 items-center justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                                        Sign up for a new account
                                    </Link>
                                </>
                            )
                    }
                </div>

                <div className="absolute -bottom-10 left-5 text-center text-sm text-gray-500">
                    <Link href="/login">
                        ← Sign in to a different account
                    </Link>
                </div>
            </div >
        </div >
    )
}
