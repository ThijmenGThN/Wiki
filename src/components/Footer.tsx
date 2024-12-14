import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function Footer() {

    const payload = await getPayload({ config })

    const settings = await payload.findGlobal({ slug: 'settings' })

    return (
        <p className="my-16 mx-auto text-xs text-center w-3/4 sm:w-1/2">
            {settings.disclaimer}
        </p>
    )
}
