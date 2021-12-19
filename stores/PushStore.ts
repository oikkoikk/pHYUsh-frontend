import { observable, action } from "mobx";
import { TCourseInfo } from "../types";

export const PushStore = observable({
  subscribedPushList: [] as TCourseInfo[],
  pushAgree: true as boolean,

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
});
