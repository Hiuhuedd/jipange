// config/firebase.js
import { initializeApp } from 'firebase/app';

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDcvENaNW8ajVfr-aKpCAoHy3tYNdlG64A",
  authDomain: "jipange-e41ff.firebaseapp.com",
  projectId: "jipange-e41ff",
  storageBucket: "jipange-e41ff.appspot.com",
  messagingSenderId: "629023282182",
  appId: "1:629023282182:web:26c80c23bc58e23f01df87"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


export default app;

