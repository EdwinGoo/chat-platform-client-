// axiosConfig.js
import Axios from "axios";
import history from "./history";

const axiosInstance = Axios.create({
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(config);
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
axiosInstance.interceptors.response.use(
  (config) => {
    console.log(config.data);
    return config;
  },
  (err) => {
    console.log(err.response.data);
    if (err.response.data.status === 401) {
      sessionStorage.clear();
      history.replace("/401"); // <-- navigate
    }
    return Promise.reject(err);
  }
);
export default axiosInstance;
