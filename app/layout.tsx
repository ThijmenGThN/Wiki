import { Inter } from 'next/font/google'

import '@/styles/globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'next-leaflet',
    description: 'An optimized tech stack for efficiency.'
}

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <html lang="en" className="h-full">
            <body className={inter.className + ' h-full'}>
                {children}
            </body>
        </html>
    )
}
