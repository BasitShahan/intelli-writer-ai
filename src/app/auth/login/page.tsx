"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import loginUser from "@/utils/loginUser";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BiSolidLock } from "react-icons/bi";
import { FaEnvelope } from "react-icons/fa";
import Swal from "sweetalert2";
import { Loginbg, Logo } from "../../../../public";

interface LoginPageLayoutProps {
  children: React.ReactNode;
  email?: string;
  password?: string;
  error?: string;
}

const LoginPageLayout: React.FC<LoginPageLayoutProps | any> = () => {
  const router = useRouter();
  const { setTokens, setNameLetter } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [seePass, setSeePass] = useState<"text" | "password">("password");
  const [signInError, setSignInError] = useState<LoginPageLayoutProps | null>(
    null
  );

  function getFirstLetter(email: string): string {
    return email ? email.charAt(0) : "";
  }

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      if (!email) {
        setSignInError({
          email: "Email is required",
          children: null,
        });
        return;
      } else if (!password) {
        setSignInError({
          password: "Password is required",
          children: null,
        });
        return;
      } else {
        setSignInError({
          email: "",
          password: "",
          error: "",
          children: null,
        });
        const result = await loginUser(userData);
        if (result.success) {
          sessionStorage.setItem("tokens", result.token);
          sessionStorage.setItem("name", result.name);
          sessionStorage.setItem("nameLetter", getFirstLetter(result.name));
          sessionStorage.setItem("userId", result.userId);
          sessionStorage.setItem("userEmail", result.email);

          setTokens(result.token);
          setNameLetter(getFirstLetter(result.name));
          router.push("/user/dashboard");
        } else {
          await Swal.fire({
            icon: "error",
            title: "Ooops...",
            text: `${result.message}`,
          });
        }
      }
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Ooops...",
        text: "Something went wrong!",
      });
    }
  };

  useEffect(() => {
    setSignInError(null);
  }, []);

  return (
    <div className="h-screen w-full space-y-5 bg-slate-900">
      <form
        onSubmit={submitForm}
        autoComplete="off"
        className="h-screen w-full flex justify-end"
      >
        <Link
          href="/"
          className="absolute z-50 left-2 top-2 opacity-75 hover:opacity-100 text-white border rounded-3xl px-4 py-1"
        >
          Back
        </Link>
        <div className="w-full md:w-2/3 left-0 opacity-10 md:opacity-100 absolute h-screen object-cover">
          <img
            src={Loginbg}
            alt=""
            className="w-full h-full object-cover rounded-l-lg filter brightness-75"
          />
        </div>
        <div className="w-full z-10  md:w-1/3 h-screen flex items-center justify-center bg-transparent">
          <div className="w-[80%] md:w-[70%] gap-y-6 flex flex-col text-white">
            <Link
              href="/"
              passHref
              className="flex justify-center items-center text-white font-extrabold text-[72px] mb-4 tracking-wide font-montserrat"
            >
              <Image
                src={Logo}
                alt="Logo"
                width={300}
                height={32}
                className="object-contain h-16 w-fit"
              />
            </Link>
            <div className="text-center gap-y-2 flex flex-col">
              <h1 className="font-bold text-3xl md:text-4xl text-white">
                Login
              </h1>
              <p>Start generating your thoughts with Intelliwriter.io</p>
            </div>

            <label className="w-full relative">
              <div className="absolute left-[20px] top-12">
                <FaEnvelope />
              </div>
              <p>Email</p>
              <input
                autoComplete="off"
                name="title"
                type="email"
                placeholder="Enter your email"
                className="contact-input bg-gradient-to-b !pl-12 !mt-1 md:from-[#111630] md:to-[#1d214c] 
                from-[#000b1e] to-[#010208]  "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            {signInError?.email && (
              <p className="!text-red-500 text-sm px-2">{signInError.email}</p>
            )}

            <label className="w-full relative">
              <div className="absolute left-[20px] top-11">
                <BiSolidLock size={24} />
              </div>
              <p>Password</p>
              <input
                name="password"
                type={seePass}
                placeholder="Enter your password"
                className="contact-input !pl-12 !mt-1 bg-gradient-to-b  md:from-[#111630] md:to-[#1d214c] 
                from-[#000b1e] to-[#010208] "
                value={password}
                onChange={(e) => {
                  if (password === "") {
                    setSeePass("password");
                  }
                  setPassword(e.target.value);
                }}
              />
              <div className="absolute right-[7%] top-11 cursor-pointer">
                {password === "" ? null : seePass === "text" ? (
                  <AiFillEye size={24} onClick={() => setSeePass("password")} />
                ) : (
                  <AiFillEyeInvisible
                    size={24}
                    onClick={() => setSeePass("text")}
                  />
                )}
              </div>
            </label>
            {signInError?.password && (
              <p className="!text-red-500 text-sm px-2">
                {signInError.password}
              </p>
            )}

            <Link href="/auth/forgot-password" className="w-[160px]">
              <span className="text-pink-400">Forgot password ?</span>
            </Link>

            <div className="flex w-full justify-center">
              <Button
                title="Login"
                width="w-full"
                className="w-full"
                btnType="submit"
              />
            </div>

            <p className="pb-6 !m-0 text-center text-white lg:pt-0 pt-3">
              Don&apos;t have an account?{" "}
              <span className="text-pink-400">
                <Link href="/auth/register"> Register</Link>
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPageLayout;
