import { createToast } from "mosha-vue-toastify";
import { AxiosError, AxiosRequestConfig } from "axios";
import { ProfileInfo } from "./../../storage/profile/interfaces";
import { useAuthStore } from "~~/storage/auth/auth";
import API from "../api";

export const GetProfileInfo = async (): Promise<ProfileInfo | null> => {
  const auth = useAuthStore();

  const options: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${auth.getAccess}`,
    },
  };
  const { data } = await API.get("/auth/api/token/profile/", options).catch(
    (error: AxiosError) => {
      createToast(error, {
        type: "danger",
      });
    }
  );

  return data;
};

export const UpdatedProfile = async (
  body: FormData
): Promise<ProfileInfo | null> => {
  const auth = useAuthStore();

  const options: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${auth.getAccess}`,
    },
  };
  const { data } = await API.put(
    "/auth/api/token/profile/update/",
    body,
    options
  ).catch((error: AxiosError) => {
    createToast(error.response.data, { type: "danger" });
  });

  return data;
};
