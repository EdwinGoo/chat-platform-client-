import axios from "axios";
import { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";
// import history from '../utils/history'
// axios instance
const instance = axios.create({
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

const AxiosInterceptor = ({ children }) => {
  const { accessToken, setAccessToken } = useUserStore();
  // console.log(`access  : ${accessToken}`);
  const requestInterceptor = instance.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  const responseInterceptor = instance.interceptors.response.use(
    (response) => {
      if (response.headers.bearer) {
        setAccessToken(response.headers.bearer);
      }
      return response;
    },
    (err) => {
      console.log(err.response.data);
      if (err.response.data.status === 401) {
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = "http://localhost:3000/login";
        alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
        // history.replace("/401"); // <-- navigate
      } else if (err.response.data.status === 403) {
        window.location.href = "http://localhost:3000/403";
      }
      return Promise.reject(err);
    }
  );

  useEffect(() => {
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [requestInterceptor, responseInterceptor]);
  return children;
};

export { AxiosInterceptor, instance };
