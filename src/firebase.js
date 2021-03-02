import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3zzB2s787bx2CWEIr4raaDDKpR_0gYZg",
  authDomain: "whats-app-clone-42d87.firebaseapp.com",
  databaseURL: "https://whats-app-clone-42d87-default-rtdb.firebaseio.com",
  projectId: "whats-app-clone-42d87",
  storageBucket: "whats-app-clone-42d87.appspot.com",
  messagingSenderId: "972927650183",
  appId: "1:972927650183:web:b2c62a6bf473e177ceab22",
  measurementId: "G-5VMMDBCK00"
};
  // storing the firebase configuration in variable "firebaseApp"
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  
  // storing the firestore instances of our firebaseApp
  const db = firebaseApp.firestore();
  
  // Authentication handler.. will be responsible for the authentication part.
  const auth = firebase.auth();
  
  // Google authentication provider
  const provider = new firebase.auth.GoogleAuthProvider();

  // export
  export { auth, provider };  
  export default db;