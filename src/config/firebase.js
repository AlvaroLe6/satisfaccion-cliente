import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBYFJgfipTHw-MUbp4B4CLvRbf1C0c6CFQ",
  authDomain: "seguimiento-c8de4.firebaseapp.com",
  projectId: "seguimiento-c8de4",
  storageBucket: "seguimiento-c8de4.appspot.com",
  messagingSenderId: "641100302195",
  appId: "1:641100302195:web:3fe50d233077800914e706"
};
  

export const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp);