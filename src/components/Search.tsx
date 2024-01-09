"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import pb from "@/helpers/pocketbase"

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { classNames } from "@/helpers/tailwind"

export default function Search() {
    const [results, setResults] = useState<Array<any>>([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        if (searchTerm.length < 3) setResults([])
        else {
            var delay = setTimeout(async () => {
                let records = await pb.collection('posts').getFullList({
                    filter: `name?~"${searchTerm}"`,
                    expand: 'category',
                    batch: 4
                })

                if (records.length == 0) records = await pb.collection('posts').getFullList({
                    filter: `description?~"${searchTerm}"`,
                    expand: 'category',
                    batch: 4
                })

                console.log(records)

                setResults(records)
            }, 750)
        }

        return () => clearTimeout(delay)
    }, [searchTerm])

    return (
        <>
            <div className="flex flex-col gap-y-4 mt-8 mx-8 sm:mx-16 md:mx-32">
                <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                    </div>
                    <input className="block w-full rounded-md border-0 py-3 pl-11 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search"
                        type="text"
                    />

                    <div className={
                        classNames(
                            "flex flex-col gap-y-4 absolute w-full bg-white p-8 pt-4 mt-2 ring-1 shadow-sm ring-inset ring-gray-300 rounded-md",
                            results.length == 0 && 'hidden'
                        )
                    }>
                        <p className="font-semibold">
                            Results
                        </p>
                        <ul className="grid gap-4 md:grid-cols-2">
                            {
                                results.map((result) => (
                                    <li key={result.id}>
                                        <Link className="flex flex-col gap-y-2 rounded bg-gradient-to-tr from-gray-50 to-white border p-4 shadow-sm hover:cursor-pointer hover:to-gray-100"
                                            href={result.expand.category.slug + '/' + result.slug}
                                        >
                                            <p>
                                                {result.name}
                                            </p>
                                            <p className="text-xs text-neutral">
                                                {result.description}
                                            </p>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>

            <div className="text-right mt-3 px-2 mx-8 sm:mx-16 md:mx-32 underline text-xs">
                <Link href="https://github.com/ThijmenGThN/Wiki" target="_blank">
                    Star this project on GitHub
                </Link>
            </div>
        </>
    )
}
