import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Keyboard, BackHandler } from 'react-native';
import { Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import ViewAtom from '../components/Atoms/ViewAtom';
import TextAtom from '../components/Atoms/TextAtom';
import MyInput from '../components/Atoms/Input';
import { Button } from '../components/Atoms/Button';
import { COLORS, SIZES } from '../constants/theme';
import { signUpWithEmail,logInWithEmail } from '../utils/authHelper';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
      return true;
    });
    return () => backHandler.remove();
  }, []);

  const handleLogin = async () => {
   
   
    if (!isValidEmail(email) || !isValidPassword(password)) {
      showValidationError();
      return;
    }

    try {
      setLoading(true);
     const res= await logInWithEmail(email, password); // Use the login function
 
     

      setLoading(false);
      // Navigate to the next screen after successful login
      navigation.navigate('QuotesScreen'); // Adjust the navigation as needed
    } catch (error) {
      setLoading(false);
   
      showMessage({
        message: 'Login Failed',
        description: error.message,
        backgroundColor: COLORS.primaryPurple,
        color: COLORS.white,
      });
    }
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (password) => password.length >= 6;

  const showValidationError = () => {
    showMessage({
      message: 'Invalid Input',
      description: 'Please check your email and password!',
      backgroundColor: COLORS.primaryPurple,
      color: COLORS.white,
      icon: { name: 'warning', color: COLORS.white },
    });
  };

  return (
    <View style={styles.screen}>
      <ViewAtom fd="row" ai="center" w="100%">
        <Icon name="chevron-back-outline" type="ionicon" color={COLORS.textPrimary} size={SIZES.h2} onPress={() => navigation.goBack()} />
        <TextAtom text="Sign In" f="Poppins1" s={SIZES.h2} w="500" ta="left" c={COLORS.textPrimary} />
      </ViewAtom>

      <View style={{ marginTop: 20, width: '100%', paddingHorizontal: 10 }}>
        <TextAtom text="Sign in to your account" f="Poppins0" s={13} w="500" c={COLORS.textSecondary} />
      </View>

      <ViewAtom fd="column" ai="flex-start" w="100%" mv={20} ph={10}>
        <TextAtom text="Email" c={COLORS.textPrimary} f="Poppins1" s={SIZES.h5} w="500" />
       
     <MyInput
                editable={true}
                keyboardType={"default"}
                secureTextEntry={false}
                style={styles.input}
                placeholder="Enter your email"
                maxLength={40}
                value={email}
                setisUpdated={setEmail}
                label={""}
               
              />
        <TextAtom text="Password" c={COLORS.textPrimary} f="Poppins1" s={SIZES.h5} w="500" />
      
       <MyInput
                editable={true}
                keyboardType={"default"}
                secureTextEntry={true}
                style={styles.input}
                placeholder="*********"
                maxLength={40}
                value={password}
                setisUpdated={setPassword}
                label={""}
               
              />
      </ViewAtom>

      <Button
        text="Sign in"
        width="95%"
        pv={15}
        bg={COLORS.accentBlue}
        s={SIZES.h4}
        tc={COLORS.white}
        borderRadius={5}
        onMethodSelected={handleLogin}
        loading={loading}
      />

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <TextAtom text="Forgot password?" c={COLORS.textSecondary} f="Poppins" s={SIZES.h5} w="500" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <TextAtom text="Don't have an account? " c={COLORS.textSecondary} f="Poppins" s={SIZES.h5} w="500" />
        <TextAtom text="Create now" c={COLORS.accentBlue} f="Poppins" s={SIZES.h5} w="500" />
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  input: {
    height: 45,
    backgroundColor: "#ededed",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: "100%",
    color: COLORS.textPrimary
  },
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
});
