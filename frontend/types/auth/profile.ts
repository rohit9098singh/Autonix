export interface UpdateProfilePayload {
  name?: string;
  email?: string;
  phone?: string;
  imageUrl?: string;
}

export interface UpdateProfileResponse {
  status: "success" | "error";
  message: string;
  data?: {
    name: string;
    email: string;
    phone?: string;
    imageUrl?: string;
    role: "USER" | "ADMIN";
    _id: string;
  };
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  status: "success" | "error";
  message: string;
}
