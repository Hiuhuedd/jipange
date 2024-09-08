import React from 'react';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// Prevent the splash screen from auto-hiding until fonts are loaded
SplashScreen.preventAutoHideAsync();

const TextAtom = ({ text, c, f, s, w, ta, ls, mb, completed }) => {
  const [fontsLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsL: require('../../assets/fonts/Poppins-Light.ttf'),
    Poppins0: require('../../assets/fonts/Poppins-Medium.ttf'),
    Poppins1: require('../../assets/fonts/Poppins-SemiBold.ttf'),
    Poppins2: require('../../assets/fonts/Poppins-Bold.ttf'),
    Roboto: require('../../assets/fonts/Roboto-Regular.ttf'),
    Lob: require('../../assets/fonts/Lobster-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); // Hide the splash screen once fonts are loaded
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Return null while fonts are loading
  }

  return (
    <Text
      style={{
        fontSize: s,
        color: c,
        fontFamily: f,
        fontWeight: w,
        textAlign: ta,
        letterSpacing: ls,
        marginBottom: mb,
        textDecorationLine: completed ? 'line-through' : 'none', // Apply strikethrough if task is completed
      }}
    >
      {text}
    </Text>
  );
};

export default TextAtom;
