
import Pocketbase from 'pocketbase'

var pb: Pocketbase

// -- Server
if (typeof window === 'undefined') {
    if (process.env.COMPOSE_PROFILES?.toLocaleLowerCase() != 'prod') pb = new Pocketbase('http://0.0.0.0:8090')
    else pb = new Pocketbase('http://pocketbase:' + process.env.POCKETBASE_PORT)
}

// -- Client
else {
    pb = new Pocketbase(process.env.NEXT_PUBLIC_POCKETBASE_URL)

    pb.authStore.loadFromCookie(document.cookie)

    pb.authStore.onChange(() => {
        document.cookie = pb.authStore.exportToCookie({ httpOnly: false })
    })
}

export default pb
