import { createToast } from "mosha-vue-toastify";
import { AxiosError } from "axios";
import { ProfileInfo } from "./../../storage/profile/interfaces";
import { useAuthStore } from "~~/storage/auth/auth";
import API from "../api";

export const GetProfileInfo = async (): Promise<ProfileInfo | null> => {
  const auth = useAuthStore();
  
  const { data } = await API.get("/auth/api/token/profile/", {
    headers: {
      Authorization: `Bearer ${auth.getAccess}`,
    },
  }).catch((error: AxiosError) => {
    createToast(error, {
      type: "danger",
    });
    }
  );

  return data;
};
