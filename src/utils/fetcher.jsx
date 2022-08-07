// import axios from "axios";
// import axiosInstance from "./axiosInstance";
// // import useAxiosInterceptor from "../hooks/useAxiosInterceptor";
import { instance } from "./Axios";

const fetcher = (url) =>
  instance
    .get(url, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data.body;
    });

export default fetcher;
