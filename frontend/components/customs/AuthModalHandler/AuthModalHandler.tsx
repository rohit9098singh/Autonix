"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useModal } from "@/context/modal-context";
import AuthTabs from "@/components/screens/auth/AuthTabs";

const AuthModalHandler = () => {
  const searchParams = useSearchParams();
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    const showLogin = searchParams.get('showLogin');
    
    if (showLogin === 'true') {
      // Open the login modal automatically
      openModal(<AuthTabs initialTab="login" onSuccess={closeModal} />);
      
      // Clean up the URL parameter after opening the modal
      const url = new URL(window.location.href);
      url.searchParams.delete('showLogin');
      window.history.replaceState({}, '', url.toString());
    }
  }, [searchParams, openModal, closeModal]);

  // This component doesn't render anything visible
  return null;
};

export default AuthModalHandler;
