// config/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDcvENaNW8ajVfr-aKpCAoHy3tYNdlG64A",
  authDomain: "jipange-e41ff.firebaseapp.com",
  projectId: "jipange-e41ff",
  storageBucket: "jipange-e41ff.appspot.com",
  messagingSenderId: "629023282182",
  appId: "1:629023282182:web:26c80c23bc58e23f01df87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default app;

