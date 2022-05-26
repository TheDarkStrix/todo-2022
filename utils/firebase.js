import firebase from "@firebase/app";
import "@firebase/database";
var firebaseConfig = {
  apiKey: "AIzaSyDaJwW8wKacabygXfhT9GzzTsT7WkPuCbg",
  authDomain: "todoapp-7c108.firebaseapp.com",
  databaseURL: "https://todoapp-7c108-default-rtdb.firebaseio.com",
  projectId: "todoapp-7c108",
  storageBucket: "todoapp-7c108.appspot.com",
  messagingSenderId: "1051607102383",
  appId: "1:1051607102383:web:b8fc0cd01738deee06355a",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
