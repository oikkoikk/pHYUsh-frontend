import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast, { BaseToast, ErrorToast, BaseToastProps } from "react-native-toast-message";
import Colors from "./constants/Colors";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { RecoilRoot } from "recoil";
import Loading from "./components/Loading";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

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
      <RecoilRoot>
        <React.Suspense fallback={<Loading />}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
            <Toast position="bottom" onPress={() => Toast.hide()} config={toastConfig} />
          </SafeAreaProvider>
        </React.Suspense>
      </RecoilRoot>
    );
  }
}
