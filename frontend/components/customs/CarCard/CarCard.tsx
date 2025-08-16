"use client"

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CarIcon, Heart } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface Car {
    id: number
    make: string
    model: string
    year: number
    price: number
    images: string[]
    transmission: string
    fuelType: string
    bodyType: string
    mileage: number
    color: string
    wishlisted: boolean
}

interface CarCardProps {
    car: Car
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
    const [isSaved, setIsSaved] = useState(false)

    const router = useRouter()

    const handleToggleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setIsSaved(prev => !prev)
        console.log("Toggled Saved:", !isSaved)
    }

    return (
        <Card className="overflow-hidden hover:shadow-lg transition group py-0">
            {/* Image Section */}
            <div className="relative h-48">
                {car.images?.length > 0 ? (
                    <div className="relative w-full h-full">
                        <Image
                            src={car.images[0]}
                            alt={`${car.make} ${car.model}`}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-300"
                            style={{ zIndex: 0 }}
                        />
                    </div>
                ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <CarIcon className="h-12 w-12 text-gray-400" />
                    </div>
                )}

                {/* Wishlist Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleToggleSave}
                    className={`absolute top-2 right-2 z-10 bg-white/90 rounded-full p-1.5 ${isSaved
                            ? 'text-red-500 hover:text-red-600'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    <Heart className={isSaved ? 'fill-current' : ''} size={20} />
                </Button>
            </div>

            {/* Car Details Section */}
            <CardContent className="p-4">
                {/* Title & Price */}
                <div className="flex flex-col mb-2">
                    <h3 className="text-lg font-bold line-clamp-1">
                        {car.make} {car.model}
                    </h3>
                    <span className="text-xl font-bold text-blue-600">
                        ${car.price.toLocaleString()}
                    </span>
                </div>

                {/* Year, Transmission, Fuel */}
                <div className="text-gray-600 mb-2 flex items-center gap-1">
                    <span>{car.year}</span>
                    <span>•</span>
                    <span>{car.transmission}</span>
                    <span>•</span>
                    <span>{car.fuelType}</span>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1 mb-4">
                    <Badge variant="outline" className="bg-gray-50">
                        {car.bodyType}
                    </Badge>
                    <Badge variant="outline" className="bg-gray-50">
                        {car.mileage.toLocaleString()} km
                    </Badge>
                    <Badge variant="outline" className="bg-gray-50">
                        {car.color}
                    </Badge>
                </div>

                {/* CTA Button */}

                <Button className="w-full" onClick={() => router.push(`/cars/${car.id}`)}>View Car</Button>
            </CardContent>
        </Card>
    )
}

export default CarCard
