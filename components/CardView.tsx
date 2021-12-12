import * as React from "react";
import { Pressable, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import useColorScheme from "../hooks/useColorScheme";
import { TCourseInfo } from "../types";
import { Text, View } from "./Themed";
import LottieView from "lottie-react-native";

const CardView = () => {
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
  const mockupData: TCourseInfo = {
    haksuNo: "CUL3011",
    suupNo: "15050",
    gwamokNm: "일반물리학및실험1",
    daepyoGangsaNm: "김준하",
    hakjeom: 3,
    suupTimes: "월화수목금(10:00-12:00),월화수목금(13:00-15:00)",
    jehanInwon: "42/42",
  };

  const [currNum, maxNum] = mockupData.jehanInwon.split("/").map((str: string) => +str);
  const computeStatus = () => {
    return currNum / maxNum === 1 ? "full" : currNum / maxNum > 0.5 ? "scarce" : "enough";
  };
  const _onPressCard = () => {
    setCollapsed(!collapsed);
  };

  const bellRef = React.useRef() as React.MutableRefObject<LottieView>;
  const [subscribed, setSubscribed] = React.useState(false);
  const [status, setStatus] = React.useState(computeStatus());
  const [collapsed, setCollapsed] = React.useState(true);

  React.useEffect(() => {
    if (subscribed || status === "full") bellRef.current.play(0, 100);
    else bellRef.current.play(0, 0);
  }, [subscribed, status]);

  React.useEffect(() => {
    setStatus(computeStatus());
  }, [currNum]);

  return (
    <Pressable onPress={_onPressCard}>
      <View style={{ ...styles.container, height: collapsed ? 100 : "auto", backgroundColor: Colors[colorScheme].gray01 }}>
        <View style={styles.container_title}>
          <Text numberOfLines={1} style={styles.text_title}>{`${mockupData.gwamokNm} (${mockupData.haksuNo})`}</Text>
        </View>
        <View style={styles.container_detail1}>
          <Text style={styles.text_detail1}>{mockupData.daepyoGangsaNm}</Text>
        </View>
        <View style={styles.container_detail2}>
          <Text style={styles.text_detail2}>{`${mockupData.hakjeom}학점 / 수업번호: ${mockupData.suupNo}`}</Text>
        </View>
        <View style={{ ...styles.container_detail2, height: "auto", marginBottom: 15 }}>
          <Text style={styles.text_detail2}>{`${mockupData.suupTimes.split(",").join("\n")}`}</Text>
        </View>
        <View
          style={{
            ...styles.container_vacancy,
            backgroundColor: status === "full" ? "#FF4040" : status === "scarce" ? "#FF7F00" : "#69C779",
          }}
        >
          <Text style={styles.text_vacancy}>{mockupData.jehanInwon}</Text>
        </View>
        <Pressable
          onPress={() => {
            setSubscribed(!subscribed);
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
