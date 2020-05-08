import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDUhw2A_KacR6W1yvuZF_myjjTG7e72BQc",
  authDomain: "chat-appz.firebaseapp.com",
  databaseURL: "https://chat-appz.firebaseio.com",
  projectId: "chat-appz",
  storageBucket: "chat-appz.appspot.com",
  messagingSenderId: "1092497118381",
  appId: "1:1092497118381:web:c497caa4b274d4bd2b6224",
  measurementId: "G-E58ZEYZ8LK",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebaseApp.firestore();
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export default database;
