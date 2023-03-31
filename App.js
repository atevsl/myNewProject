import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { auth } from "./firebase/config";
import Main from "./src/components/Main";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isUserAuth, setIsUserAuth] = useState(null);

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

  auth.onAuthStateChanged((user) => {
    setIsUserAuth(user);
  });

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
