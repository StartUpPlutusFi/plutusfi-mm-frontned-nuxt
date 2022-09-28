import { AxiosError } from "axios";
import { createToast } from "mosha-vue-toastify";
import { AuthCredentials } from "~~/storage/auth/interfaces";

import API from "../api";

export interface Credentials {
  username: string;
  password: string;
}
export const LoginAPI = async (
  credentiais: FormData
): Promise<AuthCredentials | null> => {
  const { data } = await API.post("/auth/api/token/login/", credentiais).catch(
    (error: AxiosError) => {
      let { detail }: string = error.response.data;
      createToast(detail, {
        position: "top-center",
        type: "danger",
      });
    }
  );

  return data;
};
