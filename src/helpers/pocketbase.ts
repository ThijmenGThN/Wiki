
import Pocketbase from 'pocketbase'

var pb: Pocketbase

// -- Internal
if (typeof window === 'undefined') pb = new Pocketbase('http://127.0.0.1:' + process.env.POCKETBASE_PORT)

// -- Remote
else {
    pb = new Pocketbase(process.env.NEXT_PUBLIC_POCKETBASE_URL)

    pb.authStore.loadFromCookie(document.cookie)

    pb.authStore.onChange(() => {
        document.cookie = pb.authStore.exportToCookie({ httpOnly: false })
    })
}

export default pb
