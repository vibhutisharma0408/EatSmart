import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCe5ZMdqZJWTE6_pWP-Bu1BLNMMQVOGfTc",
  authDomain: "eatsmart-5d06c.firebaseapp.com",
  projectId: "eatsmart-5d06c",
  storageBucket: "eatsmart-5d06c.firebasestorage.app",
  messagingSenderId: "287409387498",
  appId: "1:287409387498:web:00dbe423d373804cefe493",
  measurementId: "G-YDSW0TXHH7"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const analytics = getAnalytics(app)

export default app 