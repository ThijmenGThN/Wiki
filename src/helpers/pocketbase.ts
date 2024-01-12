
import Pocketbase from 'pocketbase'

var pb: Pocketbase

// -- Server
if (typeof window === 'undefined') pb = new Pocketbase('http://pocketbase:8090')

// -- Client
else {
    pb = new Pocketbase(window.location.protocol + '//' + window.location.host + '/pb')

    // Cookie handler, loads and updates the pb_auth cookie.
    pb.authStore.loadFromCookie(document.cookie)
    pb.authStore.onChange(() => document.cookie = pb.authStore.exportToCookie({ httpOnly: false }))

    // Prevents exceptions, nextjs in dev-mode executes useEffects twice whilst react-strict mode is on.
    if (process && process.env.NODE_ENV === 'development') pb.autoCancellation(false)
}

export default pb
