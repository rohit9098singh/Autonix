// "use client"
// import { Calendar, Car, Cog, LayoutDashboard } from "lucide-react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React from "react";

// const Sidebar = () => {
  
//   const routes = [
//     {
//       label: "Dashboard",
//       icon: LayoutDashboard,
//       href: "/admin",
//     },
//     {
//       label: "Cars",
//       icon: Car,
//       href: "/admin/cars",
//     },
//     {
//       label: "Test Drives",
//       icon: Calendar,
//       href: "/admin/test-drives",
//     },
//     {
//       label: "Settings",
//       icon: Cog,
//       href: "/admin/settings",
//     },
//   ];

//   const pathname = usePathname();


//   return (
//     <>
//       {/* Desktop Sidebar */}
//       <div className="hidden md:flex h-full flex-col bg-white border-r border-gray-200 shadow-sm">
//         <div className="p-6 border-b border-gray-100">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
//               <Car className="h-6 w-6 text-white" />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-gray-900">Vehiql</h1>
//               <p className="text-xs text-gray-500">Admin Panel</p>
//             </div>
//           </div>
//         </div>

//         <nav className="flex-1 px-4 py-6 space-y-1">
//           {routes.map((route) => {
//             const isActive = pathname === route.href;

//             return (
//               <Link
//                 key={route.href}
//                 href={route.href}
//                 className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
//                   isActive 
//                     ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600 font-medium" 
//                     : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                 }`}
//               >
//                 <route.icon 
//                   className={`h-5 w-5 ${
//                     isActive ? "text-blue-600" : "text-gray-400"
//                   }`} 
//                 />
//                 <span className="font-medium">{route.label}</span>
//               </Link>
//             );
//           })}
//         </nav>
//       </div>

//       {/* Mobile Header */}
//        <div>

//        </div>
//     </>
//   );
// };

// export default Sidebar;
