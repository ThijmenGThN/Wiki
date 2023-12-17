import Link from 'next/link'

export default function Header({ breadcrumb }: { breadcrumb?: string }) {

    return (
        <div className="flex flex-col gap-y-3 text-center">
            <div className='flex justify-center'>
                <Link href="/" className='flex gap-x-4 items-center'>
                    <p className="text-2xl font-semibold hover:cursor-pointer">
                        Wiki
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
                Maintained by Thijmen Heuvelink
            </p>
        </div>
    )
}
