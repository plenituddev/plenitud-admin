
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js'
)
firebase.initializeApp({"apiKey":"AIzaSyAfHSGMAJt6cJyfjMlvwnr3N3Flb68x-OQ","authDomain":"plenitud-web-v2.firebaseapp.com","databaseURL":"https:\u002F\u002Fplenitud-web-v2.firebaseio.com","projectId":"plenitud-web-v2","storageBucket":"plenitud-web-v2.appspot.com","messagingSenderId":"731380204822","appId":"1:731380204822:web:f4c6736f62be84dddbfc37","measurementId":"G-CX4QVYRLXE","fcmPublicVapidKey":"AAAAQ4c9_EQ:APA91bGXvBfnoK5tlp2RCYOwmZv4Tp2m4SIOxu6EI2hvAh4V0Z6V3m1ToNwsVq2mo0dXhPj2apkrwfGMzFbfKFS31WKNa_sGoQs3MvTzxdrS-wdHe0HEnn9DiH71S6XpUmchBLZpTmzR"})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

// Setup event listeners for actions provided in the config:
self.addEventListener('notificationclick', function(e) {
  const actions = [{"action":"goToUrl","url":"https:\u002F\u002Fgithub.com\u002Flupas"},{"action":"goToModuleGithub","url":"https:\u002F\u002Fgithub.com\u002Fnuxt-community\u002Ffirebase-module"}]
  const action = actions.find(x => x.action === e.action)
  const notification = e.notification

  if (!action) return

  if (action.url) {
    clients.openWindow(action.url)
    notification.close()
  }
})
