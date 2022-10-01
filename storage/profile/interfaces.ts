export interface UserInformation {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}
export interface ProfileInfo {
  id: number;
  user: UserInformation;
  picture: string;
}
