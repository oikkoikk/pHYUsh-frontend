import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { useRecoilState } from "recoil";
import { subscribedPushState } from "../states/PushState";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [pushState, setPushState] = useRecoilState(subscribedPushState);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          "NotoSans-Regular": require("../assets/fonts/NotoSansKR-Regular.otf"),
          "NotoSans-Medium": require("../assets/fonts/NotoSansKR-Medium.otf"),
        });

        // Load push states
        const storedPushState = await AsyncStorage.getItem("@pushState");

        if (storedPushState !== null) {
          setPushState(JSON.parse(storedPushState));
        }
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
