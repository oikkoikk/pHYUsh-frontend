import axios from "axios";
import { atom } from "recoil";
import { TCourseInfo } from "../types";

/*
interface Data {
  data1: string;
  data2: number;
  data3: boolean;
}

type Response = AxiosResponse<Data>; 
*/

export const CourseState = atom<TCourseInfo[]>({
  key: "Courses",
  default: [],
});

export const fetchCourses = async(courseName: string) => {
  try {
    let response = await axios.post(
      "https://portal.hanyang.ac.kr/sugang/SgscAct/findSuupSearchSugangSiganpyo.do?pgmId=P310278&menuId=M006631&tk=e9068598524e004a4af6d96d34410fa56705e76bb2f7fc2df35729471b0f3b45",
      {
        skipRows: "0",
        maxRows: "2000",
        strLocaleGb: "ko",
        strIsSugangSys: "true",
        strDetailGb: "0",
        notAppendQrys: "true",
        strSuupOprGb: "0",
        strJojik: "H0002256",
        strSuupYear: "2021",
        strSuupTerm: "25",
        strIsuGrade: "",
        strTsGangjwa: "",
        strTsGangjwaAll: "0",
        strIlbanCommonGb: "",
        strIsuGbCd: "",
        strHaksuNo: "",
        strChgGwamok: "",
        strGwamok: courseName,
        strDaehak: "",
        strHakgwa: "",
        strYeongyeok: "",
      },
      {
        headers: {
          "content-type": "application/json+sua; charset=UTF-8",
        },
      }
    );
    let data = response.data;
    let courses: TCourseInfo[] = data.DS_SUUPGS03TTM01[0].list;
    return courses;
  } catch (error) {
    throw error;
  }
};
