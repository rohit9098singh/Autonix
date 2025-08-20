"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Carslist = () => {
    const [search,setSearch]=useState("");
    const router=useRouter();
    const handleSearchSubmit=()=>{
        console.log("there will be an api call over here ")
    }
    return (
        <div className='space-y-4'>
            <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
                <Button onClick={()=>router.push("/admin/add-cars")}> <Plus className='h-4 w-8 sm:w-4' /> Add Car</Button>
                <form onSubmit={handleSearchSubmit} className='flex w-full sm:w-auto'>
                    <div className='relative flex-1'>
                        <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500'/>
                        <Input
                          className='pl-9 w-full sm:w-60'
                          value={search}
                          onChange={(e)=>setSearch(e.target.value)}
                          type='search.....'
                          placeholder='Search cars......'
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Carslist
