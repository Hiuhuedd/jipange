import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS } from '../../constants/theme';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import ViewAtom from './ViewAtom';

export const Button = ({
  text,
  width,
  bg,
  navigation,
  screen,
  onMethodSelected,
  borderRadius,
  s,
  pv,
  ph,
  tc,
  loading,
  op
}) => {
  const [fontsLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    Poppins1: require('../../assets/fonts/Poppins-Black.ttf'),
    Roboto: require('../../assets/fonts/Roboto-Regular.ttf'),
    Lob: require('../../assets/fonts/Lobster-Regular.ttf')
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); // Hide the splash screen once fonts are loaded
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Return null while fonts are loading
  }

  const handleOnPress = (vText) => {
    if (navigation) {
      onMethodSelected(vText);
      navigation.navigate(screen);
    } else {
      onMethodSelected(vText);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={op ? op : 0.3}
      style={{
        backgroundColor: bg,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: borderRadius,
        width: width,
        paddingHorizontal: ph,
        paddingVertical: pv,
        elevation: 1,
        shadowColor: '#111',
        fontFamily: 'Poppins',
        flexDirection: 'row',
      }}
      onPress={() => handleOnPress(text)}
    >
      {loading ? (
        <ActivityIndicator size="small" color={COLORS.white} />
      ) : (
        <Text style={{ fontFamily: 'Poppins1', color: tc, fontSize: s }}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};
