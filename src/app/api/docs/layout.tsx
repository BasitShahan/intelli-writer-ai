import { APISidebar } from "@/components";
import React from "react";

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
