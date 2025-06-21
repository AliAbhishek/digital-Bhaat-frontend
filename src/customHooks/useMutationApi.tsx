import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api";


interface MutationApiParams {
  url: string;
  method: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export const useMutationApi = ({ url, method, onSuccess, onError }: MutationApiParams) => {
  return useMutation({
    mutationFn: async (payload: any) => {
      const response = await (axiosInstance as any)[method](url, payload);
      return response.data;
    },
    onSuccess,
    onError,
  });
};
