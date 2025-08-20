"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { updateUserProfile, changeUserPassword } from "@/services/auth-services";
import { 
  User, 
  Lock, 
  Mail, 
  Phone, 
  Camera, 
  Edit3, 
  Shield, 
  Save,
  Eye,
  EyeOff,
  UserCircle,
  AlertCircle
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { profileSchema, passwordSchema } from "./components/validation";

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

const ProfileSettings = () => {
  const { user, updateUser, isLoading: authLoading } = useAuth();
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Profile form
  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      imageUrl: "",
    },
  });

  // Password form
  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Update form when user data is loaded
  useEffect(() => {
    if (user) {
      profileForm.reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        imageUrl: user.imageUrl || "",
      });
    }
  }, [user, profileForm]);

  const onProfileSubmit = async (data: ProfileFormData) => {
    try {
      setIsProfileLoading(true);
      const response = await updateUserProfile(data);
      
      if (response.status === "success" && response.data) {
        updateUser(response.data);
        toast.success("Profile updated successfully!");
      } else {
        toast.error(response.message || "Failed to update profile");
      }
    } catch (error: any) {
      console.error("Profile update error:", error);
      const errorMessage = error?.response?.data?.message || 
                           error?.message || 
                           "Failed to update profile";
      toast.error(errorMessage);
    } finally {
      setIsProfileLoading(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    try {
      setIsPasswordLoading(true);
      const response = await changeUserPassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      
      if (response.status === "success") {
        passwordForm.reset();
        toast.success("Password changed successfully!");
      } else {
        toast.error(response.message || "Failed to change password");
      }
    } catch (error: any) {
      console.error("Password change error:", error);
      const errorMessage = error?.response?.data?.message || 
                           error?.message || 
                           "Failed to change password";
      toast.error(errorMessage);
    } finally {
      setIsPasswordLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <UserCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h2>
            <p className="text-gray-600 mb-4">Please login to access your profile settings.</p>
            <Button className="w-full">
              <Mail className="w-4 h-4 mr-2" />
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Restrict admin access to profile settings
  if (user.role === "ADMIN") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-16 w-16 text-orange-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Admin Access Restricted</h2>
            <p className="text-gray-600 mb-4">
              Profile settings are not available for admin accounts. Admin settings are managed separately.
            </p>
            <Badge variant="secondary" className="mb-4">
              <Shield className="w-3 h-3 mr-1" />
              {user.role} Account
            </Badge>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-20 w-20 border-2 border-gray-200">
              <AvatarImage src={user?.imageUrl || "/avatar.png"} alt="Profile" />
              <AvatarFallback className="bg-gray-100 text-gray-600 text-xl">
                {user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {user?.name}
              </h1>
              <p className="text-gray-600 mb-3">{user?.email}</p>
              <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                <Shield className="w-3 h-3 mr-1" />
                {user?.role}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Profile Information Card */}
          <Card className="shadow-sm border border-gray-200">
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Edit3 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal details and preferences
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                            <Input
                              {...field}
                              className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                              placeholder="Enter your full name"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                            <Input
                              {...field}
                              type="email"
                              className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                              placeholder="your.email@example.com"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Phone Number
                          <span className="text-gray-400 font-normal ml-1">(Optional)</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                            <Input
                              {...field}
                              type="tel"
                              className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Profile Image URL
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Camera className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                            <Input
                              {...field}
                              className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                              placeholder="https://example.com/your-photo.jpg"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={isProfileLoading}
                  >
                    {isProfileLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Updating Profile...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Save className="w-4 h-4" />
                        Update Profile
                      </div>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Change Password Card */}
          <Card className="shadow-sm border border-gray-200">
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-50 rounded-lg">
                  <Lock className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Security Settings</CardTitle>
                  <CardDescription>
                    Update your password to keep your account secure
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Current Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                            <Input
                              {...field}
                              type={showCurrentPassword ? "text" : "password"}
                              className="pl-10 pr-10 border-gray-200 focus:border-red-500 focus:ring-red-500"
                              placeholder="Enter current password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            >
                              {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          New Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                            <Input
                              {...field}
                              type={showNewPassword ? "text" : "password"}
                              className="pl-10 pr-10 border-gray-200 focus:border-green-500 focus:ring-green-500"
                              placeholder="Enter new password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            >
                              {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Confirm New Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                            <Input
                              {...field}
                              type={showConfirmPassword ? "text" : "password"}
                              className="pl-10 pr-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                              placeholder="Confirm new password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            >
                              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                    disabled={isPasswordLoading}
                  >
                    {isPasswordLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Changing Password...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Change Password
                      </div>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default ProfileSettings;
