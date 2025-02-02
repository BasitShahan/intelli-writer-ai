"use client";
import { FAQs } from "@/components";
import { MoretoolsWebsite, dataWebsite, stepsWebsite } from "@/constants";
import { WebsiteContentGeneratorFAQs } from "@/constants/FaqsData";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { landbgg, websitecontent } from "../../../public";
import Button from "@/components/Button";

const page = () => {
  const tokens =
    typeof window !== "undefined" ? sessionStorage.getItem("tokens") : null;
  return (
    <div className="my-16">
      <div className="h-full bg-gradient-to-b from-[#471c7c]/40 to-[#030616]/20 backdrop-blur-sm">
        <div className="container mx-auto md:px-0 py-20 flex flex-col lg:flex-row items-center justify-center">
          <div className="w-full lg:w-1/2 text-white flex flex-col mx-10 justify-between gap-3">
            <h1 className="text-3xl md:text-5xl mx-5 lg:mx-0 font-semibold capitalize w-[90%] xl:w-[85%] lg:text-start text-center">
              AI<span className="gradient-span-1"> Website Content</span>{" "}
              generator
            </h1>
            <p className="text-sm md:text-lg mx-5 lg:mx-0 my-4 w-[90%] text-center lg:text-start">
              Explore your creativity through digital art exploration. Immerse
              yourself in a realm of creation and dynamic prompts that nurture
              artistic expression. Whether you're a Website Developer, Software
              Engineer, or seeking to infuse creativity into your projects, our
              AI-powered tool empowers you to craft captivating images within
              seconds.
            </p>
            <div className="w-fit mx-auto lg:mx-0 justufy-center lg:justify-start text-center lg:text-left">
              <Link href={tokens ? "/user/website" : "/auth/register"}>
                <Button
                  title="Try For Free !"
                  btnType="button"
                />
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/2 pt-5 md:pt-5 lg:pt-0 flex justify-center">
            <img
              src={websitecontent}
              alt="Website Content"
              className="h-[20rem] md:w-[30rem] md:h-[30rem] z-10  rounded-2xl"
            />
          </div>
        </div>
      </div>

      <div className="xl:px-16 md:px-6 px-4 py-10 text-white  flex flex-col ">
        <div className="py-10">
          <h2 className="lg:text-6xl text-5xl font-normal relative lg:p-10 md:p-6 p-4">
            <span className="border-text text-white opacity-50 absolute md:top-3 lg:top-4 top-0 lg:left-10">
              UNLOCK YOUR
            </span>
            <span className="gradient-span-1 text-white relative lg:p-6 p-6 font-[600]">
              POTENTIALS
            </span>
          </h2>
          <p className="md:text-[21px] text-[16px] font-[500] leading-[36px] !text-white lg:px-10 md:p-6 p-4">
            Embracing the age of Artifical Intelligence. Discover Boundless
            power and impact of AI Website Content Generation.
          </p>
        </div>
      </div>

      <div className="w-3/4 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5 ">
        {dataWebsite.map((item, index) => (
          <div
            key={index}
            className=" flex flex-col rounded-lg py-4 px-4 bg-white/5 relative backdrop-blur-md text-white gap-2 overflow-hidden border border-[#FFFFFF14]"
          >
            <div className="absolute -bottom-4 -right-4 bg-[#ac7aeb] w-28 h-28 blur-[80px]"></div>
            <div className="absolute -bottom-4 -right-4 bg-gray-800 w-16 h-16 blur-[50px]"></div>
            <div className="absolute top-4 left-4 bg-gray-800 w-16 h-16 blur-[50px]"></div>
            <span className=" bg-[#fee2e2] m-2 block w-10 h-10 rounded-md text-[#dc2626] text-2xl  p-2">
              {React.createElement(item.icon)}
            </span>
            <div className="text text-white p-2">
              <h1 className="text-2xl">{item.title}</h1>
              <p className="text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="xl:px-16 md:px-6 px-4 py-10 text-white  flex flex-col ">
        <div className="py-10">
          <h2 className="lg:text-6xl text-5xl font-normal relative lg:p-10 md:p-6 p-4">
            <span className="border-text text-white opacity-50 absolute md:top-3 lg:top-4 top-0 lg:left-10">
              HOW CONTENT
            </span>
            <span className="gradient-span-1 text-white relative lg:p-6 p-6 font-[600]">
              GENERATES
            </span>
          </h2>
          <p className="md:text-[21px] text-[16px] font-[500] leading-[36px] !text-white lg:px-10 md:p-6 p-4">
            Embark on an unstoppable journey of your with our Website Content
            Generator – where your text come to life with captivating website in
            just a few clicks!
          </p>
        </div>
        <div className="w-11/12 h-full mx-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-16 ">
          {stepsWebsite.map((item) => (
            <div
              key={item.id}
              className="w-full flex flex-col justify-center items-center"
            >
              <div className="rounded-md shadow-[#ac7aeb] shadow-2xl">
                <Image
                  src={item.image}
                  alt="Steps"
                  layout="responsive"
                  height={400}
                  width={450}
                  className="w-full rounded-xl border border-[#1f1f7a]"
                />
              </div>
              <div className="flex flex-col pt-5 text-center">
                <h2 className="text-lg md:text-xl font-semibold">
                  {item.step}
                </h2>
                <p className="text-base md:text-lg">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="reason xl:px-16 md:px-6 px-4 py-10 mt-8 text-white flex flex-col">
        <div className="py-10">
          <h2 className="lg:text-6xl text-5xl font-normal relative lg:p-10 md:p-6 p-4">
            <span className="border-text text-white opacity-50 absolute md:top-3 lg:top-4 top-0 lg:left-10">
              DISCOVER MORE
            </span>
            <span className="gradient-span-1 text-white relative lg:p-6 p-6 font-[600]">
              AI TOOLS
            </span>
          </h2>
          <p className="md:text-[21px] text-[16px] font-[500] leading-[36px] !text-white lg:px-10 md:p-6 p-4">
            Unlock the power of AI with our suite of innovative tools, designed
            to simplify your tasks and elevate your productivity to new heights!{" "}
          </p>
        </div>
        <div className="w-full md:w-11/12 justify-center items-center md:mx-auto gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {MoretoolsWebsite.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-blue-900 p-3 gap-3 bg-opacity-20 w-[100%] lg:w-[100%] mx-auto "
            >
              <span
                className="items-center justify-center block w-8 h-8 rounded-md text-lg p-2 "
                style={{
                  backgroundColor: item.bgcolor,
                  color: item.color,
                }}
              >
                {React.createElement(item.icon)}
              </span>
              <div className="text text-white ">
                <h2 className="text-xl">{item.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <FAQs faqs={WebsiteContentGeneratorFAQs} />
      </div>
      <div className="border border-[#554869] w-full h-72 bg-gradient-to-br from-[#201634] to-[#643cba8a] relative  my-16 flex items-center justify-center">
        {/* <Image
          src={landbgg}
          alt=""
          width={100}
          height={100}
          className="w-full h-72 inset-0 z-0 "
        /> */}
        <div className="absolute top-24 w-full flex flex-col items-center justify-center z-10">
          <p className="text-center text-xl md:text-4xl text-white">
            Start generating your{" "}
            <span className="gradient-span-1">Website content</span> now for
            free
          </p>
          <div className="mt-4">
            <Link href={tokens ? "/user/website" : "/auth/register"}>
              <Button
                title="Start Now !"
                btnType="button"
                className="mt-4 text-2xl"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
