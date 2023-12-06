
import { Link } from "@/helpers/navigation"

import Explore from "@/components/Explore"
import Search from "@/components/Search"
import Header from "@/components/Header"

export default function Page() {

    return (
        <div className="container mx-auto flex flex-col min-h-screen h-full">

            <div className="grow mt-16">
                <Header />

                <Search />

                <div className="text-right mt-3 px-2 mx-8 sm:mx-16 md:mx-32 underline text-xs">
                    <Link href="https://github.com/ThijmenGThN/Wiki" target="_blank">
                        Star this project on Github
                    </Link>
                </div>

                <Explore />
            </div>

            <p className="my-16 mx-auto text-xs text-center w-3/4 sm:w-1/2">
                This knowledge base, serves as a valuable tool to simplify installations, troubleshoot common problems, and enhance the overall developer experience. All rights reserved.
            </p>

        </div>
    )
}
