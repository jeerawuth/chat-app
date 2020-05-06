import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyBKvR04P4zo6SNYEijkNjDJ0L8z52zbPsI",
    authDomain: "testui-b85a1.firebaseapp.com",
    databaseURL: "https://testui-b85a1.firebaseio.com",
    projectId: "testui-b85a1",
    storageBucket: "testui-b85a1.appspot.com",
    messagingSenderId: "913233366249",
    appId: "1:913233366249:web:ebced4b022cfa95cb47478"
};
const firebaseApp = firebase.initializeApp(firebaseConfig)
const database = firebaseApp.firestore()
export const auth = firebase.auth()
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export default database
