import API from "../api";
import { useAuthStore } from "./../../storage/auth/auth";
import { ApiDetail, CredentialForm } from "./types";

export const CreataApiCredentials = async (
  body: CredentialForm
): Promise<any> => {
  const auth = useAuthStore();

  const { data } = await API.post("apikey/add", body, {
    headers: {
      Authorization: `Bearer ${auth.getAccess}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return data;
};

export const LoadApiCredentialList = async (): Promise<ApiDetail[]> => {
  const auth = useAuthStore();

  const { data } = await API.get("/apikey/list", {
    headers: {
      Authorization: `Bearer ${auth.getAccess}`,
    },
  });
  return data;
};
