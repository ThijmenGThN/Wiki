"use client"

import { Link } from '@/helpers/navigation'
import Image from 'next/image'
import { useState } from "react"
import { useTranslations } from "next-intl"

import pb from '@/helpers/pocketbase'
import gravatar from "@/helpers/gravatar"

import type { FormEvent } from "react"

import assetLogo from '@/assets/logo.webp'

export default function Page() {
    const t = useTranslations('auth')

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [hasConcluded, setHasConcluded] = useState<string>()

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget)
        const email = formData.get('email') as string

        if (!email) return

        await pb.collection('users').requestPasswordReset(email)

        setHasConcluded(email)
    }

    return (
        <>
            <div className="absolute left-0 -top-36 w-full">
                <Image
                    className="mx-auto h-10 w-auto"
                    src={assetLogo}
                    alt=""
                />
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    {t('reset-your-password')}
                </h2>
            </div>

            {
                hasConcluded
                    ? (
                        <div className="flex flex-col items-center justify-center gap-y-6">
                            <Image
                                className="h-16 w-16 rounded-full bg-gray-50 border"
                                src={gravatar(hasConcluded)}
                                width={80}
                                height={80}
                                alt=""
                            />
                            <p className="text-sm font-medium text-gray-900">
                                {hasConcluded}
                            </p>

                            <div className="flex w-full items-center gap-x-2 justify-center rounded-md bg-gray-200 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-500">
                                {t('we-have-sent-you-an-email-to-reset-your-password')}
                            </div>
                        </div>
                    )
                    : (
                        <form className="space-y-6" onSubmit={onSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    {t('email-address')}
                                </label >
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        autoFocus
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div >

                            <button className="flex w-full items-center gap-x-2 justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                type="submit"
                            >
                                {isLoading &&
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 animate-spin">
                                        <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
                                    </svg>
                                }

                                {t('reset')}
                            </button>
                        </form >
                    )
            }

            <div className="flex mt-5 items-center justify-between">
                <div className="text-sm leading-6">
                    <Link href="/login" className="font-semibold text-primary hover:text-primary-600">
                        {t('sign-in-to-your-account')}
                    </Link>
                </div>
                <div className="text-sm leading-6">
                    <Link href="/register" className="font-semibold text-primary hover:text-primary-600">
                        {t('create-an-account')}
                    </Link>
                </div>
            </div>
        </>
    )
}
