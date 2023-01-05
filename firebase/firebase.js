import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAjqVfBhOAL3_1Xohb0i8lJTQ-d2Ox-zis',
  authDomain: 'galaxly-5842d.firebaseapp.com',
  projectId: 'galaxly-5842d',
  storageBucket: 'galaxly-5842d.appspot.com',
  messagingSenderId: '1049076293044',
  appId: '1:1049076293044:web:471a86fa1f7c829f9626e1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
export const db = getFirestore(app);
