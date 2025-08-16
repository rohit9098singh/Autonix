"use client"
// import { AuthModalProvider } from "@/context/AuthModalContext";
import { AuthProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import NextTopLoader from "nextjs-toploader";
import { ModalProvider } from "@/context/modal-context";

export const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: 0,
                refetchOnReconnect: false,
            },
        },
    });
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ModalProvider>
                    {/* <AuthModalProvider> */}
                        <NextTopLoader showSpinner={false} color="#0CAF60" />
                        {children}
                    {/* </AuthModalProvider> */}
                </ModalProvider>
            </AuthProvider>
        </QueryClientProvider>
    )
}
