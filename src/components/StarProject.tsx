import Link from "next/link"

export default function StarProject() {
    return (
        <div className="text-right mt-3 px-2 mx-8 sm:mx-16 md:mx-32 underline text-xs">
            <Link href="https://github.com/ThijmenGThN/Wiki" target="_blank">
                Star this project on GitHub
            </Link>
        </div>
    )
}