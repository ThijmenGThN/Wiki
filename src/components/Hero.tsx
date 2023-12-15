"use client"

import Image from 'next/image'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { useTranslations } from 'use-intl'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import { Link } from '@/helpers/navigation'
import { classNames } from '@/helpers/tailwind'

import LocaleSwitcher from '@/components/LocaleSwitcher'

import assetLogo from '@/assets/logo.webp'

const navigation = [
    { name: 'Repository', href: 'https://github.com/ThijmenGThN/next-leaflet' },
    { name: 'Next.js', href: 'https://nextjs.org' },
    { name: 'Pocketbase', href: 'https://pocketbase.io' },
    { name: 'Tailwind', href: 'https://tailwindcss.com' },
]

export default function Hero() {
    const t = useTranslations()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="bg-white">
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <div className="-m-1.5 p-1.5">
                            <Image
                                className="h-8 w-auto"
                                src={assetLogo}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className={classNames(
                        mobileMenuOpen ? 'hidden' : 'lg:hidden',
                        "flex"
                    )}>
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <Link key={item.name} target='_blank' href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <LocaleSwitcher />
                    </div>
                </nav>
                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className="fixed inset-0 z-50" />
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <div className="-m-1.5 p-1.5">
                                <Image
                                    className="h-8 w-auto"
                                    src={assetLogo}
                                    alt=""
                                />
                            </div>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            target='_blank'
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                                <div className="py-6 flex flex-col items-center">
                                    <LocaleSwitcher />
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>

            <div className="relative isolate px-6 pt-14 lg:px-8">
                <svg
                    className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern
                            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
                            width={200}
                            height={200}
                            x="50%"
                            y={-1}
                            patternUnits="userSpaceOnUse"
                        >
                            <path d="M.5 200V.5H200" fill="none" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" strokeWidth={0} fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)" />
                </svg>
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                            {t('an-optimized-tech-stack-for-efficiency')}{' '}
                            <Link href="https://github.com/ThijmenGThN/next-leaflet" target='_blank' className="font-semibold text-primary">
                                <span className="absolute inset-0" aria-hidden="true" />
                                {t('read-more')} <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </div>
                    </div>
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            next-leaflet
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            {t('a-comprehensive-and-efficient-appstack-that-combines-the-power-of-next-js-and-the-flexibility-of-pocketbase-for-streamlined-web-application-development')}
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                href="/login"
                                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                                {t('log-in')}
                            </Link>
                            <Link href={process.env.NEXT_PUBLIC_POCKETBASE_URL + '/_'} target='_blank' className="text-sm font-semibold leading-6 text-gray-900">
                                {t('open-pocketbase')} <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
