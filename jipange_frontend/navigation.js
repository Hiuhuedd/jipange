// navigation.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as ReduxProvider } from "react-redux";
import createAppStore from "./redux/store";

// Import your screens
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import GoalsScreen from './screens/GoalsScreen';
import CalendarScreen from './screens/CalendarScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import QuotesScreen from "./screens/QuotesScreen";

// Stack Navigator
const Stack = createStackNavigator();
const screenOptions = {
  headerShown: false,
};
const store = createAppStore();
 ''
export default function RootNavigation() {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={screenOptions}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="GoalsScreen" component={GoalsScreen} />
          <Stack.Screen name="QuotesScreen" component={QuotesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
}
