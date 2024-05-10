import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDu5FzDrTbByvAlqJsRo906UUdez8ZqSXE",
  authDomain: "satisfaccion-cliente.firebaseapp.com",
  projectId: "satisfaccion-cliente",
  storageBucket: "satisfaccion-cliente.appspot.com",
  messagingSenderId: "260245538441",
  appId: "1:260245538441:web:95ea67a1680f33f8a4a858"
};  

export const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp);

