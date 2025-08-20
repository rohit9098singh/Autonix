
import { CarHOC } from '@/components/screens/admin/car/CarHOC'
import React from 'react'

export const metadata={
  title:"Cars | vehiql Admin",
  description:"Manage cars in your marketplace"
}
const page = () => {
  return (
     <CarHOC/>
  )
}

export default page
