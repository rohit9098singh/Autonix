"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import LoginForm from "./login/components/Form";
import { SignupForm } from "./signup/component/Form";

type AuthTabsProps = {
  initialTab?: "login" | "signup";
  onSuccess?: () => void;
};

export function AuthTabs({ initialTab = "login", onSuccess }: AuthTabsProps) {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleSwitchToSignup = () => {
    setActiveTab("signup");
  };

  const handleSwitchToLogin = () => {
    setActiveTab("login");
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md ">
      <Tabs defaultValue={initialTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm onSuccess={onSuccess} onSwitchToSignup={handleSwitchToSignup} />
        </TabsContent>
        <TabsContent value="signup">
          <SignupForm onSuccess={onSuccess} onSwitchToLogin={handleSwitchToLogin} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AuthTabs;
