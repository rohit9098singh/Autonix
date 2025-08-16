// types/signup.ts
import { User } from "./user";

export interface SignupPayloadData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface SignupResponse {
  status: "success" | "error";
  message: string;
  data?: {
    email: string;
    name: string;
    role: "USER" | "ADMIN";
  };
}
