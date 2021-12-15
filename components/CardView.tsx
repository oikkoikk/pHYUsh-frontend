import * as React from "react";
import { Pressable, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import useColorScheme from "../hooks/useColorScheme";
import { TCourseInfo } from "../types";
import { Text, View } from "./Themed";
import LottieView from "lottie-react-native";
import Toast from "react-native-toast-message";
import { checkSubscription, subscribedPushState } from "../states/PushState";
import { RecoilValue, useRecoilState, useRecoilValue } from "recoil";

const CardView = ({ course }: { course: TCourseInfo }) => {
  /*
      haksuNo: 학수번호
      suupNo: 수업번호
      gwamokNm: 교과목명
      daepyoGangsaNm: 교강사명
      hakjeom: 학점
      suupTimes: 수업시간(string을 ,로 구분)
      jehanInwon: 제한인원(ex."42/42")
    */

  const colorScheme = useColorScheme();

  const [currNum, maxNum] = course.jehanInwon.split("/").map((str: string) => +str);
  const computeStatus = () => {
    return currNum / maxNum === 1 ? "full" : currNum / maxNum > 0.5 ? "scarce" : "enough";
  };
  const _onPressCard = React.useCallback(() => {
    setCollapsed(!collapsed);
  }, []);

  const bellRef = React.useRef() as React.MutableRefObject<LottieView>;
  const subscribed: boolean = useRecoilValue(checkSubscription(course.suupNo));
  const [pushState, setPushState] = useRecoilState(subscribedPushState);
  const [status, setStatus] = React.useState(computeStatus());
  const [collapsed, setCollapsed] = React.useState(true);

  React.useEffect(() => {
    if (subscribed || status === "full") bellRef.current.play(0, 100);
    else bellRef.current.play(0, 0);
  }, [subscribed, status]);

  const pushToggle = React.useCallback(async (course: TCourseInfo) => {
    if (!subscribed) {
      //푸시 알림 설정
      setPushState([...pushState, course]);
    } else {
      //푸시 알림 해제
      const temp: TCourseInfo[] = pushState.filter((Pcourse: TCourseInfo) => {
        return Pcourse.suupNo !== course.suupNo;
      });
      setPushState(temp);
    }
    const stringified = JSON.stringify(pushState);
    await AsyncStorage.setItem("@pushState", stringified);
    // asyncstorage에 저장
  }, []);

  const onSubscribe = React.useCallback(() => {
    if (status !== "full") {
      Toast.show({
        type: "custom",
        text1: "잠시만요! 👋",
        text2: "빈자리 알림은 자리가 없는 강의만 가능해요!",
      });
      return;
    }

    if (pushState.length > 9 && !subscribed) {
      Toast.show({
        type: "custom",
        text1: "잠시만요! 👋",
        text2: "빈자리 알림은 최대 10개까지만 가능해요!",
      });
      return;
    }

    if (!subscribed)
      Toast.show({
        type: "custom",
        text1: "알림 설정 완료 🔔",
        text2: "빈자리가 생기면 알려드릴게요!",
      });
    else
      Toast.show({
        type: "custom",
        text1: "알림 해제 완료 🔔",
        text2: "알림이 정상적으로 해제되었어요!",
      });
    pushToggle(course);
  }, []);

  React.useEffect(() => {
    setStatus(computeStatus());
  }, [currNum]);

  return (
    <Pressable onPress={_onPressCard}>
      <View
        style={{
          ...styles.container,
          opacity: status === "full" ? 1 : 0.7,
          height: collapsed ? 100 : "auto",
          backgroundColor: Colors[colorScheme].gray01,
        }}
      >
        <View style={styles.container_title}>
          <Text numberOfLines={1} style={styles.text_title}>{`${course.gwamokNm} (${course.haksuNo})`}</Text>
        </View>
        <View style={styles.container_detail1}>
          <Text style={styles.text_detail1}>{course.daepyoGangsaNm}</Text>
        </View>
        <View style={styles.container_detail2}>
          <Text style={styles.text_detail2}>{`${course.hakjeom}학점 / 수업번호: ${course.suupNo}`}</Text>
        </View>
        <View style={{ ...styles.container_detail2, height: "auto", marginBottom: 15 }}>
          <Text style={styles.text_detail2}>{`${course.suupTimes.split(",").join("\n")}`}</Text>
        </View>
        <View
          style={{
            ...styles.container_vacancy,
            backgroundColor: status === "full" ? "#FF4040" : status === "scarce" ? "#FF7F00" : "#69C779",
          }}
        >
          <Text style={styles.text_vacancy}>{course.jehanInwon}</Text>
        </View>
        <Pressable
          onPress={() => {
            onSubscribe();
          }}
          style={{ ...styles.container_bell, backgroundColor: Colors[colorScheme].gray02 }}
        >
          {subscribed === false && status === "full" ? (
            <LottieView
              ref={bellRef}
              autoPlay={true}
              loop={true}
              source={require("../assets/lotties/bell_disabled.json")}
              style={styles.bell}
            />
          ) : (
            <LottieView
              ref={bellRef}
              autoPlay={false}
              loop={false}
              source={!subscribed ? require("../assets/lotties/bell_disabled.json") : require("../assets/lotties/bell.json")}
              style={styles.bell}
            />
          )}
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    marginBottom: 10,
    paddingHorizontal: 10,
    overflow: "hidden",
  },
  container_title: {
    height: 20,
    width: Layout.window.width - 50,
    marginTop: 15,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  text_title: {
    fontFamily: "NotoSans-Medium",
    fontWeight: "normal",
    lineHeight: 23,
    fontSize: 20,
  },
  container_detail1: {
    height: 20,
    marginTop: 5,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  text_detail1: {
    fontFamily: "NotoSans-Regular",
    fontWeight: "normal",
    lineHeight: 19,
    fontSize: 16,
  },
  container_detail2: {
    height: 20,
    marginTop: 15,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  text_detail2: {
    fontFamily: "NotoSans-Regular",
    fontWeight: "normal",
    color: "gray",
    lineHeight: 18,
    fontSize: 15,
  },
  container_vacancy: {
    position: "absolute",
    top: 43,
    right: 70,
    height: 30,
    width: 70,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text_vacancy: {
    fontFamily: "NotoSans-Medium",
    fontWeight: "normal",
    lineHeight: 30,
    color: "#FFFFFF",
    fontSize: 20,
  },
  container_bell: {
    position: "absolute",
    top: 35,
    right: 15,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  bell: {
    width: 45,
    height: 45,
  },
});

export default CardView;
