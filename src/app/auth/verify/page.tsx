"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Button from "@/components/Button";
import axios from "axios";
import Swal from "sweetalert2";

const VerifyUserLayout: React.FC<any> = (props) => {
  const router = useRouter();

  const handleClick = async () => {
    const urlParams =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search)
        : null;

    if (urlParams) {
      const userId = urlParams.get("userId");
      const token = urlParams.get("token");

      if (userId && token) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/verify/${userId}/${token}`
          );
          Swal.fire({
            icon: "success",
            title: "Email Verified Successfully",
            text: "You can now login to your account.",
            confirmButtonText: "Login",
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("/auth/login");
            }
          });
        } catch (error) {
          console.error("Error verifying email:", error);
          Swal.fire({
            icon: "error",
            title: "Error Verifying Email",
            text: "An error occurred while verifying your email. Please try again later.",
          });
        }
      }
    }
  };
  return (
    <div className="flex flex-col text-white items-center justify-center py-32">
      <h1 className="text-3xl font-bold mb-4">Verify Your Email</h1>
      <p className="text-[16px]">
        You have been redirected from Gmail. Please verify your email.
      </p>
      <p className="text-[16px] text-center mb-8 max-w-[600px] ">
        If you haven't received an email yet, please wait for a few minutes and
        check again. You may also want to look in your spam folder.
      </p>

      <Button title="Verify Email" btnType="button" onClick={handleClick} />
    </div>
  );
};

export default VerifyUserLayout;