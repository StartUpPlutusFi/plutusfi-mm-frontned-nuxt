import API from "../api";
import { ApiDetail, CredentialForm, Exchange } from "./types";
import {useAuthStore} from "~/storage/auth/auth";

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

export const LoadExchangeList = async (): Promise<Exchange[]> => {
  const auth = useAuthStore();

  const { data } = await API.get("/exchange/list", {
    headers: {
      Authorization: `Bearer ${auth.getAccess}`,
    },
  });

  return data
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

export const DeleteApiCredential = async (id: number): Promise<boolean> => {
  const auth = useAuthStore();

  const response = await API.delete(`/apikey/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${auth.getAccess}`,
    },
  });

  return response.status === 200;
};
