import * as React from "react";
import { Pressable, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import Header from "../../components/Header";
import { Text, View } from "../../components/Themed";
import { pushSettingState } from "../../states/PushState";
import { useRecoilState } from "recoil";

const SettingScreen = () => {
  const ToggleSwitch = React.forwardRef(
    (
      { toggle, setToggle }: { toggle: boolean; setToggle: React.Dispatch<React.SetStateAction<boolean>> },
      toggleRef: React.LegacyRef<LottieView>
    ) => {
      return (
        <Pressable
          onPress={() => {
            setToggle(!toggle);
          }}
        >
          <LottieView
            ref={toggleRef}
            autoPlay={false}
            loop={false}
            source={require("../../assets/lotties/toggle_switch.json")}
            style={styles.toggleSwitch}
          />
        </Pressable>
      );
    }
  );

  const SettingElement = ({ title, description }: { title: string; description: string }) => {
    const [toggle, setToggle] = useRecoilState(pushSettingState);
    const toggleRef = React.useRef() as React.MutableRefObject<LottieView>;

    React.useEffect(() => {
      if (toggle) {
        toggleRef.current.play(0, 20);
      } else {
        toggleRef.current.play(90, 110);
      }
    }, [toggle]);

    return (
      <View style={styles.container_setting}>
        <View style={styles.container_title}>
          <Text style={styles.text_title}>{title}</Text>
          <Text style={styles.text_description}>{description}</Text>
        </View>
        <ToggleSwitch ref={toggleRef} toggle={toggle} setToggle={setToggle} />
      </View>
    );
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
        <View style={styles.container_info}>
          <Text style={styles.text_info}>{"설정"}</Text>
        </View>
        <SettingElement title={"푸시알림 수신"} description={"알림 설정한 과목에 빈자리가 생기면 알려드릴게요."} />
      </View>
    </>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 40,
  },
  toggleSwitch: {
    width: 80,
    height: 40,
  },
  container_info: {
    height: 40,
    justifyContent: "center",
    marginLeft: 10,
    backgroundColor: "transparent",
  },
  text_info: {
    fontFamily: "NotoSans-Medium",
    fontWeight: "normal",
    fontSize: 30,
    lineHeight: 40,
  },
  container_setting: {
    height: 100,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  container_title: { backgroundColor: "transparent" },
  text_title: { fontFamily: "NotoSans-Medium", fontWeight: "normal", fontSize: 23, lineHeight: 30 },
  text_description: {
    fontFamily: "NotoSans-Medium",
    fontWeight: "normal",
    fontSize: 15,
    lineHeight: 25,
    marginTop: 10,
    color: "gray",
  },
});
