export type UserResponseType = {
  email: string | undefined;
  username: string | undefined;
  createdAt: Date;
  id: string;
  token: string;
  profilePicture: undefined | string;
};

export interface UserData {
  id?: string;
  username?: string;
  profilePicture?: string;
}
