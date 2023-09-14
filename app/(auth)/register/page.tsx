"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'

import gravatar from '@/helpers/gravatar'
import * as actions from "@/server/auth/register"

import OAuth from '@/components/auth/OAuth'

import aLogo from '@/assets/logo.webp'

import validate from '@/helpers/validation'
import Form from '@/components/Form'

export default function Page() {
    const params = useSearchParams()
    const [isPending, startTransition] = useTransition()

    const [formEmail, setFormEmail] = useState<string>()
    const [hasBeenSent, setHasBeenSent] = useState<boolean>(false)

    const onSubmit = ({ email }: any) => new Promise<void>(async (resolve, throwError) => {
        startTransition(async () => {
            if (!email) return

            try { await actions.request(email) }
            catch (_) { return throwError('This email address is already taken') }

            setFormEmail(email)
            setHasBeenSent(true)
        })
    })

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
                    Sign up for an account
                </h2>
            </div>

            <div className="relative my-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    {
                        hasBeenSent
                            ? (
                                <div className="flex flex-col items-center justify-center gap-y-4">
                                    <Image
                                        className="h-16 w-16 rounded-full bg-gray-50 border"
                                        src={gravatar(formEmail ?? '')}
                                        width={80}
                                        height={80}
                                        alt=""
                                    />
                                    <p className="truncate text-sm font-medium text-gray-900">
                                        {formEmail}
                                    </p>

                                    <p className="truncate text-sm mt-4 text-center font-medium text-gray-900">
                                        We have sent you an email to create an account
                                    </p>
                                </div>
                            )
                            : (
                                <>
                                    <Form
                                        onSubmit={onSubmit}
                                        validator={validate.objects.email}
                                        submit={{ label: 'Continue', position: 'full' }}
                                        fields={[
                                            { id: 'email', type: 'email', label: 'Email address' }
                                        ]}
                                    />

                                    <OAuth />
                                </>
                            )
                    }
                </div>

                <div className="absolute -bottom-10 left-5 text-center text-sm text-gray-500">
                    <Link href="/login">
                        ← Already have an account?
                    </Link>
                </div>
            </div>
        </div>
    )
}
