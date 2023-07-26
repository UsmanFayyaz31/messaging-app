import { ObjectId } from "mongodb";

export interface MessagesData {
  id?: string;
  content: string;
  sender: ObjectId;
  receiver: ObjectId;
  timestamp: Date;
}
