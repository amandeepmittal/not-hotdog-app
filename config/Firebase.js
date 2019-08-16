import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'XXXX',
  authDomain: 'XXXX',
  databaseURL: 'XXXX',
  projectId: 'XXXX',
  storageBucket: 'XXXX',
  messagingSenderId: 'XXXX',
  appId: 'XXXX'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default firebase
