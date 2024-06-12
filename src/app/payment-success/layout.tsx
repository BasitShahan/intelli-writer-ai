import PageProps from "@/components/PageProps";
import Scripts from "@/components/Scripts";
import React from "react";

const PaymentSuccess = ({ children }: { children: React.ReactNode }) => {
  return (
    <body>
      <PageProps>{children}</PageProps>
      <Scripts />
    </body>
  );
};

export default PaymentSuccess;