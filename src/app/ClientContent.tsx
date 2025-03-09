"use client";


import FlipBook from "@/components/FlipBookTest";
// import FlipBook from "@/components/FlipBookTest";
import { Suspense } from "react";
// import { useSearchParams } from "next/navigation";

export default function ClientContent() {
//   const searchParams = useSearchParams();
//   const page = searchParams.get("page");

//   const renderPage = () => {
//     switch (page) {
//       case "flipBook":
//         return <FlipBook />;
//       case "thumnSelector":
//         return <ThumnSelector />;
//       default:
//         return <FlipBook />;
//     }
//   };

  return <Suspense fallback={<div>Loading...</div>}>

<FlipBook />
    
  </Suspense>;
}
