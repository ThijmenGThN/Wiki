
import Pocketbase from 'pocketbase'

const pb = new Pocketbase(process.env.NEXT_PUBLIC_POCKETBASE_URL)

if (typeof document !== 'undefined') {
    pb.authStore.loadFromCookie(document.cookie)

    pb.authStore.onChange(() => {
        document.cookie = pb.authStore.exportToCookie({ httpOnly: false })
    })
}

export default pb
