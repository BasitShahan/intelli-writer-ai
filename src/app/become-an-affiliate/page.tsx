"use client";
import React from "react";
import Link from "next/link";
import Button from "@/components/Button";
import { affilliateData } from "@/constants";
import { FaCheck, FaTimes } from "react-icons/fa";
import { AffilliateProgramFAQs } from "@/constants/FaqsData";
import { FAQs } from "@/components";

const page = () => {
  return (
    <>
      <div className="">
        <div className="h-screen bg-gradient-to-b from-[#471c7c]/40 to-[#030616]/20 backdrop-blur-sm">
          {/* Hero Section */}
          <div className="w-full h-full flex flex-col items-center justify-center p-5">
            <div className="w-full md:w-[80%] mx-auto gap-y-6 flex flex-col items-center justify-center z-10  px-4">
              <div className="md:text-[54px] text-2xl flex flex-col justify-center items-center space-y-12 font-bold !text-white text-center w-full">
                <span>
                  Earn <span className="gradient-span-1">15% Commission</span>{" "}
                  <br /> 
                </span>
                <span>From Your Every Referral</span>
              </div>
            </div>
            {/* Lucrative Affiliate Program */}
            <div className="md:w-[60%] w-full py-10 flex flex-col mx-auto items-center justify-center gap-3">
              {/* Left div
              <div className="w-full">
                <h2 className="text-center text-2xl md:text-4xl !text-white font-semibold">
                  Join Intelli.AI&apos;s{" "}
                  <span className="gradient-span-1">Lucrative </span>Affiliate
                  Program
                </h2>
              </div> */}
              <div className="w-full overflow-hidden md:w-4/5">
                {/* text-center text-wrap text-display-secondary text-sm md:text-lg
                 */}
                <p className="text-center  w-full md:w-[] !text-white text-base md:text-[21px] font-[400] ">
                  Sign up for the affiliate program of Intelli.AI, the most
                  powerful, all-in-one writing copilot your audience will love.
                  Become our partner and get up to 30% commission for every
                  referral.
                </p>
              </div>
              <div className=" mt-6 flex items-center justify-center w-full">
                <Link href="/auth/register-affiliate">
                  <Button
                    title="Sign Up Now"
                    btnType="button"
                    className="!w-fit"
                  />
                </Link>
              </div>
            </div>
            {/* Lucrative Affiliate Program end*/}
          </div>
        </div>
        {/* Hero Secrtion End */}

        {/* Earn With Intelli.AI's Diverse Product Range */}
        <div className="py-12 w-full  px-4 ">
          <h2 className="lg:text-6xl md:text-5xl text-center  font-bold !text-white  w-full">
            Earn With{" "}
            <span className="gradient-span-1">Intelli.AI&apos;s </span> Diverse
            Product Range
          </h2>

          <p className="text-center relative top-6  w-full  !text-white text-base md:text-[21px] font-[400] ">
            Intelli.AI comes with multiple products and features. You can get
            paid by promoting any of them.
          </p>
          {/* card section */}
          <div className="mt-8 sm:mt-16 w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-8">
            {affilliateData.map((item, index) => (
              <Link
                href={item.route}
                key={index}
                className="flex flex-col items-center rounded-lg py-4 px-6 bg-white/5 relative backdrop-blur-md !text-white gap-2 overflow-hidden border border-[#FFFFFF14] text-center hover:scale-105 hover:bg-[#67508471] hover:transition hover:ease-in-out hover:duration-500"
              >
                <div className="absolute -bottom-4 -right-4 bg-[#ac7aeb] w-28 h-28 blur-[80px]"></div>
                <div className="absolute -bottom-4 -right-4 bg-gray-800 w-16 h-16 blur-[50px]"></div>
                <div className="absolute top-4 left-4 bg-gray-800 w-16 h-16 blur-[50px]"></div>
                <div className="h-[50%] flex items-center justify-center relative">
                  <img
                    src={item.image}
                    alt="Features"
                    className="w-[100px] h-auto "
                  />
                </div>
                <div className="h-[50%] pt-2 md:pt-3 relative">
                  <h2 className="text-[22px] md:text-[20px] mb-2 xl:text-[22px] font-semibold">
                    {item.title}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* Earn With Intelli.AI's Diverse Product Range end*/}
        {/* Become a Intelli.AI Affiliate in 3 Steps */}
        <div className=" py-10 md:py-14 lg:py-20 border border-[#554869] bg-gradient-to-br from-[#201634] to-[#643cba8a] w-[80%] mx-auto rounded-2xl my-16">
          <div className="max-w-[1268px] mx-auto px-4">
            <h2 className="text-center text-xl sm:text-4xl !text-white font-bold">
              Become a Intelli.AI Affiliate in
              <span className="gradient-span-1"> 3 Steps </span>
            </h2>
            <ul className="flex flex-col items-start justify-center gap-x-3 pt-5 md:flex-row md:pt-12 gap-6 md:gap-5">
              <li className="text-center w-full">
                <span className="!text-white text-3xl font-bold md:text-5xl">
                  1
                </span>
                <p className="pt-2 text-display-secondary text-sm md:text-lg ">
                  Sign up for our affiliate program and get your referral link.
                </p>
              </li>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 shrink-0 !text-white translate-y-[28px] hidden md:block"
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
                <span className="!text-white text-3xl font-bold md:text-5xl">
                  2
                </span>
                <p className="pt-2 text-display-secondary text-sm md:text-lg ">
                  Share your link on your website or other platforms.
                </p>
              </li>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 shrink-0 !text-white translate-y-[28px] hidden md:block "
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
                <span className="!text-white text-3xl font-bold md:text-5xl">
                  3
                </span>
                <p className="pt-2 text-display-secondary text-lg ">
                  Earn commissions from sales you and your sub-affiliates drive.
                </p>
              </li>
            </ul>
          </div>
        </div>
        {/* Become a Intellu.AI Affiliate in 3 Steps end */}

        {/* DO's DONT's */}
        <div className=" py-10 md:py-14 lg:py-20 w-[80%] mx-auto flex  flex-col lg:flex-row justify-center gap-10">
          {/* Dos  */}
          <div className="w-full lg:w-1/2 border border-[#554869] bg-gradient-to-br from-[#201634] to-[#643cba8a] rounded-2xl p-6 ">
            <h2 className="text-center text-xl sm:text-4xl !text-white font-bold">
              <span className="gradient-span-1"> Do&apos;s </span>
            </h2>
            <ul className="space-y-4 mt-4">
              <li className="flex">
                <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 mr-2 border border-green-500 rounded-full">
                  <FaCheck className="text-green-500" />
                </span>
                <p className="text-[16px] md:text-[15px] xl:text-[16px] font-normal text-gray-200">Try out Intelli.AI for yourself</p>
              </li>
              <li className="flex">
                <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 mr-2 border border-green-500 rounded-full">
                  <FaCheck className="text-green-500" />
                </span>
                <p className="text-[16px] md:text-[15px] xl:text-[16px] font-normal text-gray-200">
                  Promote Intelli.AI ethically and honestly
                </p>
              </li>
              <li className="flex">
                <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 mr-2 border border-green-500 rounded-full">
                  <FaCheck className="text-green-500" />
                </span>
                <p className="text-[16px] md:text-[15px] xl:text-[16px] font-normal text-gray-200">
                  Create quality and relevant content
                </p>
              </li>
              <li className="flex">
                <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 mr-2 border border-green-500 rounded-full">
                  <FaCheck className="text-green-500" />
                </span>
                <p className="!text-white">
                  Disclose your affiliate relationship
                </p>
              </li>
            </ul>
          </div>
          {/* Donts  */}
          <div
            className="w-full lg:w-1/2 p-6 border border-[#554869] bg-gradient-to-br from-[#201634] to-[#643cba8a]
             rounded-2xl "
          >
            <h2 className="text-center text-xl sm:text-4xl !text-white font-bold">
              <span className="gradient-span-1"> Don&apos;ts </span>
            </h2>
            <ul className="space-y-4 mt-4">
              <li className="flex">
                <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 mr-2 border border-red-500 rounded-full">
                  <FaTimes className="text-red-500" />
                </span>
                <p className="text-[16px] md:text-[15px] xl:text-[16px] font-normal text-gray-200">
                  Make misleading or false claims about Intellli.AI
                </p>
              </li>
              <li className="flex">
                <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 mr-2 border border-red-500 rounded-full">
                  <FaTimes className="text-red-500" />
                </span>
                <p className="text-[16px] md:text-[15px] xl:text-[16px] font-normal text-gray-200">
                  Promote on platforms that have inappropriate or illegal
                  content
                </p>
              </li>
              <li className="flex">
                <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 mr-2 border border-red-500 rounded-full">
                  <FaTimes className="text-red-500" />
                </span>
                <p className="!text-white">Promote on any coupon site</p>
              </li>
              <li className="flex">
                <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 mr-2 border border-red-500 rounded-full">
                  <FaTimes className="text-red-500" />
                </span>
                <p className="!text-white">
                  Set up ad campaigns using our brand name, or putting our
                  domain name in your ads&apos; destination URLs
                </p>
              </li>
            </ul>
          </div>
        </div>
        {/* DO's DONT's */}

        {/* FAQs */}
        <div className="mt-6">
          <FAQs faqs={AffilliateProgramFAQs} />
        </div>
        {/* FAQs */}

        {/* Start Earning with Our Affiliate Program Now */}
        <div className="w-full h-96 bg-gradient-to-br from-[#201634] to-[#643cba8a] relative my-16 flex items-center justify-center py-6">
          <div className="absolute top-15 w-full flex flex-col items-center justify-center z-10 px-2">
            <h2 className="text-center text-xl sm:text-4xl !text-white font-bold">
              Start Earning with Our{" "}
              <span className="gradient-span-1">Affiliate </span> Program Now
            </h2>

            <p className="mt-4 text-center  md:w-[] !text-white text-base md:text-[21px] font-[400] 
            w-[70%]
            ">
              Earn generous commissions while promoting a cutting-edge AI tool
              that will revolutionize your writing experience. Sign up and make
              money today!
            </p>
            <div className="mt-4">
              <Link href="/auth/register-affiliate">
                <Button
                  title="Sign Up Now "
                  btnType="button"
                  className="mt-4 text-2xl"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

{
  /* <div className=" py-5 bg-white/10 px-5  rounded-lg flex flex-col gap-3">
<p>You get commissions for every first purchase, renewal, and upgrade made through your links. And with our two-tier commission structure, you'll earn from sales driven by your referred sub-affiliates:</p>
<p className=" flex items-center"><TiTickOutline className=" mr-2  text-green-500 border border-green-500 rounded-full flex justify-center items-center" size={25} /><span className=" font-bold mr-1">1st Tier:</span> Earn 30% on the sales you drive.</p>
<p className=" flex items-center"><TiTickOutline className=" mr-2 bg-[#ef5aff]/30 rounded-full flex justify-center items-center" size={25} /><span className=" font-bold mr-1">2nd Tier:</span> Earn an extra 10% on your sub-affiliates' sales.</p>
<p>Let's say you've referred a sub-affiliate named Amanda to our program. If Amadan drives a sale with a value of $100, then the rewards would be distributed as follows:</p>
<p className=" flex items-center"><TiTickOutline className=" mr-2 bg-[#ef5aff]/30 rounded-full flex justify-center items-center" size={25} />Amanda: $30</p>
<p className=" flex items-center"><TiTickOutline className=" mr-2 bg-[#ef5aff]/30 rounded-full flex justify-center items-center" size={25} />You: $10</p>
<p>Both of you will benefit from all her direct referral sales.</p>
</div> */
}
