import * as React from "react";
import { FlatList, Image, ListRenderItemInfo, Pressable, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { useNavigation, useRoute } from "@react-navigation/native";
import SearchInputBox from "../../components/SearchInputBox";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";
import { Entypo } from "@expo/vector-icons";
import useColorScheme from "../../hooks/useColorScheme";
import CardView from "../../components/CardView";
import { useRecoilValue } from "recoil";
import { CourseState } from "../../states/CourseState";
import { TCourseInfo } from "../../types";

const SearchScreen = () => {
  const colorScheme = useColorScheme();
  const route = useRoute();
  const propInput: string = route.params?.input;
  const navigation = useNavigation();
  const [input, setInput] = React.useState(propInput ? propInput : "");
  const courses = useRecoilValue(CourseState);

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
        <View style={{ marginLeft: 20, backgroundColor: "transparent", alignItems: "center", justifyContent: "center" }}>
          <SearchInputBox onSubmit="search" searchedInput={input} />
        </View>
      </View>
      <View style={{ ...styles.seperator, backgroundColor: Colors[colorScheme].seperator }} />
      {courses.length === 0 ? (
        <View style={{ backgroundColor: "transparent", marginTop: 70, alignItems: "center" }}>
          <Image style={{ height: 250, width: 250 }} source={require("../../assets/images/HYLION_NO_RESULT.png")} />
          <View style={{ backgroundColor: "transparent", marginTop: 10 }}>
            <Text style={{ ...styles.text_info, color: "gray" }}>{"검색 결과가 없습니다"}</Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={courses}
          keyExtractor={(course: TCourseInfo) => course.suupNo}
          renderItem={(course: ListRenderItemInfo<TCourseInfo>) => <CardView course={course.item} />}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    left: 5,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  seperator: {
    height: 1,
    marginVertical: 15,
  },
  text_info: {
    fontFamily: "NotoSans-Medium",
    fontWeight: "normal",
    fontSize: 22,
    lineHeight: 30,
  },
});
