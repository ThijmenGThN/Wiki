
const withNextIntl = require('next-intl/plugin')('./src/helpers/localizer.ts')

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
