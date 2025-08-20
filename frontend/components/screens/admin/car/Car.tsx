import React from 'react'
import Carslist from "./components/Carslist"

const Car = () => {
    return (
        <div className='p-6 '>
            <h1 className='text-2xl font-bold mb-6'>Cars Management</h1>
            <Carslist />
        </div>
    )
}

export default Car
