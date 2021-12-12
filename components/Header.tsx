import * as React from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

const Header = () => {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaView
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors[colorScheme].background,
        borderBottomColor: Colors[colorScheme].seperator,
        borderBottomWidth: 1,
        height: 115,
      }}
    >
      <Image
        style={{ width: 50, height: 50, marginVertical: 5 }}
        resizeMode="contain"
        source={require("../assets/images/HYU_logo.png")}
      />
    </SafeAreaView>
  );
};

export default React.memo(Header);
