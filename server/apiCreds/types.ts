export type Exchange = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};


export type CredentialForm = {
    api_key: string;
    api_secret: string;
    exchange: number;
    description?: string;
    default: boolean;
  };