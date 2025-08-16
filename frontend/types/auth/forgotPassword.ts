export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordResponse {
  status: "success" | "error";
  message: string;
  data?: {
    resetToken?: string;
    resetUrl?: string; 
    expiresAt?: string; 
  };
}

export interface ResetPasswordPayload {
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordResponse {
  status: "success" | "error";
  message: string;
  data?: null;
}