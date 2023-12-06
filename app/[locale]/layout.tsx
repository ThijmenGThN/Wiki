import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider as Localizer } from 'next-intl'

import Session from './Session'

import { locales } from '@/helpers/navigation'

import '@/styles/globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'next-leaflet',
    description: 'An optimized tech stack for efficiency.'
}

const inter = Inter({ subsets: ['latin'] })

export default async function Layout({ children, params: { locale } }: { children: React.ReactNode, params: { locale: string } }) {

    locales.some(cur => cur === locale) ?? notFound()

    let messages
    try { messages = (await import(`../../src/locales/${locale}.json`)).default }
    catch (error) { notFound() }

    return (
        <html lang={locale} className="h-full">
            <body className={inter.className + ' h-full'}>
                <Localizer locale={locale} messages={messages}>
                    <Session>
                        {children}
                    </Session>
                </Localizer>
            </body>
        </html>
    )
}
