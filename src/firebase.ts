import { FirebaseApp, getApp, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export let app: FirebaseApp;
const {
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_APP_ID,
  VITE_FIREBASE_MEASUREMENT_ID,
} = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: VITE_FIREBASE_AUTH_DOMAIN,
  projectId: VITE_FIREBASE_PROJECT_ID,
  storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: VITE_FIREBASE_APP_ID,
  appId: VITE_FIREBASE_MEASUREMENT_ID,
};

try {
  app = getApp('app');
} catch (error) {
  app = initializeApp(firebaseConfig, 'app');
}

const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default firebase;
