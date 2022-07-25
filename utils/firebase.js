import firebase from "@firebase/app";
import "@firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyApGXo4dA2OI_GrbjP-Y2k1Z0b9226qLnU",
  authDomain: "todo-app-73510.firebaseapp.com",
  databaseURL: "https://todo-app-73510-default-rtdb.firebaseio.com",
  projectId: "todo-app-73510",
  storageBucket: "todo-app-73510.appspot.com",
  messagingSenderId: "200285971152",
  appId: "1:200285971152:web:4c0a4f57fba882d8a674d5",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
