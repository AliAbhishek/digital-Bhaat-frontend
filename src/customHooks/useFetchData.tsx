// src/hooks/useQueryApi.ts
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api";


type QueryApiParams<T> = {
  key: string | any[];         // unique query key
  url: string;                 // endpoint
  enabled?: boolean;           // optional
  select?: (data: any) => T;   // optional transformation
};

export const useQueryApi = <T = any>({
  key,
  url,
  enabled = true,
  select,
}: QueryApiParams<T>) => {
  return useQuery({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: async () => {
      const response = await axiosInstance.get(url);
      return response.data;
    },
    enabled,
    select,
  });
};
