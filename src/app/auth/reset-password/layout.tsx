import PageProps from "@/components/PageProps";
import Scripts from "@/components/Scripts";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <body>
      {children}
      <Scripts />
    </body>
  );
};

export default layout;
