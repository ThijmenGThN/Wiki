import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function Header({ breadcrumb }: { breadcrumb?: string }) {

    const payload = await getPayload({ config })

    const settings = await payload.findGlobal({ slug: 'settings' })

    return (
        <div className="flex flex-col gap-y-3 text-center">
            <div className='flex justify-center'>
                <Link href="/" className='flex gap-x-4 items-center'>
                    <p className="text-2xl font-semibold hover:cursor-pointer">
                        {settings.sitename}
                    </p>

                    {breadcrumb && (
                        <div className='flex gap-x-3.5 text-xl items-center'>
                            <p className='text-2xl'>
                                /
                            </p>
                            <p className='text-xl'>
                                {breadcrumb}
                            </p>
                        </div>
                    )}
                </Link>
            </div>

            <p className="text-sm">
                {settings.about}
            </p>
        </div>
    )
}
