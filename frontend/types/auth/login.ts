export interface LoginPayloadData {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: "success" | "error";
  message: string;
  data?: {
    accessToken: string;     
    refreshToken: string;     
    role: "USER" | "ADMIN";
    name: string;
    email: string;
    _id: string;
    phone?: string;
    imageUrl?: string;
  };
}