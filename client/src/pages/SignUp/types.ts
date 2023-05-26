export interface SignUpRequestPayload {
  email: string;
  password: string;
  username: string;
}

export interface SignUpResponse {
  message: string;
  success: boolean;
  response: {
    email: string;
    username: string;
    createdAt: string;
    id: string;
  };
  token: string;
}

export interface SignupFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
