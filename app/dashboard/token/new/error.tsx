"use client"

export default function Error({ reset }: { reset: () => void }) {

    return (
        <div className="divide-y divide-gray-200 rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:px-6">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                    API Tokens
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                    Private authorization tokens to request data from our endpoint
                </p>
            </div>

            <div className="px-4 py-5 sm:px-6">
                <p className="flex items-center justify-center gap-x-6 py-3">
                    An API token with the same name has already been generated or you have reached the maximum limit for API tokens
                </p>

                <div className="mt-3 flex items-center justify-end gap-x-6">
                    <button className="flex gap-x-2 items-center justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        onClick={() => reset()}
                    >
                        Try again
                    </button>
                </div>
            </div>
        </div>
    )
}
