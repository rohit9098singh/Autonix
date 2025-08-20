import React, { ReactNode } from 'react'
import Sidebar from '@/components/customs/Sidebar/AdminSidebar'
import Header from '@/components/customs/Header/Header'

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='min-h-screen'>
            <Header />
            <div className="flex h-full w-56 flex-col mt-18 fixed inset-y-0 z-50">
                <Sidebar />
            </div>
            <main className='md:pl-56 pt-[70px] h-full'>
                {children}
            </main>
        </div>
    )
}

export default layout
