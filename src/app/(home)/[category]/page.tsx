import Link from "next/link"
import { getPayload } from 'payload'
import config from '@payload-config'

import Search from "@/components/Search"
import Header from "@/components/Header"

import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid"

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: { category: string } }) {

    const payload = await getPayload({ config })

    const categorySlug = (await params).category

    const category = await payload.find({ collection: "categories", limit: 1, where: { slug: { equals: categorySlug } } })
    const pages = await payload.find({ collection: "pages", pagination: false })

    return (
        <>
            <Header breadcrumb={category.docs[0].title} />

            <Search />

            <div className="flex flex-col gap-y-4 mt-16 mx-8 sm:mx-16">
                <b>
                    Explore
                </b>
                <ul className="grid gap-4 md:grid-cols-2">
                    {
                        pages.docs.map((page: any) => (
                            <li key={page.id}>
                                <Link className="flex flex-col gap-y-2 rounded bg-gradient-to-tr from-gray-50 to-white border p-4 shadow-sm hover:cursor-pointer hover:to-gray-100"
                                    href={category.docs[0].slug + '/' + page.slug}
                                >
                                    <p>
                                        {page.title}
                                    </p>
                                    <p className="text-xs text-neutral">
                                        {page.description}
                                    </p>
                                </Link>
                            </li>
                        ))
                    }
                </ul>

                <div className="mx-auto mt-16">
                    <Link href='/'>
                        <button className="bg-black rounded-full p-3 text-white items-center hover:scale-105 transition-transform duration-200">
                            <ArrowUturnLeftIcon className="text-white h-5 w-5" />
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}
