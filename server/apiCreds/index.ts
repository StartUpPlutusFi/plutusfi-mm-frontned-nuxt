import API from "../api";
import { useAuthStore } from "./../../storage/auth/auth";
import { Exchange, CredentialForm } from "./types";

export const CreataApiCredentials = async (body: CredentialForm): Promise<any> => {
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

export const LoadExchanges = async (): Promise<Exchange[]> => {
  const auth = useAuthStore();

  const { data } = await API.get("/exchange/list", {
    headers: {
      Authorization: `Bearer ${auth.getAccess}`,
    },
  });
  return data;
};
