import Link from "next/link"
import { getPayload } from 'payload'
import config from '@payload-config'

import Search from "@/components/Search"
import Header from "@/components/Header"
import Toolbar from "@/components/Toolbar"

export const dynamic = 'force-dynamic'

export default async function Page() {

    const payload = await getPayload({ config })

    const categories = await payload.find({ collection: "categories", pagination: false })

    return (
        <>
            <Header />

            <Search />

            <Toolbar />

            <div className="flex flex-col gap-y-4 mt-16 mx-8 sm:mx-16">
                <b>
                    Explore
                </b>
                <ul className="grid gap-4 md:grid-cols-2">
                    {
                        categories.docs.map(category => (
                            <li key={category?.id}>
                                <Link className="flex flex-col gap-y-2 rounded bg-gradient-to-tr from-gray-50 to-white border p-4 shadow-sm hover:cursor-pointer hover:to-gray-100"
                                    href={category?.slug ?? '/'}
                                >
                                    <p>
                                        {category?.title}
                                    </p>
                                    <p className="text-xs text-neutral">
                                        {category?.subtitle}
                                    </p>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}
