import React from "react";
import { APISidebar } from "@/components";

interface APIProps {
  children: React.ReactNode;
}

const APIPageLayout: React.FC<APIProps> = ({ children }) => {
  return (
    <div className="flex w-full text-white min-h-screen">
      <APISidebar />
      {children}
    </div>
  );
};

export default APIPageLayout;
