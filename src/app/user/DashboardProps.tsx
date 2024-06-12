"use client";

import Chatbot from "@/components/Chatbot";
import { Sidebar } from "@/components/Sidebar";
import UserHeader from "@/components/UserHeader";
import ADAButton from "@/components/ADAButton";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DashboardProps = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  // const pathname = usePathname();

  const [loading, setLoading] = useState(true); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof sessionStorage !== "undefined") {
      const sessionTokens = sessionStorage.getItem("tokens");
      if (!sessionTokens) {
        router.push("/auth/login");
      } else {
        setIsLoggedIn(true);
      }
      setLoading(false);
    }
  }, [router]);

  // const isImageGeneratorRoute = pathname === "/user/image-generator";

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <div
          className={`h-20 w-20 animate-spin rounded-full text-white border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
        ></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }
  return (
    <div className="flex relative">
      {/* {!isImageGeneratorRoute && <UserHeader />}
      {!isImageGeneratorRoute && <Sidebar />} */}
      <UserHeader />
      <Sidebar />
      <div style={{ zIndex: 1000, position: 'relative' }}>
        <ADAButton />
      </div>
      {/* <Chatbot /> */}
      {children}
    </div>
  );
};

export default DashboardProps;
