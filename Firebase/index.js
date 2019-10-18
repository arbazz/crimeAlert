// In /utils/firebase.js
// We should import firebase from this module instead of the default package.
import * as firebase from 'firebase'  // Should not be used elsewhere in the project

var firebaseConfig = {
    apiKey: "AIzaSyCaogS_puBISFfxMMA9OlziGZlVZDN4SGo",
    authDomain: "crimeapp-1de4a.firebaseapp.com",
    databaseURL: "https://crimeapp-1de4a.firebaseio.com",
    projectId: "crimeapp-1de4a",
    storageBucket: "crimeapp-1de4a.appspot.com",
    messagingSenderId: "177868605711",
    appId: "1:177868605711:web:899f79eb6e8dd6db67967a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


export default firebase;