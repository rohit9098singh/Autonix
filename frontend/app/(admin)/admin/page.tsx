"use client"
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import React, {  useEffect } from 'react'

const AdminPage = () => {
    const { isAdmin, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!isAdmin) {
                router.replace('/');
            }
        }
    }, [isAdmin, isLoading, router]);

    if (!isAdmin) {
        return null;
    }

    return (
        <div className='min-h-screen '>
                 dash board the main page of the app 
        </div>
    )
}

export default AdminPage
