import useSWR from "swr";
import { SwrFetch } from "./SwrFetch";

export const SwrGetData = (apiUrl) => {
  const { data, error } = useSWR(apiUrl, SwrFetch);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};
