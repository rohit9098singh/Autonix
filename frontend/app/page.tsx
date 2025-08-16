import CarCard from "@/components/customs/CarCard/CarCard";
import HomeSearch from "@/components/customs/HomeSearch/HomeSearch";
import AuthModalHandler from "@/components/customs/AuthModalHandler/AuthModalHandler";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { bodyTypes, carMakes, faqItems, featuredCars } from "@/lib/data";
import { Calendar, Car, ChevronRight, Shield, Star, TrendingUp, Users, Search, Zap, Award } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  const isLoggedIn = false;
  return (
    <div className="pt-18 flex flex-col overflow-hidden">
      {/* Handle automatic login modal opening */}
      <Suspense fallback={null}>
        <AuthModalHandler />
      </Suspense>
      
      {/* Hero Section - Enhanced with animations and better visuals */}
      <section className="relative py-20 md:py-32 dotted-background overflow-hidden ">
        {/* Floating elements for visual interest */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-green-500/10 rounded-full blur-xl animate-pulse delay-75"></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-150"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10 px-4">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 animate-fadeInUp">
            <Zap className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-sm text-white font-medium">AI-Powered Car Discovery</span>
          </div>
          
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6 gradient-title leading-tight animate-fadeInUp delay-100">
              Find Your Dream Car 
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                With Vehiql AI
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed animate-fadeInUp delay-200">
              Experience the future of car shopping with advanced AI search, instant test drive booking, and thousands of verified vehicles
            </p>
          </div>
          
          {/* Enhanced Search Component */}
          <div className="animate-fadeInUp delay-300">
            <HomeSearch />
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-fadeInUp delay-400">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-sm text-blue-200">Verified Cars</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">25K+</div>
              <div className="text-sm text-blue-200">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-sm text-blue-200">Trusted Dealers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-sm text-blue-200">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Cars Section - Enhanced with better animations */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">Premium Collection</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Cars</h2>
              <p className="text-gray-600 mt-2">Handpicked vehicles from our premium inventory</p>
            </div>
            <Button 
              variant="secondary" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              asChild
            >
              <Link href="/cars" className="flex items-center">
                View All Cars <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car, index) => (
              <div 
                key={car.id} 
                className="transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CarCard car={car} />
              </div>
            ))}
          </div>

          {/* Trust indicators */}
          <div className="mt-16 text-center">
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Verified Listings</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-500" />
                <span>Quality Assured</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-500" />
                <span>Best Prices</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Browse By Make Section - Enhanced with hover effects */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Browse By Make</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover vehicles from the world's most trusted automotive brands</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {carMakes.map((make, index) => (
              <Link
                key={make.name}
                href={`/cars?make=${make.name}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl p-6 text-center transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-blue-200"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-16 w-auto mx-auto mb-4 relative overflow-hidden">
                  <Image
                    src={make.image}
                    alt={make.name}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{make.name}</h3>
                <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 mx-auto mt-2"></div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white transition-all duration-300"
              asChild
            >
              <Link href="/cars" className="flex items-center">
                Explore All Brands <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      {/* Why Choose Us Section - Enhanced with modern design */}
      <section className="py-20 md:py-24 bg-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-x-20 -translate-y-20"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-gradient-to-br from-green-100 to-blue-100 rounded-full translate-x-30 translate-y-30"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
              <Users className="w-4 h-4 mr-2" />
              Why Choose Vehiql
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Trusted Car Shopping Partner
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We revolutionize the car buying experience with cutting-edge technology and unmatched service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group text-center p-8 rounded-2xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Car className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Wide Selection</h3>
              <p className="text-gray-600 leading-relaxed">
                Thousands of verified vehicles from trusted dealerships and private sellers, all in one place
              </p>
              <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 group-hover:w-20 transition-all duration-300"></div>
            </div>
            
            <div className="group text-center p-8 rounded-2xl hover:bg-gradient-to-br hover:from-green-50 hover:to-blue-50 transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-green-500 to-blue-600 text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Calendar className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Easy Test Drive</h3>
              <p className="text-gray-600 leading-relaxed">
                Book a test drive online in minutes with flexible scheduling options that fit your busy lifestyle
              </p>
              <div className="w-12 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mt-4 group-hover:w-20 transition-all duration-300"></div>
            </div>
            
            <div className="group text-center p-8 rounded-2xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Shield className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Secure Process</h3>
              <p className="text-gray-600 leading-relaxed">
                Verified listings and secure booking process for complete peace of mind throughout your journey
              </p>
              <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 group-hover:w-20 transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </section>
      {/* Browse By Body Type Section - Enhanced with stunning visuals */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-75"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Browse By Body Type</h2>
            <p className="text-blue-200 max-w-2xl mx-auto">Find the perfect vehicle style that matches your lifestyle and preferences</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bodyTypes.map((type, index) => (
              <Link
                key={type.name}
                href={`/cars?bodyType=${type.name}`}
                className="group relative cursor-pointer transform hover:scale-105 transition-all duration-500"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden rounded-2xl h-64 shadow-2xl">
                  <Image
                    src={type.image}
                    alt={type.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-300"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="text-white text-2xl font-bold mb-2 transform group-hover:translate-y-[-4px] transition-transform duration-300">
                      {type.name}
                    </h3>
                    <div className="flex items-center text-blue-300">
                      <span className="text-sm">Explore {type.name}s</span>
                      <ChevronRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                  
                  {/* Hover effect border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 rounded-2xl transition-all duration-300"></div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 transition-all duration-300 backdrop-blur-sm"
              asChild
            >
              <Link href="/cars" className="flex items-center">
                View All Body Types <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      {/* FAQ Section - Enhanced with modern styling */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
              <Search className="w-4 h-4 mr-2" />
              Got Questions?
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Everything you need to know about finding and buying your perfect car</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300"
              >
                <AccordionTrigger className="px-6 py-4 text-left font-semibold text-lg hover:bg-gray-50 transition-all rounded-t-xl group">
                  <span className="group-hover:text-blue-600 transition-colors">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-700 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white">
              Contact Support
            </Button>
          </div>
        </div>
      </section>
      {/* Call to Action Section - Enhanced with stunning design */}
      <section className="py-20 md:py-24 dotted-background text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-2xl animate-pulse delay-75"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-150"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Star className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-sm font-medium">Start Your Journey Today</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Ready To Find Your 
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Dream Car?
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who found their perfect vehicle through our platform. 
              Your dream car is just a click away!
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 px-8 py-4 text-lg font-semibold" 
                asChild
              >
                <Link href="/cars" className="flex items-center">
                  <Car className="w-5 h-5 mr-2" />
                  Browse All Cars
                </Link>
              </Button>

              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm transition-all duration-300 px-8 py-4 text-lg font-semibold" 
                asChild
              >
                <Link href="/sign-in" className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Get Started
                </Link>
              </Button>
            </div>

            {/* Social proof */}
            <div className="mt-16 pt-8 border-t border-white/20">
              <p className="text-blue-200 text-sm mb-4">Trusted by over 25,000+ happy customers</p>
              <div className="flex justify-center items-center space-x-8 text-blue-200/60">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm">4.9/5 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
