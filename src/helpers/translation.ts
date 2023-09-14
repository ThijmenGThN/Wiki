import { useRouter } from 'next/navigation'
import { usePathname, useSearchParams } from 'next/navigation'

export function useSetLanguage() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    return (locale: string) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()))

        current.set('lang', locale)

        const search = current.toString()
        const query = search ? `?${search}` : ''

        router.push(`${pathname}${query}`)
    }
}
