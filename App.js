import { useCallback, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { useRoute } from "./router";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const routing = useRoute(true);
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

  return <NavigationContainer>{routing}</NavigationContainer>;
}
