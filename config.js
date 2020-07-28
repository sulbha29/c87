import firebase from 'firebase'
require('@firebase/firestore')

var  firebaseConfig = {
  apiKey: "AIzaSyCw6jZL-4L3BDo1rAODi6LW4AdfH_86Scw",
  authDomain: "harshabooksanta.firebaseapp.com",
  databaseURL: "https://harshabooksanta.firebaseio.com",
  projectId: "harshabooksanta",
  storageBucket: "harshabooksanta.appspot.com",
  messagingSenderId: "390945035807",
  appId: "1:390945035807:web:91d7a81d14f81f553d272a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
;

  export default firebase.firestore();