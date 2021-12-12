import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { TextInput, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import useColorScheme from "../hooks/useColorScheme";
import { View } from "./Themed";
import Toast from "react-native-toast-message";

const SearchInputBox = ({ onSubmit, searchedInput = "" }: { onSubmit: "navigate" | "search"; searchedInput?: string }) => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const [input, setInput] = React.useState(""); //input: 검색창의 입력

  const _onSubmit = () => {
    if (input.length <= 1) {
      //두 글자 이상 입력 경고 Toast
      Toast.show({
        type: "custom",
        text1: "잠시만요!👋",
        text2: "검색어는 두 글자 이상 입력해주세요",
      });
      return;
    }
    if (onSubmit === "navigate") navigation.navigate("SearchScreen", { input: input });
    //else
  };

  return (
    <View style={{ ...styles.container_input, backgroundColor: Colors[colorScheme].gray02 }}>
      <TextInput
        defaultValue={searchedInput}
        returnKeyType="search"
        style={{ ...styles.text_input, color: Colors[colorScheme].text }}
        placeholder={"교과목명을 입력해주세요"}
        placeholderTextColor={"gray"}
        allowFontScaling={false}
        onChangeText={(value: string) => {
          setInput(value);
        }}
        onSubmitEditing={() => {
          _onSubmit();
        }}
      />
      <Ionicons
        name="search"
        size={24}
        color="gray"
        style={{ position: "absolute", right: 20 }}
        onPress={() => {
          _onSubmit();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container_input: {
    flexDirection: "row",
    alignContent: "space-between",
    height: 50,
    marginTop: 20,
    borderRadius: 18,
    marginHorizontal: 20,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  text_input: {
    height: 25,
    width: Layout.window.width - 150,
    fontWeight: "normal",
    fontSize: 17,
    lineHeight: 25,
    textAlignVertical: "center",
  },
});

export default SearchInputBox;
