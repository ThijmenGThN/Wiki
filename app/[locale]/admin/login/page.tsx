"use client"

import { useTranslations } from 'next-intl'

import { Link } from '@/helpers/navigation'

import Credentials from './Credentials'

export default function Page() {
    const t = useTranslations()

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-y-3 text-center">
                <div className='flex justify-center'>
                    <Link href="/">
                        <p className="text-2xl px-4 font-semibold hover:cursor-pointer">
                            {t('branding.title')}
                        </p>
                    </Link>
                </div>
                <p className="text-sm">
                    {t('branding.description')}
                </p>
            </div>

            <div className="relative my-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <Credentials />
                </div>

                <div className="absolute -bottom-10 left-5 text-center text-sm text-gray-500">
                    <Link href="/">
                        ← {t('auth.return-to-wiki')}
                    </Link>
                </div>
            </div>
        </div>
    )
}
