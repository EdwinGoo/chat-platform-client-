// import axios from "axios";
import axiosInstance from "./axiosInstance";

const fetcher = (url) =>
  axiosInstance
    .get(url, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data.body;
    });

export default fetcher;
