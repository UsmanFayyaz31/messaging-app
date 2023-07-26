export interface User {
  _id: string;
  username: string;
  profilePicture: string;
}

export interface Message {
  id: string;
  senderId: string;
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

export interface CreateMessageResponse {
  message: string;
  success: boolean;
}

export interface CreateMessagePayload {
  receiver: string;
  content: string;
}

export interface MessagesListResponse {
  message: string;
  success: boolean;
  response: Message[];
}

export interface Message {
  content: string;
  receiver: string;
  sender: string;
  timestamp: Date;
  _id: string;
}
