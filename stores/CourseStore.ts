import axios, { AxiosError, AxiosResponse } from "axios";
import { observable, action } from "mobx";
import { TCourseInfo } from "../types";

/*
interface Data {
  data1: string;
  data2: number;
  data3: boolean;
}

type Response = AxiosResponse<Data>; 
*/
export const CourseStore = observable({
  courses: [] as TCourseInfo[],
  limitCourses: [] as TCourseInfo[], //마감임박 수업 리스트

  fetchCourses: async (courseName: string) => {
    await axios
      .get(`http://13.125.207.10:3000/lectures?search=${courseName}`)
      .then(
        action((response: AxiosResponse) => {
          CourseStore.courses = response.data;
        })
      )
      .catch((error: AxiosError) => {
        console.log(error.response?.data);
      });
  },
  fetchLimitCourses: async () => {
    await axios
      .get(`http://13.125.207.10:3000/lectures/soon`)
      .then(
        action((response: AxiosResponse) => {
          CourseStore.limitCourses = response.data;
        })
      )
      .catch((error: AxiosError) => {
        console.log(error.response?.data);
      });
  },
});
