import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';

  const firebaseConfig = {
    apiKey: "AIzaSyAfeH05JqpuOPjcNulWrfSegqx_sVlPHzY",
    authDomain: "contabilidad-e77a2.firebaseapp.com",
    projectId: "contabilidad-e77a2",
    storageBucket: "contabilidad-e77a2.appspot.com",
    messagingSenderId: "172175111817",
    appId: "1:172175111817:web:37fe304cd55b68fabaf858"
  };  

export const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp);

