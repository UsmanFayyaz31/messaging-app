export interface LogInRequestPayload {
  email: string;
  password: string;
}

export interface LogInResponse {
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

export interface LogInFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
