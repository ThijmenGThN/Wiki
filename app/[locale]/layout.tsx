
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider as Localizer, useMessages } from 'next-intl'

import type { Metadata } from 'next'

import { locales } from '@/helpers/navigation'

import LocaleSwitcher from '@/components/LocaleSwitcher'
import Footer from '@/components/Footer'

import '@/styles/globals.css'

export const metadata: Metadata = {
    title: 'Wiki • Thijmen Heuvelink',
    description: 'A catalogue of saved knowledge served via a web-based app.',
}

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children, params: { locale } }: { children: React.ReactNode, params: { locale: string } }) {

    if (!locales.includes(locale as any)) notFound()

    return (
        <html lang={locale}>
            <body className={inter.className}>
                <Localizer locale={locale} messages={useMessages()}>
                    <svg
                        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                        aria-hidden="true"
                    >
                        <defs>
                            <pattern
                                id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                                width={200}
                                height={200}
                                x="50%"
                                y={-1}
                                patternUnits="userSpaceOnUse"
                            >
                                <path d="M100 200V.5M.5 .5H200" fill="none" />
                            </pattern>
                        </defs>
                        <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                            <path
                                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                                strokeWidth={0}
                            />
                        </svg>
                        <rect width="100%" height="100%" strokeWidth={0} fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" />
                    </svg>

                    <div className="container mx-auto flex flex-col min-h-screen h-full">

                        <div className="flex justify-end mt-8 px-2 mx-8 sm:mx-16">
                            <LocaleSwitcher />
                        </div>

                        <div className="grow mt-8">
                            {children}
                        </div>

                        <Footer />

                    </div>
                </Localizer>
            </body>
        </html>
    )
}
