import Link from "next/link"

import pb from "@/helpers/pocketbase"

import Search from "@/components/Search"
import Header from "@/components/Header"

import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid"

export default async function Page({ params }: { params: { category: string } }) {

    const category = await pb.collection('categories').getFirstListItem(`name~"${params.category}"`)
    const posts = await pb.collection('posts').getFullList({ filter: `category="${category.id}"` })

    return (
        <>
            <Header breadcrumb={category.name} />

            <Search />

            <div className="flex flex-col gap-y-4 mt-16 mx-8 sm:mx-16">
                <b>
                    Explore
                </b>
                <ul className="grid gap-4 md:grid-cols-2">
                    {
                        posts.map(post => (
                            <li key={post.id}>
                                <Link className="flex flex-col gap-y-2 rounded bg-gradient-to-tr from-gray-50 to-white border p-4 shadow-sm hover:cursor-pointer hover:to-gray-100"
                                    href={category.slug + '/' + post.slug}
                                >
                                    <p>
                                        {post.name}
                                    </p>
                                    <p className="text-xs text-neutral">
                                        {post.description}
                                    </p>
                                </Link>
                            </li>
                        ))
                    }
                </ul>

                <div className="mx-auto mt-16">
                    <Link href='/'>
                        <button className="bg-black rounded-full p-3 text-white items-center">
                            <ArrowUturnLeftIcon className="text-white h-5 w-5" />
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}
