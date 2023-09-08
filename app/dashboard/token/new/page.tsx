"use client"

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useState, useTransition } from "react"
import { zodResolver } from '@hookform/resolvers/zod'

import * as actions from "@/server/dashboard/apiTokens"

import { DocumentDuplicateIcon } from "@heroicons/react/24/outline"

import validate from '@/helpers/validation'
import Form from '@/components/Form'

export default function Page() {
    const [isPending, startTransition] = useTransition()

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(validate.objects.name) })

    const [token, setToken] = useState<string>()

    const onSubmit = ({ name }: any) => new Promise<void>(async (resolve, throwError) => {
        startTransition(async () => setToken(await actions.create({ name })))
    })

    return (
        <div className="divide-y divide-gray-200 rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:px-6">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                    API Tokens
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                    Private authorization tokens to request data from our endpoint
                </p>
            </div>

            <div className="px-4 py-5 sm:px-6">
                {
                    token
                        ? (
                            <>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Your new token
                                </label>
                                <div className="mt-2 flex rounded-md shadow-sm">
                                    <p className="block w-full rounded-none truncate rounded-l-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 bg-gray-50 sm:text-sm sm:leading-6">
                                        {token}
                                    </p>
                                    <button className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 group hover:bg-gray-50 focus:ring-2 focus:ring-inset focus:ring-primary focus:text-primary"
                                        onClick={() => navigator.clipboard.writeText(token)}
                                    >
                                        <DocumentDuplicateIcon className="-ml-0.5 h-5 w-5 text-gray-400 group-focus:text-primary" />
                                        Copy
                                    </button>
                                </div>

                                <p className="mt-3 text-xs leading-6 text-gray-600">
                                    Please ensure to save this token in a secure location as once you close this window, it will no longer be visible to you
                                </p>

                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <Link className="flex gap-x-2 items-center justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                        href="/dashboard/token"
                                        prefetch={false}
                                    >
                                        Return to overview
                                    </Link>
                                </div>
                            </>
                        )
                        : <Form
                            onSubmit={onSubmit}
                            submit={{ label: 'Generate token', position: 'right' }}
                            cancel={{ label: 'Cancel', redirect: '/dashboard/token' }}
                            description='Once a new token has been generated, you will be able to view it in the overview. If needed, you can easily revoke the token at any time'
                            validator={validate.objects.name}
                            fields={[
                                { id: 'name', type: 'text', label: 'Token name' }
                            ]}
                        />

                }
            </div>
        </div >
    )
}
