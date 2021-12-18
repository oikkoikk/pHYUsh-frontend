import { atom, selector, selectorFamily } from "recoil";
import { TCourseInfo } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const subscribedPushState = atom<TCourseInfo[]>({
  key: "subscribedPush",
  default: [],
});

export const pushSettingState = atom<boolean>({
  key: "pushSettingState",
  default: true,
});

export const checkSubscription = selectorFamily({
  key: "checkSubscription",
  get:
    (suupNo: string) =>
    ({ get }) => {
      const pushState = get(subscribedPushState);

      if (
        pushState.find((course: TCourseInfo) => {
          return course.suupNo === suupNo;
        })
      ) {
        return true;
      } else {
        return false;
      }
    },
});

export const updatePushState = selector({
  key: "updatePushState",
  get: ({ get }) => {
    const pushState = get(subscribedPushState);
    //pushState가 변경될 때마다, 일단 AsyncStorage에 저장
    const stringified = JSON.stringify(pushState);
    AsyncStorage.setItem("@pushState", stringified);
    return;
  },
});

export const updatePushSettingState = selector({
  key: "updatePushSettingState",
  get: ({ get }) => {
    const SettingState = get(pushSettingState);
    //pushSettingState가 변경될 때마다, 일단 AsyncStorage에 저장
    const stringified = JSON.stringify(SettingState);
    AsyncStorage.setItem("@pushSettingState", stringified);
    return;
  },
});
