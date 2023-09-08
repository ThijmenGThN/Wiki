import Link from "next/link"
import { notFound } from 'next/navigation'

import Prisma from '@/prisma/client'

export default async function Category({ params }: any) {

    const category = await Prisma.category.findUnique({ where: { name: params.category }, include: { items: true } }) || notFound()

    return (
        <ul>
            {
                category.items.map((item, index) =>
                    <li key={index}>
                        <Link href={params.category + "/" + item.name}>
                            {item.name}
                        </Link>
                    </li>
                )
            }
        </ul>
    )
}
