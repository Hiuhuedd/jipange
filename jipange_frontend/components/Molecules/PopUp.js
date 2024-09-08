import * as React from 'react';
import { Menu, Divider, PaperProvider } from 'react-native-paper';

const PopUp = ({ visible, onDismiss }) => {
  return (
    <PaperProvider>

    <Menu
      visible={visible}
      onDismiss={onDismiss}
    >
      <Menu.Item onPress={() => { /* Handle Edit User */ }} title="Edit User" />
      <Menu.Item onPress={() => {
        // Handle Log Out
        AsyncStorage.removeItem('user');
        navigation.navigate('LoginScreen');
    }} title="Log Out" />
      <Divider />
      <Menu.Item onPress={() => { /* Handle Other Actions */ }} title="Other Action" />
    </Menu>
    </PaperProvider>
  );
};

export default PopUp;
