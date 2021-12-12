import * as React from "react";
import { Pressable, StyleSheet } from "react-native";
import { View } from "../../components/Themed";
import { useNavigation, useRoute } from "@react-navigation/native";
import SearchInputBox from "../../components/SearchInputBox";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";
import { Entypo } from "@expo/vector-icons";
import useColorScheme from "../../hooks/useColorScheme";
import Layout from "../../constants/Layout";
import CardView from "../../components/CardView";

const SearchScreen = () => {
  const colorScheme = useColorScheme();
  const route = useRoute();
  const propInput: string = route.params?.input;
  const navigation = useNavigation();
  const [input, setInput] = React.useState(propInput ? propInput : "");

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: Colors[colorScheme].background }}>
      <View style={styles.container_header}>
        <Pressable
          style={styles.icon_back}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Entypo name="chevron-thin-left" size={22} color="gray" />
        </Pressable>
        <View style={{ marginLeft: 50, backgroundColor: "transparent", alignItems: "center", justifyContent: "center" }}>
          <SearchInputBox onSubmit="search" searchedInput={input} />
        </View>
      </View>
      <View style={{ ...styles.seperator, backgroundColor: Colors[colorScheme].seperator }} />
      <CardView />
      <CardView />
      <CardView />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  container_header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
  },
  icon_back: {
    height: 30,
    position: "absolute",
    top: 15,
    left: 20,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  seperator: {
    height: 1,
    marginVertical: 15,
  },
});
