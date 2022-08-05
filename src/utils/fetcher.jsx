// import axios from "axios";
import axiosInstance from "./axiosInstance"; // 해당 import 위치는 axiosConfig.js 파일 위치에 따라 다르다/

const fetcher = (url) =>
  axiosInstance
    .get(url, {
      withCredentials: true,
    })
    .then((response) => response.data);

export default fetcher;
