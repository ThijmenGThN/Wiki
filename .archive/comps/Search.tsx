
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"

export default function Search() {
    return (
        <div className="flex flex-col gap-y-4 mt-8 mx-8 sm:mx-16 md:mx-32">
            <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <input className="block w-full rounded-md border-0 py-3 pl-11 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    type="text"
                    placeholder="Search"
                />
            </div>
        </div>
    )
}
