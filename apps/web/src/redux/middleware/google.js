import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { userLogin } from '@/redux/middleware/user';

const firebaseConfig = {
  apiKey: 'AIzaSyAM8gopy-UNby4GfQHQN2rPRZWaDk18BLQ',
  authDomain: 'fir-test-fc90e.firebaseapp.com',
  projectId: 'fir-test-fc90e',
  storageBucket: 'fir-test-fc90e.appspot.com',
  messagingSenderId: '998226219171',
  appId: '1:998226219171:web:72e62bf7f0237080232f16',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = (dispatch, router) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const email = result.user.email;
      const password = '';
      const social = 'google';
      dispatch(userLogin({ email, password, social }, router));
    })
    .catch((error) => {
      console.error(error);
    });
};
