import * as React from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import Header from "../../components/Header";
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import SearchInputBox from "../../components/SearchInputBox";

const MainScreen = () => {
  const colorScheme = useColorScheme();
  const SemesterInfo = () => {
    const semester = "";

    return (
      <View style={styles.container_info}>
        <Text style={styles.text_info}>{semester === "" ? "학기 정보가 없어요 💦" : "semester"}</Text>
      </View>
    );
  };

  const SearchBox = () => {
    return (
      <View style={{ ...styles.container_search_area, backgroundColor: Colors[colorScheme].gray01 }}>
        <View style={styles.container_header}>
          <Text style={styles.text_header}>과목 검색</Text>
        </View>
        <SearchInputBox onSubmit="navigate" />
      </View>
    );
  };

  const PushList = () => {
    const [pushState, setPushState] = React.useState([]); // pushState: 현재 신청되어있는 알림

    return (
      <View style={{ ...styles.container_push_list, backgroundColor: Colors[colorScheme].gray01 }}>
        <View style={styles.container_header}>
          <Text style={styles.text_header}>신청한 알림</Text>
        </View>
        {pushState.length === 0 ? (
          <View style={{ backgroundColor: "transparent", marginTop: 70, alignItems: "center" }}>
            <Image style={{ height: 250, width: 250 }} source={require("../../assets/images/HYLION_DANCE.png")} />
            <View style={{ backgroundColor: "transparent", marginTop: 10 }}>
              <Text style={{ ...styles.text_header, color: "gray" }}>{"지금 바로 빈자리 알림을 신청해보세요!"}</Text>
            </View>
          </View>
        ) : (
          <></>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 40 }}>
        <SemesterInfo />
        <SearchBox />
        <PushList />
      </ScrollView>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  container_search_area: {
    height: 150,
    borderRadius: 18,
  },
  container_info: {
    height: 40,
    justifyContent: "center",
    marginLeft: 10,
    marginBottom: 30,
    backgroundColor: "transparent",
  },
  text_info: {
    fontFamily: "NotoSans-Medium",
    fontWeight: "normal",
    fontSize: 30,
    lineHeight: 40,
  },
  container_header: {
    height: 40,
    justifyContent: "center",
    marginLeft: 20,
    marginTop: 10,
    backgroundColor: "transparent",
  },
  text_header: {
    fontFamily: "NotoSans-Medium",
    fontWeight: "normal",
    fontSize: 22,
    lineHeight: 30,
  },
  container_push_list: {
    height: 500,
    marginTop: 10,
    borderRadius: 18,
  },
});
