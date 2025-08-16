import Header from '@/components/customs/Header/Header'
import React from 'react'
import Sidebar from './Sidebar/Sidebar'

const layout = () => {
  return (
    <div className='h-full'>
        <Header isAdminPage={true}/>
        <div>
             <Sidebar/>
        </div>
    </div>
  )
}

export default layout
