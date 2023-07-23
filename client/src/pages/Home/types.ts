export interface User {
  id: number;
  name: string;
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
