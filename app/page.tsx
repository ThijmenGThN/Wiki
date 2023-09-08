import Link from "next/link"

import Prisma from "@/prisma/client"

export default async function Page() {

    const categories = await Prisma.category.findMany()

    return (
        <ul>
            {
                categories.map((category, index) =>
                    <li key={index}>
                        <Link href={category.name}>
                            {category.name}
                        </Link>
                    </li>
                )
            }
        </ul>
    )
}
