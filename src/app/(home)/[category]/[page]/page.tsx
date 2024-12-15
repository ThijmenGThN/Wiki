import Link from "next/link"
import remarkGfm from 'remark-gfm'
import { getPayload } from 'payload'
import config from '@payload-config'
import Markdown from 'react-markdown'

import Search from "@/components/Search"
import Header from "@/components/Header"
import Toolbar from "@/components/Toolbar"

import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid"

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: Promise<{ page: string }> }) {

    const { page: pageSlug } = await params

    const payload = await getPayload({ config })

    const page = await payload.find({ collection: "pages", limit: 1, where: { slug: { equals: pageSlug } } })
    const category = page.docs[0]?.category as { slug: string }

    return (
        <>
            <Header breadcrumb={page?.docs[0]?.title} />

            <Search />

            <Toolbar />

            <div className="flex flex-col gap-y-6 mt-16 mx-8 sm:mx-16">
                <div className="flex flex-col gap-y-4 mx-8">
                    <p className="text-sm">
                        {page?.docs[0]?.subtitle}
                    </p>
                </div>

                <div className="rounded border shadow-sm p-8 bg-gradient-to-tr from-gray-50 to-white">
                    <Markdown remarkPlugins={[remarkGfm]} className='prose min-w-full'>
                        {page?.docs[0]?.markdown}
                    </Markdown>
                </div>

                <div className="mx-auto mt-16">
                    <Link href={'/' + (category.slug ?? "")}>
                        <button className="bg-black rounded-full p-3 text-white items-center hover:scale-105 transition-transform duration-200">
                            <ArrowUturnLeftIcon className="text-white h-5 w-5" />
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}
