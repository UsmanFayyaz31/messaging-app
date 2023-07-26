export interface User {
  _id: number;
  username: string;
  profilePicture: string;
}

export interface Message {
  id: number;
  senderId: number;
  content: string;
}

export interface DynamicStyledProps {
  message: Message;
  selectedUser: User;
}

export interface GetFriendsResponse {
  message: string;
  success: boolean;
  response: User[];
}
