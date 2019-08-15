import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyClsBKWOOXfzeb48Rm80hX09X87J_TB4mM',
  authDomain: 'rnexpo0.firebaseapp.com',
  databaseURL: 'https://rnexpo0.firebaseio.com',
  projectId: 'rnexpo0',
  storageBucket: 'rnexpo0.appspot.com',
  messagingSenderId: '256218572662',
  appId: '1:256218572662:web:a31e231f7265020d'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default firebase
