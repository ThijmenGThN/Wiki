import crypto from 'crypto'

import pb from '@/helpers/pocketbase'

function hash(email: string) {
    const hash = crypto.createHash('sha256')
    hash.update(email)
    return hash.digest('hex')
}

type iTypes = 'identicon' | 'monsterid' | 'wavatar' | 'retro' | 'robohash'

export default function gravatar(email?: string, type?: iTypes) {

    if (!email && typeof window !== undefined) {
        const authEmail = pb.authStore.model?.email
        if (authEmail) email = authEmail
    }

    const id = hash((email ?? 'next@leaflet.app').trim().toLowerCase())
    return `https://www.gravatar.com/avatar/${id}?s=200&r=g&d=${type ?? 'identicon'}`
}
