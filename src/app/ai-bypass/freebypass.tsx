import React from "react";
import Link from "next/link";
import Button from "@/components/Button";
const Freebypass = () => {
  return (
    <>
      <div className="border border-[#554869] w-full h-72 bg-gradient-to-br from-[#201634] to-[#643cba8a] relative my-16 flex items-center justify-center py-6">
        <div className="absolute top-15 w-full flex flex-col items-center justify-center z-10">
          <h2 className="text-center text-xl md:text-4xl text-white">
            Effortlessly Humanize{" "}
            <span className="gradient-span-1">AI Text </span>and Bypass AI
            Detection
          </h2>
          <p className="text-center text-lg md:text-xl text-white mt-4">
            Transform AI-generated text into completely undetectable, human-like
            content. Try Intelli Bypass for Free!
          </p>
          <div className="mt-4">
            <Link href="/auth/register">
              <Button
                title="Start for free "
                btnType="button"
                className="mt-4 text-2xl"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Freebypass;
