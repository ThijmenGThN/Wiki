const nextTranslate = require('next-translate-plugin')

module.exports = nextTranslate({
    images: {
        domains: ['www.gravatar.com']
    },
    experimental: {
        serverActions: true
    }
})
