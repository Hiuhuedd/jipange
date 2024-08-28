// utils/authHelper.js
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';

// Sign up with email and password
export const signUpWithEmail = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth,email, password);
  } catch (error) {
    throw error;
  }
};

// Log in with email and password
export const logInWithEmail = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth,email, password);
  } catch (error) {
    throw error;
  }
};

// Log out the user
export const logOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    throw error;
  }
};
