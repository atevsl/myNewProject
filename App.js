import { useEffect, useState } from "react";
import { NavigationContainer, useScrollToTop } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Home from "./src/Screens/Home";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "./src/Auth/RegistrationScreen";
import LoginScreen from "./src/Auth/LoginScreen";
import { Provider } from "react-redux";
import { store } from "./redux/store";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Caveat-VariableFont_wght": require("./assets/fonts/Caveat-VariableFont_wght.ttf"),
  });

  useEffect(() => {
    async function prerape() {
      await SplashScreen.preventAutoHideAsync();
    }
    prerape();
  }, []);
  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }
  const AuthStack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthStack.Navigator>
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="LoginScreen"
            component={LoginScreen}
          />
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="RegistrationScreen"
            component={RegistrationScreen}
          />
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          />
        </AuthStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
