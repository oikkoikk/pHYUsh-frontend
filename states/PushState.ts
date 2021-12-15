import axios from "axios";
import { atom, selectorFamily } from "recoil";
import { TCourseInfo } from "../types";

export const subscribedPushState = atom<TCourseInfo[]>({
  key: "subscribedPush",
  default: [],
});

export const pushSettingState = atom<boolean>({
  key: "pushSettingState",
  default: true
})

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
