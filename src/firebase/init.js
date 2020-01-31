import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyD_2OOzaSGG4rk8XkldjONhRGsikUO3B8A",
    authDomain: "mesnica-563ad.firebaseapp.com",
    databaseURL: "https://mesnica-563ad.firebaseio.com",
    projectId: "mesnica-563ad",
    storageBucket: "mesnica-563ad.appspot.com",
    messagingSenderId: "521473936489",
    appId: "1:521473936489:web:b2f0668b6cd41534f966f8"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig)

  export default firebaseApp.firestore()