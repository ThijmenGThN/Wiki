"use client"

import { FormEvent, useState } from "react"
import { useTranslations } from "next-intl"

import pb from "@/helpers/pocketbase"
import { useRouter } from "@/helpers/navigation"

export default function Page() {
    const t = useTranslations('dash')
    const router = useRouter()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget)
        const name = formData.get('name') as string,
            email = formData.get('email') as string

        await pb.collection('users').update(pb.authStore.model?.id, {
            "name": name,
            "email": email
        })

        setTimeout(() => setIsLoading(false), 500)
    }

    return (
        <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
                <form onSubmit={onSubmit}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                {t('account-settings')}
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                {t('information-related-to-your-personal-profile')}
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                        {t('name')}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            defaultValue={pb.authStore.model?.name}
                                            autoComplete="name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        {t('email-address')}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            defaultValue={pb.authStore.model?.email}
                                            autoComplete="email"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <div className="text-sm font-semibold leading-6 text-gray-900 hover:cursor-pointer"
                            onClick={router.back}
                        >
                            {t('cancel')}
                        </div>
                        <button
                            type="submit"
                            className="flex items-center gap-x-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                            {isLoading &&
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 animate-spin">
                                    <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
                                </svg>
                            }
                            {t('save')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
