import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyBOhZfElMyMDj225uU5c_HjnflpPL0r--8',
  authDomain: 'workoutapp-5d386.firebaseapp.com',
  projectId: 'workoutapp-5d386',
  storageBucket: 'workoutapp-5d386.appspot.com',
  messagingSenderId: '351695496693',
  appId: '1:351695496693:web:5d480bd22d7cdd5731ecbc',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const GoogleProvider = new GoogleAuthProvider();
const FacebookProvider = new FacebookAuthProvider();
const firestore= getFirestore(app);

export { auth, firestore, GoogleProvider, FacebookProvider, signInWithPopup };

