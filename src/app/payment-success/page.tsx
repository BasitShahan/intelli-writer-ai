

import React from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Link from "next/link";

const PaymentSuccess: React.FC<any> = (props) => {
  return (
    <div className="flex flex-col text-white items-center justify-center py-8">
      <h1 className="text-3xl font-bold mb-4">Thanks for subscribing!</h1>
      <p className="text-lg mb-4">Your payment was completed successfully.</p>
      <p className="text-lg text-center mb-8 max-w-[600px]">
        Login to your profile and enjoy our services!
      </p>

      <Link href="/auth/login">
        <Button title="Login" btnType="button" />
      </Link>
    </div>
  );
};

export default PaymentSuccess;
