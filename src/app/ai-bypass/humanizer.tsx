import Link from "next/link";
import React from "react";

const Humanizer = () => {
  return (
    <>
      <div className=" py-10 md:py-14 lg:py-20 border border-[#554869] bg-gradient-to-br from-[#201634] to-[#643cba8a] w-[80%] mx-auto rounded-md my-16">
        <div className="max-w-[1268px] mx-auto px-4">
          <h2 className="text-white font-bold lg:text-3xl md:text-2xl sm:text-xl text-center">
            Use Our Free AI Humanizer to Bypass AI Detection
          </h2>
          <ul className="flex flex-col items-start justify-center gap-x-3 pt-5 md:flex-row md:pt-12 gap-6 md:gap-5">
            <li className="text-center w-full">
              <span className="text-white text-3xl font-bold md:text-5xl">
                1
              </span>
              <p className="pt-2 text-display-secondary text-sm md:text-lg ">
                Input the AI-generated text in HIX Bypass.
              </p>
            </li>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 shrink-0 text-white translate-y-[28px] hidden md:block"
            >
              <path
                opacity="0.8"
                d="M19.334 23.333 26.666 16l-7.334-7.333"
                stroke="currentColor"
                stroke-width="3.667"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                opacity="0.5"
                d="M5.333 23.333 12.668 16 5.334 8.667"
                stroke="currentColor"
                stroke-width="3.667"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <li className="text-center w-full">
              <span className="text-white text-3xl font-bold md:text-5xl">
                2
              </span>
              <p className="pt-2 text-display-secondary text-sm md:text-lg ">
                Start running HIX Bypass and let it work its magic.
              </p>
            </li>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 shrink-0 text-white translate-y-[28px] hidden md:block "
            >
              <path
                opacity="0.8"
                d="M19.334 23.333 26.666 16l-7.334-7.333"
                stroke="currentColor"
                stroke-width="3.667"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                opacity="0.5"
                d="M5.333 23.333 12.668 16 5.334 8.667"
                stroke="currentColor"
                stroke-width="3.667"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <li className="text-center w-full ">
              <span className="text-white text-3xl font-bold md:text-5xl">
                3
              </span>
              <p className="pt-2 text-display-secondary text-lg ">
                Get your humanized text and safely use it anywhere you like.
              </p>
            </li>
          </ul>
          <Link href="/auth/register">
            <button className="text-white mt-8  block  sm:w-fit mx-auto rounded-full px-[30px] md:px-[62px] bg-gradient-to-bl transition-all duration-300 from-[#471c7c] to-[#7628d6] hover:opacity-90 font-semibold sm:text-lg py-2 lg:py-[15px] md:text-base sm:mt-6">
              Start for Free
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Humanizer;
