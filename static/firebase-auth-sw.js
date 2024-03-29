const ignorePaths = ["\u002F__webpack_hmr","\u002F_loading","\u002F_nuxt\u002F"]

importScripts(
  'https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js'
)
firebase.initializeApp({"apiKey":"AIzaSyAfHSGMAJt6cJyfjMlvwnr3N3Flb68x-OQ","authDomain":"plenitud-web-v2.firebaseapp.com","databaseURL":"https:\u002F\u002Fplenitud-web-v2.firebaseio.com","projectId":"plenitud-web-v2","storageBucket":"plenitud-web-v2.appspot.com","messagingSenderId":"731380204822","appId":"1:731380204822:web:f4c6736f62be84dddbfc37","measurementId":"G-CX4QVYRLXE","fcmPublicVapidKey":"AAAAQ4c9_EQ:APA91bGXvBfnoK5tlp2RCYOwmZv4Tp2m4SIOxu6EI2hvAh4V0Z6V3m1ToNwsVq2mo0dXhPj2apkrwfGMzFbfKFS31WKNa_sGoQs3MvTzxdrS-wdHe0HEnn9DiH71S6XpUmchBLZpTmzR"})

// Initialize authService
const authService = firebase.auth()

authService.useEmulator('http://localhost:9099')

/**
 * Returns a promise that resolves with an ID token if available.
 * @return {!Promise<?string>} The promise that resolves with an ID token if
 *     available. Otherwise, the promise resolves with null.
 */
const getIdToken = () => {
  return new Promise((resolve) => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      unsubscribe()
      if (user) {
        // force token refresh as it might be used to sign in server side
        user.getIdToken(true).then((idToken) => {
          resolve(idToken)
        }, () => {
          resolve(null)
        })
      } else {
        resolve(null)
      }
    })
  })
}

const fetchWithAuthorization = async (original, idToken) => {
  // Clone headers as request headers are immutable.
  const headers = new Headers()
  for (let entry of original.headers.entries()) {
    headers.append(entry[0], entry[1])
  }

  // Add ID token to header.
  headers.append('Authorization', 'Bearer ' + idToken)

  // Create authorized request
  const { url, ...props } = original.clone()
  const authorized = new Request(url, {
    ...props,
    mode: 'same-origin',
    redirect: 'manual',
    headers
  })

  return fetch(authorized)
}

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  const expectsHTML = event.request.headers.get('accept').includes('text/html')

  const isSameOrigin = self.location.origin === url.origin
  const isHttps = (self.location.protocol === 'https:' || self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1')

  const isIgnored = ignorePaths.some(path => {
    if (typeof path === 'string') {
      return url.pathname.startsWith(path)
    }

    return path.test(url.pathname.slice(1))
  })

  // https://github.com/nuxt-community/firebase-module/issues/465
  if (!expectsHTML || !isSameOrigin || !isHttps || isIgnored) {
    if (event.request.url.startsWith('https://www.googleapis.com/identitytoolkit/')) {
      event.respondWith(
        fetch({
          ...event.request,
          ...{ url: event.request.url.replace(/https:\/\//, 'http://localhost:9099/') }
        })
      )
    } else event.respondWith(fetch(event.request))

    return
  }

  // Fetch the resource after checking for the ID token.
  // This can also be integrated with existing logic to serve cached files
  // in offline mode.
  event.respondWith(
    getIdToken().then(
      idToken => idToken
        // if the token was retrieved we attempt an authorized fetch
        // if anything goes wrong we fall back to the original request
        ? fetchWithAuthorization(event.request, idToken).catch(() => fetch(event.request))
        // otherwise we return a fetch of the original request directly
        : fetch(event.request)
    )
  )
})

// In service worker script.
self.addEventListener('activate', event => {
  event.waitUntil(clients.claim())
})
