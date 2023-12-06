
import { Link } from "@/helpers/navigation"

import Explore from "@/components/Explore"
import Search from "@/components/Search"

export default function Page() {

    return (
        <div className="container mx-auto flex flex-col min-h-screen h-full">

            <div className="grow mt-16">
                <div className="flex flex-col gap-y-3 text-center">
                    <p className="text-2xl font-semibold">
                        Wiki
                    </p>
                    <p className="text-sm">
                        Maintained by Thijmen Heuvelink
                    </p>
                </div>

                <Search />

                <Link href="https://github.com/ThijmenGThN/Wiki">
                    <p className="mt-3 underline text-xs text-right px-2 mx-8 sm:mx-16 md:mx-32">
                        Star this project on Github
                    </p>
                </Link>

                <Explore />
            </div>

            <p className="my-16 mx-auto text-xs text-center w-3/4 sm:w-1/2">
                This knowledge base, serves as a valuable tool to simplify installations, troubleshoot common problems, and enhance the overall developer experience. All rights reserved.
            </p>

        </div>
    )
}

const Effect = () => (
    <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
    >
        <defs>
            <pattern
                id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
            >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                strokeWidth={0}
            />
        </svg>
        <rect width="100%" height="100%" strokeWidth={0} fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" />
    </svg>
)
