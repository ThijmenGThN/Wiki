
const withNextIntl = require('next-intl/plugin')('./src/locales/i18n.ts')

module.exports = withNextIntl({
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.gravatar.com'
            }
        ]
    }
})
