import Prisma from '@/prisma/client'
import { notFound } from 'next/navigation'

export default async function Item({ params }: any) {

    const item = await Prisma.item.findFirst({ where: { name: params.item } }) || notFound()

    return (
        <>
            <p>{item.name}</p>
            <p>{item.categoryName}</p>
            <p>{item.content}</p>
        </>
    )
}
