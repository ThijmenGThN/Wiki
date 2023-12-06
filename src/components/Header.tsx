
import { Link } from '@/helpers/navigation'

export default function Header() {
    return (
        <div className="flex flex-col gap-y-3 text-center">
            <Link href="/">
                <p className="text-2xl font-semibold hover:cursor-pointer">
                    Wiki
                </p>
            </Link>
            <p className="text-sm">
                Maintained by Thijmen Heuvelink
            </p>
        </div>
    )
}
