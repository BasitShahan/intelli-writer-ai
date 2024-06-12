"use client"
import AffiliateHeader from "@/components/AffiliateHeader";
import Scripts from "@/components/Scripts";
import { useRouter } from "next/navigation";
import React, {useState,useEffect} from "react";

const layout = ({ children }: { children: React.ReactNode }) => {

    const router = useRouter();
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
    <body>
      <div className="min-h-screen">
      <AffiliateHeader/>
      {children}
      <div className="absolute bottom-0 w-full text-white md:text-lg py-4 border-t-2 border-[#FFFFFF40] flex items-center justify-center ">
        Powered by @Intelliwriter.io
      </div>
      </div>
      <Scripts />
    </body>
  );
};

export default layout;
