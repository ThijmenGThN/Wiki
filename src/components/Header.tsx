
export default function Header() {
    return (
        <div className="bg-white border-b">
            <div className="container mx-auto">

                <div className="flex items-center gap-x-4 p-4 text-xl">
                    <p className="font-bold text-2xl">
                        Wiki
                    </p>
                    {' / '}
                    <p>
                        Thijmen Heuvelink
                    </p>
                </div>

                <div>
                    <Link href="https://github.com/ThijmenGThN">

                    </Link>
                </div>

            </div>
        </div>
    )
}
