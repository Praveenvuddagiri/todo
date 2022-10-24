import firebase from 'firebase/compat/app'
import "firebase/compat/firestore"
    
  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDp4HLcBzNJKNGMVZSovqgDRMPJxG5y7OQ",
    authDomain: "todo-app-a72ae.firebaseapp.com",
    projectId: "todo-app-a72ae",
    storageBucket: "todo-app-a72ae.appspot.com",
    messagingSenderId: "397168205082",
    appId: "1:397168205082:web:1501b3a49e17b04219a0a3",
    measurementId: "G-2B1M6T49TR"
  })

  const db = firebaseApp.firestore();

  export default db;