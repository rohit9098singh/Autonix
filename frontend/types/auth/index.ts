// Export all auth-related types
export * from './login';
export * from './signup';
export * from './forgotPassword';
export * from './user';
export * from './profile';

// Common auth types
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenPayload {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  status: "success" | "error";
  message: string;
  data?: {
    accessToken: string;   
    refreshToken?: string;  
  };
}

export interface CheckAuthResponse {
  status: "success" | "error";
  message: string;
  data?: {
    user: {
      _id: string;
      name: string;
      email: string;
      role: "USER" | "ADMIN";
      phone?: string;
      imageUrl?: string;
    };
  };
}
