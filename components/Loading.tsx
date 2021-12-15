import * as React from "react";
import { ActivityIndicator } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { View } from "./Themed";

const Loading = () => {
  const colorScheme = useColorScheme();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color={Colors[colorScheme].tint} />
    </View>
  );
};

export default Loading;
