import Image from "next/image";
import { FAQs } from "@/components";
import { APILandingFAQs } from "@/constants/FaqsData";
import Link from "next/link";
import React from "react";
import {
  apicontent,
  apistep1,
  apistep2,
  apistep3,
  apistep4,
  landbg,
}  from "../../../public";
import Button from "@/components/Button";

const steps = [
  {
    id: 1,
    step: "Step#1",
    detail:
      "Access Intelliwriter AI website: Checkout the link for API in navbar, Click and Jump to the API Docs of Intelliwriter",
    image: apistep1,
  },
  {
    id: 2,
    step: "Step#2",
    detail:
      "Here You are! Look for your desired service, APIs for Content, Images, and Voice overs, Just a click away ",
    image: apistep2,
  },
  {
    id: 3,
    step: "Step#3",
    detail:
      "Dive into the documentation of your API, Have a go through and in case let us know what we can do more",
    image: apistep3,
  },
  {
    id: 4,
    step: "Step#4",
    detail:
      "Just hit the copy button and boost your productivity with our all types of API's",
    image: apistep4,
  },
];

const Page = () => {
  return (
    <div className="my-16">
      <div className="h-full bg-gradient-to-b from-[#471c7c]/40 to-[#030616]/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-0 py-20 flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 text-white flex flex-col mx-10 justify-between gap-3">
            <h1 className="text-3xl md:text-5xl font-semibold capitalize w-[90%] xl:w-[85%] text-center lg:text-left">
              Integrate Powerful Writing Capabilities Seamlessly with{" "}
              <span>Intelliwriter APIs</span>
            </h1>
            <p className="text-sm md:text-lg my-4 w-[90%] text-center lg:text-left">
              Infuse your applications with the ability to understand, analyze,
              and generate human-quality text, unlocking a multitude of new
              features and possibilities.
            </p>
            <div className="w-fit mx-auto lg:mx-0">
              <Link href="/api/docs">
                <Button
                  title="Discover Intelliwriter's API Services!"
                  btnType="button"
                />
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={apicontent}
              alt="api Content"
              className="h-[20rem] md:w-[30rem] md:h-[30rem] z-10 rounded-2xl"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto py-10 text-white flex flex-col">
        <div className="py-10">
          <h2 className="lg:text-6xl text-5xl font-normal relative lg:p-6 md:p-6 p-4 text-center lg:text-left">
            <span className="border-text text-white opacity-20 absolute top-0 lg:left-0">
              HOW APIs
            </span>
            <span className="gradient-span-1 text-white relative lg:p-6 p-6 font-[600]">Integrate</span>
          </h2>
          <p className="md:text-[21px] text-[16px] font-[500] leading-[36px] !text-white lg:px-10 md:p-6 p-4 text-center lg:text-left">
            Embark on an unstoppable journey of your with our APIs - in just a
            few clicks!
          </p>
        </div>
        <div className="w-11/12 h-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-16">
          {steps.map((item) => (
            <div
              key={item.id}
              className="w-full flex flex-col justify-center items-center"
            >
              <div className="rounded-md shadow-[#ac7aeb] shadow-2xl">
                <Image
                  src={item.image}
                  alt="Steps"
                  layout="responsive"
                  height={450}
                  width={450}
                  className="w-full rounded-xl border border-[#1f1f7a]"
                />
              </div>
              <div className="flex flex-col pt-5 text-center">
                <h2 className="text-lg md:text-xl font-semibold my-2">
                  {item.step}
                </h2>
                <p className=" text-base md:text-lg">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full mt-6">
        <FAQs faqs={APILandingFAQs} />
      </div>
      <div className="relative w-full h-1/2 my-16 flex items-center justify-center">
        <Image
          src={landbg}
          alt="image"
          width={100}
          height={100}
          className="w-full h-72 inset-0 z-0 "
        />
        <div className="absolute top-24 w-full flex flex-col items-center justify-center z-10 text-center">
          <p className="text-center text-xl md:text-4xl text-white">
            Integrate Powerful Writing Capabilities Seamlessly now with
            Intelliwriter APIs{" "}
          </p>
          <div className="mt-4">
            <Link href="/api/docs">
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

export default Page;
