import { observable, action } from "mobx";
import { TCourseInfo } from "../types";
import * as Notifications from "expo-notifications";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

export const PushStore = observable({
  subscribedPushList: [] as TCourseInfo[],
  pushAgree: true as boolean,
  pushToken: "" as string,

  checkSubscription: action((suupNo: string) => {
    if (
      PushStore.subscribedPushList.find((course: TCourseInfo) => {
        return course.suupNo === suupNo;
      })
    ) {
      return true;
    } else {
      return false;
    }
  }),

  setSubscribedPushList: action((courses: TCourseInfo[]) => {
    PushStore.subscribedPushList = courses;
  }),

  setPushAgree: action((bool: boolean) => {
    PushStore.pushAgree = bool;
  }),
  requestPushPermission: action(async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      Toast.show({
        type: "custom",
        text1: "잠시만요! 👋",
        text2: "권한에 동의하지 않아 푸시 알림을 받을 수 없어요!",
      });
      PushStore.pushAgree = false;
    } else PushStore.pushAgree = true;
  }),
  registerForPushNotificationsAsync: action(async () => {
    let token: string = "";

    await PushStore.requestPushPermission();
    token = (await Notifications.getExpoPushTokenAsync()).data;
    await AsyncStorage.setItem("@pushToken", JSON.stringify(token));
    PushStore.pushToken = token;
    
    alert(token);
    console.log(token);

    if (Platform.OS === "android") {
      Notifications.deleteNotificationChannelAsync("expo_notifications_fallback_notification_channel");
      Notifications.setNotificationChannelAsync("default", {
        name: "빈자리 알림",
        importance: Notifications.AndroidImportance.MAX,
      });
    }

    return token;
  }),
});
