import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
    
      
      navigation.replace("Login")  
    }, 2000); // Redirect to the Login screen after 2 seconds
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <ActivityIndicator size="small" color="#302862"  style={{bottom:-10}}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:"100%",
    height:"100%",
    backgroundColor: '#EDF2F7', // Soft gray background
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2B6CB0', // Steel blue color
  },
});

export default SplashScreen;
