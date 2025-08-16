// User interface based on UserModal.js schema
export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string; // Optional for security - not always included in responses
  imageUrl?: string;
  resetPasswordExpires?: Date | null;
  resetPasswordToken?: string | null;
  phone?: string;
  role: "USER" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
}