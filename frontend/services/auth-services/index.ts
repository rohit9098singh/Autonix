import { apiEndPoints } from "@/constant/api";
import { 
  LoginPayloadData, 
  LoginResponse, 
  SignupPayloadData, 
  SignupResponse,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
  CheckAuthResponse,
  UpdateProfilePayload,
  UpdateProfileResponse,
  ChangePasswordPayload,
  ChangePasswordResponse
} from "@/types/auth";
import { unauthenticatedInstance, authenticatedInstance } from "@/utils/axios";

// Signup Service
export const signupUser = async (data: SignupPayloadData): Promise<SignupResponse> => {
  try {
    const response = await unauthenticatedInstance.post(apiEndPoints.signup, data);
    return response.data;
  } catch (error: any) {
    console.error("Signup service error", {
      message: error?.message,
      response: error?.response?.data,
      status: error?.response?.status,
    });
    throw error;
  }
};

// Login Service
export const loginUser = async (data: LoginPayloadData): Promise<LoginResponse> => {
  try {
    const response = await unauthenticatedInstance.post(apiEndPoints.login, data);
    if (response?.data?.status === "success" && response?.data?.data) {
      const { accessToken, refreshToken } = response.data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    }
    
    return response.data;
  } catch (error: any) {
    console.error("Login service error", {
      message: error?.message,
      response: error?.response?.data,
      status: error?.response?.status,
    });
    throw error;
  }
};

// Forgot Password Service
export const forgotPassword = async (data: ForgotPasswordPayload): Promise<ForgotPasswordResponse> => {
  try {
    const response = await unauthenticatedInstance.post(apiEndPoints.forgetPassword, data);
    return response.data;
  } catch (error: any) {
    console.error("Forgot password service error", {
      message: error?.message,
      response: error?.response?.data,
      status: error?.response?.status,
    });
    throw error;
  }
};

// Reset Password Service
export const resetPassword = async (token: string, data: ResetPasswordPayload): Promise<ResetPasswordResponse> => {
  try {
    const response = await unauthenticatedInstance.post(apiEndPoints.resetPassword(token), data);
    return response.data;
  } catch (error: any) {
    console.error("Reset password service error", {
      message: error?.message,
      response: error?.response?.data,
      status: error?.response?.status,
    });
    throw error;
  }
};

// Check Auth Service (for getting user profile)
export const checkAuth = async (): Promise<CheckAuthResponse> => {
  try {
    const response = await authenticatedInstance.get(apiEndPoints.getUserProfile);
    return response.data;
  } catch (error: any) {
    console.error("Check auth service error", {
      message: error?.message,
      response: error?.response?.data,
      status: error?.response?.status,
    });
    throw error;
  }
};

// Logout Service
export const logoutUser = async (): Promise<void> => {
  try {
    await authenticatedInstance.post(apiEndPoints.logout);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  } catch (error: any) {
    console.error("Logout service error", {
      message: error?.message,
      response: error?.response?.data,
      status: error?.response?.status,
    });
    // Even if logout fails on server, clear local tokens
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    throw error;
  }
};

// Update Profile Service
export const updateUserProfile = async (data: UpdateProfilePayload): Promise<UpdateProfileResponse> => {
  try {
    const response = await authenticatedInstance.put(apiEndPoints.updateProfile, data);
    return response.data;
  } catch (error: any) {
    console.error("Update profile service error", {
      message: error?.message,
      response: error?.response?.data,
      status: error?.response?.status,
    });
    throw error;
  }
};

// Change Password Service
export const changeUserPassword = async (data: ChangePasswordPayload): Promise<ChangePasswordResponse> => {
  try {
    const response = await authenticatedInstance.put(apiEndPoints.changePassword, data);
    return response.data;
  } catch (error: any) {
    console.error("Change password service error", {
      message: error?.message,
      response: error?.response?.data,
      status: error?.response?.status,
    });
    throw error;
  }
};