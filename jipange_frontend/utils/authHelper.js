// utils/authHelper.js
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

// Sign up with email, password, and username
export const signUpWithEmail = async (email, password, username) => {

  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save username and user details in AsyncStorage
    const userData = {
      email: user.email,
      username: username,
      uid: user.uid,
    };
    await AsyncStorage.setItem('user', JSON.stringify(userData));

    // Dispatch user data to the Redux store
   
    return userCredential; // Return the response object
  } catch (error) {
    throw error; // Propagate error to caller
  }
};

// Log in with email and password
export const logInWithEmail = async (email, password) => {
  // const dispatch = useDispatch(); // Use dispatch from Redux
 const username= await AsyncStorage.getItem('user');

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userData = {
      email: user.email,
      username: JSON.parse(username).username,
      uid: user.uid,
    };
    await AsyncStorage.setItem('user', JSON.stringify(userData));

    // Fetch user data from AsyncStorage
    const storedUser = await AsyncStorage.getItem('user');
    // const userData = storedUser
    //   ? JSON.parse(storedUser)
    //   : { email: user.email, username: '', uid: user.uid }; // Use Firebase user data as fallback

    // Dispatch user data to the Redux store
    // dispatch({
    //   type: 'ON_USERSIGNON',
    //   payload: userData,
    // });

    return userCredential; // Return the response object
  } catch (error) {
    throw error; // Propagate error to caller
  }
};

// Log out the user and clear AsyncStorage
export const logOut = async () => {
  const dispatch = useDispatch(); // Use dispatch from Redux

  try {
    await auth.signOut();
    await AsyncStorage.removeItem('user'); // Clear the user data on logout

    // Clear user data in Redux
    dispatch({
      type: 'ON_USERSIGNON',
      payload: {}, // Reset user to an empty object on logout
    });

    return { success: true };
  } catch (error) {
    throw error; // Propagate error to caller
  }
};
