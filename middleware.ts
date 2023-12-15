
// -- Internationalization --

import createMiddleware from 'next-intl/middleware'
import { locales, localePrefix, defaultLocale } from './src/helpers/navigation'

export default createMiddleware({ defaultLocale, localePrefix, locales })

export const config = {
    matcher: [
        '/((?!api|_next|_vercel|.*\\..*).*)',
        '/([\\w-]+)?/users/(.+)'
    ]
}
