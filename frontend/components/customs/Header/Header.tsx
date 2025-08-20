"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CarFront, Heart, Layout } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useModal } from "@/context/modal-context";
import { useAuth } from "@/context/AuthContext";
import DropDown from "./components/DropDown"
import AuthTabs from "@/components/screens/user/auth/AuthTabs";

const Header = () => {
  const { openModal, closeModal } = useModal();
  const {  isLoggedIn, isAdmin } = useAuth();
  const pathname = usePathname();

  // Auto-detect admin page if not explicitly provided
  const isOnAdminPage = (pathname?.startsWith('/admin') && isAdmin);

  const handleLoginClick = () => {
    openModal(<AuthTabs initialTab="login" onSuccess={closeModal} />);
  }

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b z-50">
      <nav className="mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href={isOnAdminPage ? "/admin" : "/"} className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="logo"
            width={200}
            height={60}
            className="w-30 sm:w-34 md:w-40 h-auto object-contain"
          />
          {isOnAdminPage && (
            <span className="text-xs font-extralight">admin</span>
          )}
        </Link>

        <div className="flex items-center gap-4">
          {isOnAdminPage ? (
            <div className="flex gap-4 items-center">

              <Link href={"/"}>
                <Button>
                  <ArrowLeft size={18} />
                  <span>Back to App</span>
                </Button>
              </Link>
              <DropDown/>
            </div>
          ) : isLoggedIn ? (
            <>
              <Link href={"/saved-cars"}>
                <Button className="cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Heart size={18} />
                  <span className="hidden md:inline">Saved Cars</span>
                </Button>
              </Link>

              {!isAdmin ? (
                <Link href={"/reservations"}>
                  <Button variant={"outline"} className="cursor-pointer ">
                    <CarFront size={18} />
                    <span className="hidden md:inline">My Reservations</span>
                  </Button>
                </Link>
              ) : (
                <Link href={"/admin"}>
                  <Button variant={"outline"}>
                    <Layout size={18} />
                    <span className="hidden md:inline">Admin Portal</span>
                  </Button>
                </Link>
              )}
               <DropDown/>
            </>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleLoginClick}>
                <span>Login</span>
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;