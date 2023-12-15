import { useTranslations } from 'next-intl'

import { Link } from '@/helpers/navigation'

export default function Header() {
    const t = useTranslations()

    return (
        <div className="flex flex-col gap-y-3 text-center">
            <div className='flex justify-center'>
                <Link href="/">
                    <p className="text-2xl px-4 font-semibold hover:cursor-pointer">
                        {t('branding.title')}
                    </p>
                </Link>
            </div>
            <p className="text-sm">
                {t('branding.description')}
            </p>
        </div>
    )
}
