"use client "
import { useAuth } from "@/context/AuthContext";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/services/auth-services";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
const DropDown = () => {
    const { user,logout } = useAuth()
    const handleLogout = async () => {
        try {
          await logoutUser(); // Call the API
          logout();
          toast.success("Logged out successfully");
        } catch (error) {
          console.error("Logout error:", error);
          logout();
          toast.success("Logged out successfully");
        }
      }
    
      const handleProfileRedirect = () => {
        router.push("/profile")
      }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer h-10 w-10">
                    <AvatarImage src={user?.imageUrl || "/avatar.png"} alt="user avatar" />
                    <AvatarFallback>
                        {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-58">
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
                            <div className="text-xs text-muted-foreground flex-wrap">{user?.email || ""}</div>
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
    )
}

export default DropDown
