export interface SignUpResponse {
  message: string;
  success: boolean;
  response: {
    email: string;
    username: string;
    createdAt: string;
    id: string;
    token: string;
  };
}

export interface SignUpFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePicture: File | null;
}
