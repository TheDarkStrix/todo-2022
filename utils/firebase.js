import firebase from "@firebase/app";
import "@firebase/database";
var firebaseConfig = {
  apiKey: "AIzaSyAPs_Oo003_50F2Y71x7oMAGhGcVpbdGVE",
  authDomain: "todo-geexec.firebaseapp.com",
  databaseURL: "https://todo-geexec.firebaseio.com",
  projectId: "todo-geexec",
  storageBucket: "todo-geexec.appspot.com",
  messagingSenderId: "31640005147",
  appId: "1:31640005147:web:1ef5d41acc733e175f66be",
  measurementId: "G-JPPFPRV549",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
