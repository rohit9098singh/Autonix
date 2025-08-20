"use client";

import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const params = useParams();  
  const id = params.id;

  return (
    <div>
      <h1>Dynamic Page with id: {id}</h1>
    </div>
  );
};

export default Page;
