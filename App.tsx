import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast, { BaseToast, ErrorToast, BaseToastProps } from "react-native-toast-message";
import Colors from "./constants/Colors";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import Loading from "./components/Loading";
import { Platform } from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [expoPushToken, setExpoPushToken] = useState("");

  async function registerForPushNotificationsAsync(): Promise<string> {
    let token: string = "";

    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        Toast.show({
          type: "custom",
          text1: "잠시만요! 👋",
          text2: "권한에 동의하지 않아 푸시 알림을 받을 수 없어요!",
        });
        return token;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      await AsyncStorage.setItem("@pushToken", JSON.stringify(token));
      alert(token);
      console.log(token);
    } else {
      Toast.show({
        type: "custom",
        text1: "잠시만요! 👋",
        text2: "푸시알림은 실제 단말기에서만 받을 수 있어요!",
      });
    }

    if (Platform.OS === "android") {
      Notifications.deleteNotificationChannelAsync("expo_notifications_fallback_notification_channel");
      Notifications.setNotificationChannelAsync("default", {
        name: "빈자리 알림",
        importance: Notifications.AndroidImportance.MAX,
      });
    }

    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      Toast.show({
        type: "custom",
        text1: notification.request.content.title as string,
        text2: notification.request.content.body as string,
        position: "top",
        topOffset: 60,
      });
    });
    return () => subscription.remove();
  }, []);

  const toastConfig = {
    success: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={{ backgroundColor: Colors[colorScheme].gray02, borderLeftColor: "#69C779" }}
        text1Style={{
          fontSize: 16,
          fontFamily: "NotoSans-Medium",
          fontWeight: "normal",
          lineHeight: 20,
          color: Colors[colorScheme].text,
        }}
        text2Style={{
          fontSize: 14,
          fontFamily: "NotoSans-Regular",
          fontWeight: "normal",
          lineHeight: 20,
          color: Colors[colorScheme].text,
        }}
      />
    ),
    error: (props: BaseToastProps) => (
      <ErrorToast
        {...props}
        style={{ backgroundColor: Colors[colorScheme].gray02, borderLeftColor: "#FE6301" }}
        text1Style={{
          fontSize: 16,
          fontFamily: "NotoSans-Medium",
          fontWeight: "normal",
          lineHeight: 20,
          color: Colors[colorScheme].text,
        }}
        text2Style={{
          fontSize: 14,
          fontFamily: "NotoSans-Regular",
          fontWeight: "normal",
          lineHeight: 20,
          color: Colors[colorScheme].text,
        }}
      />
    ),
    custom: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={{ backgroundColor: Colors[colorScheme].gray02, borderLeftColor: Colors[colorScheme].gray02 }}
        text1Style={{
          fontSize: 16,
          fontFamily: "NotoSans-Medium",
          fontWeight: "normal",
          lineHeight: 20,
          color: Colors[colorScheme].text,
        }}
        text2Style={{
          fontSize: 14,
          fontFamily: "NotoSans-Regular",
          fontWeight: "normal",
          lineHeight: 20,
          color: Colors[colorScheme].text,
        }}
      />
    ),
  };
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <React.Suspense fallback={<Loading />}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
          <Toast position="bottom" onPress={() => Toast.hide()} config={toastConfig} />
        </SafeAreaProvider>
      </React.Suspense>
    );
  }
}
