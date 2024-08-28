// components/LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { logInWithEmail , signUpWithEmail} from '../utils/authHelper';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await signUpWithEmail(email, password);
      // Navigate to the next screen after successful login
    } catch (error) {
      setError(error.message);
      console.log(error.message);
      
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      {error ? <Text>{error}</Text> : null}
      <Button title="Log In" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
