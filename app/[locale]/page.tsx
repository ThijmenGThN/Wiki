import Link from "next/link"

import pb from "@/helpers/pocketbase"

import Search from "@/components/Search"
import Header from "@/components/Header"

export const dynamic = 'force-dynamic'

export default async function Page() {

    const categories = await pb.collection('categories').getFullList({
        sort: '-created',
    })

    return (
        <>
            <Header />

            <Search />

            <div className="flex flex-col gap-y-4 mt-16 mx-8 sm:mx-16">
                <b>
                    Explore
                </b>
                <ul className="grid gap-4 md:grid-cols-2">
                    {
                        categories.map(category => (
                            <li key={category.id}>
                                <Link className="flex flex-col gap-y-2 rounded bg-gradient-to-tr from-gray-50 to-white border p-4 shadow-sm hover:cursor-pointer hover:to-gray-100"
                                    href={category.slug ?? '/'}
                                >
                                    <p>
                                        {category.name}
                                    </p>
                                    <p className="text-xs text-neutral">
                                        {category.description}
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
