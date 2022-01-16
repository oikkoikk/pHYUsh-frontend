import * as React from "react";
import { Animated, Image, ScrollView, StyleSheet } from "react-native";
//import * as Application from "expo-application";
//import * as IntentLauncher from "expo-intent-launcher";
import Header from "../../components/Header";
import { Entypo } from "@expo/vector-icons";
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import SearchInputBox from "../../components/SearchInputBox";
import { PushStore } from "../../stores/PushStore";
import CardView from "../../components/CardView";
import { TCourseInfo } from "../../types";
import { observer } from "mobx-react";
import { CourseStore } from "../../stores/CourseStore";
import { useNavigation } from "@react-navigation/native";

const MainScreen = observer(() => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const [pushState] = React.useState(PushStore);
  const [courseState] = React.useState(CourseStore);
  const fetchLimitCourses = async () => {
    await courseState.fetchLimitCourses();
  };
  React.useEffect(() => {
    fetchLimitCourses();
  }, []);

  const SemesterInfo = observer(() => {
    const semester = "";

    return (
      <View style={styles.container_info}>
        <Text style={styles.text_info}>{semester === "" ? "학기 정보가 없어요 💦" : "semester"}</Text>
      </View>
    );
  });

  const LimitList = observer(() => {
    const opacity = React.useRef(new Animated.Value(0)).current;
    const visibleAnim = Animated.timing(opacity, {
      toValue: 1,
      duration: 600,
      delay: 0,
      useNativeDriver: false,
    });
    React.useEffect(() => {
      visibleAnim.start();
    }, []);

    return (
      <Animated.View
        style={{ ...styles.container_push_list, opacity: opacity, backgroundColor: Colors[colorScheme].gray01, marginBottom: 10 }}
      >
        <View style={{ ...styles.container_header, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginRight: 20 }}>
          <View style={{backgroundColor: "transparent", height: 30}}>
            <Text style={styles.text_header}>마감 임박!</Text>
          </View>
          <Entypo name="chevron-thin-right" size={22} color="gray" onPress={() => {navigation.navigate("LimitedScreen")}} />
        </View>
        {courseState.limitCourses.slice(0, 1).map((course: TCourseInfo, index: number) => (
          <View style={styles.container_card_view} key={`${course.suupNo}_subscribed_${index}`}>
            <CardView course={course} />
          </View>
        ))}
      </Animated.View>
    );
  });

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

  const PushList = observer(() => {
    return (
      <View style={{ ...styles.container_push_list, backgroundColor: Colors[colorScheme].gray01 }}>
        <View style={styles.container_header}>
          <Text style={styles.text_header}>신청한 알림</Text>
        </View>
        {pushState.subscribedPushList.length === 0 ? (
          <View style={{ backgroundColor: "transparent", marginTop: 70, marginBottom: 40, alignItems: "center" }}>
            <Image style={{ height: 250, width: 250 }} source={require("../../assets/images/HYLION_DANCE.png")} />
            <View style={{ backgroundColor: "transparent", marginTop: 10 }}>
              <Text style={{ ...styles.text_header, color: "gray" }}>{"지금 바로 빈자리 알림을 신청해보세요!"}</Text>
            </View>
          </View>
        ) : (
          <>
            {pushState.subscribedPushList.map((course: TCourseInfo, index: number) => (
              <View style={styles.container_card_view} key={`${course.suupNo}_subscribed_${index}`}>
                <CardView course={course} />
              </View>
            ))}
          </>
        )}
      </View>
    );
  });

  const ReceivedPush = () => {
    const height = React.useRef(new Animated.Value(0)).current;
    const opacity = React.useRef(new Animated.Value(0)).current;

    const slideAnim = Animated.timing(height, { toValue: 160, duration: 400, delay: 800, useNativeDriver: false });
    const visibleAnim = Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      delay: 1200,
      useNativeDriver: false,
    });

    React.useEffect(() => {
      slideAnim.start();
      visibleAnim.start();
      /*  const bundleIdentifier = Application.applicationId;
       Application.noti
       IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.APP_NOTIFICATION_SETTINGS); */
    }, []);

    return (
      <Animated.View
        style={{
          ...styles.container_push_list,
          backgroundColor: Colors[colorScheme].gray01,
          marginBottom: 10,
          maxHeight: height,
          opacity: opacity,
        }}
      >
        <View style={styles.container_header}>
          <Text style={styles.text_header}>혹시 놓치셨나요?</Text>
        </View>
        {pushState.subscribedPushList.slice(0, 1).map((course: TCourseInfo, index: number) => (
          <View style={styles.container_card_view} key={`${course.suupNo}_received_${index}`}>
            <CardView course={course} />
          </View>
        ))}
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 40 }}>
        <SemesterInfo />
        {/*<ReceivedPush />*/}
        {courseState.limitCourses.length > 0 ? <LimitList /> : <></>}
        <SearchBox />
        <PushList />
      </ScrollView>
    </View>
  );
});

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
    height: "auto",
    marginTop: 10,
    borderRadius: 18,
  },
  container_card_view: { paddingHorizontal: 12, backgroundColor: "transparent" },
});
