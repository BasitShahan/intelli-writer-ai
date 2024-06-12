import PageProps from "@/components/PageProps";
import Scripts from "@/components/Scripts";
import React from "react";


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      
      <body>
        <PageProps>{children}</PageProps>
        <Scripts />
      </body>
    </>
  );
};

export default Layout;
