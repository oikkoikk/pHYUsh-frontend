import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import * as React from "react";
import { FlatList, ListRenderItemInfo, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CardView from "../../components/CardView";
import { View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { CourseStore } from "../../stores/CourseStore";
import { TCourseInfo } from "../../types";

const LimitedScreen = observer(() => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const [state] = React.useState(CourseStore);

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
      </View>
      <View style={{ ...styles.seperator, backgroundColor: Colors[colorScheme].seperator }} />
      <FlatList
        contentContainerStyle={{ paddingVertical: 20 }}
        data={state.limitCourses}
        keyExtractor={(course: TCourseInfo) => course.suupNo+"L"}
        renderItem={(course: ListRenderItemInfo<TCourseInfo>) => <CardView course={course.item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
});

export default LimitedScreen;

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
    marginTop: 15,
  },
});
