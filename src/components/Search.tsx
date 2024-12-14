"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"

import { classNames } from "@/helpers/tailwind"

export default function Search() {
    const [results, setResults] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        if (searchTerm.length < 2) {
            setResults([])
        } else {
            const delay = setTimeout(async () => {
                const query = new URLSearchParams({
                    'where[or][0][title][like]': searchTerm,
                    'where[or][1][description][like]': searchTerm,
                    'limit': '4',
                })

                try {
                    const response = await fetch(`/api/pages?${query.toString()}`)
                    if (!response.ok) {
                        throw new Error('Network response was not ok')
                    }
                    const data = await response.json()
                    setResults(data.docs)
                } catch (error) {
                    console.error('Error fetching data:', error)
                }
            }, 750)

            return () => clearTimeout(delay)
        }
    }, [searchTerm])

    return (
        <>
            <div className="flex flex-col gap-y-4 mt-8 mx-8 sm:mx-16 md:mx-32">
                <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                        className="block w-full rounded-md border-0 py-3 pl-11 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search"
                        type="text"
                    />
                    <div className={classNames(
                        "flex flex-col gap-y-4 absolute w-full bg-white p-8 pt-4 mt-2 ring-1 shadow-sm ring-inset ring-gray-300 rounded-md",
                        results.length === 0 && 'hidden'
                    )}>
                        <p className="font-semibold">Results</p>
                        <ul className="grid gap-4 md:grid-cols-2">
                            {results.map((result: any) => (
                                <li key={result.id}>
                                    <Link
                                        className="flex flex-col gap-y-2 rounded bg-gradient-to-tr from-gray-50 to-white border p-4 shadow-sm hover:cursor-pointer hover:to-gray-100"
                                        href={`/${result.category.slug}/${result.slug}`}
                                    >
                                        <p>{result.title}</p>
                                        <p className="text-xs text-neutral">{result.description}</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
