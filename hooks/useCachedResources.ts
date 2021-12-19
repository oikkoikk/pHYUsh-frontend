import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { PushStore } from "../stores/PushStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [state] = React.useState(PushStore);

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
        const storedPushState: string | null = await AsyncStorage.getItem("@subscribedPushList");

        if (storedPushState !== null) {
          state.subscribedPushList = JSON.parse(storedPushState);
        }

        //Load push setting states
        const storedPushSettingState: string | null = await AsyncStorage.getItem("@pushAgree");

        if (storedPushSettingState !== null) {
          state.pushAgree = JSON.parse(storedPushSettingState);
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
