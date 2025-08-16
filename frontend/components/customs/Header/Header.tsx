"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CarFront, Heart, Layout } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AuthTabs from "@/components/screens/auth/AuthTabs";
import { useModal } from "@/context/modal-context";
import { useAuth } from "@/context/AuthContext";
import { logoutUser } from "@/services/auth-services";
import { toast } from "sonner";

const Header = ({ isAdminPage }: { isAdminPage?: boolean }) => {
  const { openModal, closeModal } = useModal();
  const { user, isLoggedIn, isAdmin, logout } = useAuth();
  const pathname = usePathname();
  const router=useRouter();
  
  // Auto-detect admin page if not explicitly provided
  const isOnAdminPage = isAdminPage ?? pathname?.startsWith('/admin');

  const handleLoginClick = () => {
    openModal(<AuthTabs initialTab="login" onSuccess={closeModal} />);
  }

  // const handleSignupClick = () => {
  //   openModal(<AuthTabs initialTab="signup" onSuccess={closeModal} />);
  // }

  const handleLogout = async () => {
    try {
      await logoutUser(); // Call the API
      logout();
      toast.success("Logged out successfully");
    } catch (error: any) {
      console.error("Logout error:", error);
      logout();
      toast.success("Logged out successfully");
    }
  }

  const handleProfileRedirect=()=>{
     router.push("/profile")
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
            <Link href={"/"}>
              <Button>
                <ArrowLeft size={18} />
                <span>Back to App</span>
              </Button>
            </Link>
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

              {/* Avatar Dropdown using shadcn */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer h-10 w-10">
                    <AvatarImage src={user?.imageUrl || "/avatar.png"} alt="user avatar" />
                    <AvatarFallback>
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex gap-2">
                      <Avatar className="cursor-pointer">
                        <AvatarImage src={user?.imageUrl || "/avatar.png"} alt="user avatar" />
                        <AvatarFallback>
                          {user?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user?.name || "User"}</div>
                        <div className="text-xs text-muted-foreground">{user?.email || ""}</div>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} >
                    Sign Out
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleProfileRedirect} >
                    profile
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleLoginClick}>
                <span>Login</span>
              </Button>
              {/* <Button onClick={handleSignupClick}>
                <span>Sign Up</span>
              </Button> */}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
