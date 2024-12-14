import Link from "next/link"
import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'

import Search from "@/components/Search"
import Header from "@/components/Header"
import Toolbar from "@/components/Toolbar"

import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid"

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: { category: string, page: string } }) {

    const { page: pageSlug, category: categorySlug } = (await params)

    const payload = await getPayload({ config })

    const page = await payload.find({ collection: "pages", limit: 1, where: { slug: { equals: pageSlug } } })

    return (
        <>
            <Header breadcrumb={page.docs[0].title} />

            <Search />

            <Toolbar />

            <div className="flex flex-col gap-y-6 mt-16 mx-8 sm:mx-16">
                <div className="flex flex-col gap-y-4 mx-8">
                    <p className="text-sm">
                        {page.docs[0].description}
                    </p>
                </div>

                <div className="rounded border shadow-sm p-8 bg-gradient-to-tr from-gray-50 to-white">
                    <RichText data={page.docs[0].content} />
                </div>

                <div className="mx-auto mt-16">
                    <Link href={'/' + categorySlug}>
                        <button className="bg-black rounded-full p-3 text-white items-center hover:scale-105 transition-transform duration-200">
                            <ArrowUturnLeftIcon className="text-white h-5 w-5" />
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}
