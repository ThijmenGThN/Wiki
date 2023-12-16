import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import pb from "@/helpers/pocketbase"
import { Link } from "@/helpers/navigation"

import Search from "@/components/Search"
import Header from "@/components/Header"

import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid"

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: { post: string } }) {
    const post = await pb.collection('posts').getFirstListItem(`slug~"${params.post}"`)
    const category = await pb.collection('categories').getOne(post.category)

    return (
        <>
            <Header breadcrumb={post.name} />

            <Search />

            <div className="flex flex-col gap-y-6 mt-16 mx-8 sm:mx-16">
                <div className="flex flex-col gap-y-4 mx-8">
                    <p className="text-sm">
                        {post.description}
                    </p>
                </div>

                <div className="rounded border shadow-sm p-8 bg-gradient-to-tr from-gray-50 to-white">
                    <Markdown remarkPlugins={[remarkGfm]} className='prose min-w-full'>
                        {post.content}
                    </Markdown>
                </div>

                <div className="mx-auto mt-16">
                    <Link href={'/' + category.slug}>
                        <button className="bg-black rounded-full p-3 text-white items-center hover:scale-105 transition-transform duration-200">
                            <ArrowUturnLeftIcon className="text-white h-5 w-5" />
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}
