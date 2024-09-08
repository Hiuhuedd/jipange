import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RootNavigation from './navigation';
import FlashMessage from 'react-native-flash-message';
import { COLORS } from './constants/theme';

export default function App() {
  return (
    <>
          {/* <StatusBar barStyle="light-content" backgroundColor={COLORS.white} /> */}
          <StatusBar style="auto" />
      <RootNavigation/>
      <FlashMessage position="top" />
    </>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
