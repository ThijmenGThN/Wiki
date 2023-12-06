
import { Link } from '@/helpers/navigation'

export default function Header() {
    return (
        <div className="flex flex-col gap-y-3 text-center">
            <div className='flex justify-center'>
                <Link href="/">
                    <p className="text-2xl px-4 font-semibold hover:cursor-pointer">
                        Wiki
                    </p>
                </Link>
            </div>
            <p className="text-sm">
                Maintained by Thijmen Heuvelink
            </p>
        </div>
    )
}
