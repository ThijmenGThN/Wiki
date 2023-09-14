"use client"

import Link from "next/link"
import Image from 'next/image'
import { useState, useTransition } from "react"

import gravatar from "@/helpers/gravatar"
import * as actions from "@/server/auth/forgot"

import validate from '@/helpers/validation'

import Form from "@/components/Form"

import aLogo from '@/assets/logo.webp'

export default function Page() {
    const [isPending, startTransition] = useTransition()

    const [formEmail, setFormEmail] = useState<string>()
    const [hasBeenSent, setHasBeenSent] = useState<boolean>(false)

    const onSubmit = ({ email }: any) => new Promise<void>(async (resolve, throwError) => {
        startTransition(async () => {
            if (!email) return
            actions.request(email)
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
                    Reset your password
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
                                    <p className="truncate text-sm font-medium text-gray-900">{formEmail}</p>

                                    <p className="truncate text-sm mt-4 text-center font-medium text-gray-900">
                                        We have sent you an email to reset your password
                                    </p>
                                </div>
                            )
                            : <Form
                                onSubmit={onSubmit}
                                validator={validate.objects.email}
                                submit={{ label: "Continue", position: 'full' }}
                                fields={[
                                    { id: 'email', type: 'email', label: 'Email address' }
                                ]}
                            />
                    }
                </div>

                <div className="absolute -bottom-10 left-5 text-center text-sm text-gray-500">
                    <Link href="/login">
                        ← Sign in to your account
                    </Link>
                </div>
            </div>
        </div>
    )
}
