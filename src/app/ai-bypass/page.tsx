"use client";
import React from "react";
import Image from "next/image";
import { contentAtScale, copyLeaks, crossPlag, gptZero, sapling, writer, zeroGpt, bypassHero } from '../../../public/index';
import Features from './Features'
import Offer from "./offer";
import Humanizer from "./humanizer";
import Match from "./match";
import Freebypass from "./freebypass";
import { AIBypassFAQs } from "@/constants/FaqsData";
import { FAQs } from "@/components";
import Link from "next/link";
import Button from "@/components/Button";

const BypassPage = () => {
  const tokens =
    typeof window !== "undefined" ? sessionStorage.getItem("tokens") : null;
  const toolData = [
    { src: gptZero, alt: 'GPTzero' },
    { src: copyLeaks, alt: 'Copyleaks' },
    { src: zeroGpt, alt: 'ZeroGPT' },
    { src: crossPlag, alt: 'Crossplag' },
    { src: sapling, alt: 'Sapling' },
    { src: writer, alt: 'Writer' },
    { src: contentAtScale, alt: 'Content at Scale' }
  ];
  const features = [
    {
      icon: "🌐",
      title: "Humanize all AI text",
      description: "ChatGPT, GPT-4, Bard, …",
    },
    {
      icon: "👍",
      title: "AI detection bypasser",
      description: "Bypass all popular AI detectors",
    },
    {
      icon: "💯",
      title: "Original meaning kept",
      description: "100% accuracy ensured",
    },
    {
      icon: "⚡",
      title: "Streamlined process",
      description: "Fast and easy steps",
    },
  ];
  return (
    <>
      {/* section 1 code */}
      <div className="md:my-16">
        <div className="w-full h-full bg-gradient-to-b from-[#471c7c]/40 to-[#030616]/20 backdrop-blur-sm">
          <div className="container mx-auto md:px-0 py-20 flex flex-col lg:flex-row items-center justify-center">
            <div className="w-full lg:w-1/2 text-white flex flex-col mx-10 justify-between gap-3">
              <h1 className="text-3xl md:text-5xl mx-5 lg:mx-0 font-semibold capitalize w-[90%] xl:w-[85%] lg:text-start text-center">
                AI <span className="gradient-span-1">Bypass </span> Generator
              </h1>
              <p className="text-sm md:text-lg mx-5 lg:mx-0 my-4 w-[90%] text-center lg:text-start">
                Generate human-like, undetectable writing with HIX Bypass. Plagiarism-free guaranteed!<br />Trained on millions of datasets of human-written content, our AI bypasser uses sophisticated algorithmic technology that analyzes and replicates the known patterns of human writing to perfectly convert AI text to human.
              </p>
              <div className="w-fit mx-auto lg:mx-0 justufy-center lg:justify-start text-center lg:text-left">
                <Link
                  href={
                    tokens ? "/user/ai-bypass" : "/auth/register"
                  }
                >
                  <Button
                    title="Try For Free !"
                    btnType="button"
                  />
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-1/2 pt-5 md:pt-5 lg:pt-0 flex justify-center">
              <img
                src={bypassHero}
                alt="AI Bypass"
                className="h-[20rem] md:w-[30rem] md:h-[30rem] z-10  rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* features  code*/}
        <Features />

        {/* section 4 code */}
        <div className="text-start md:text-center w-full mx-auto h-auto gap-4 flex flex-col p-4 md:py-12">
          <div className="mx-auto max-w-[1150px]">
            <h1 className="text-2xl md:text-4xl  text-white font-bold ">
              Humanize AI Text And Bypass AI Detectors Like GPTZero,
              Originality.ai, and More Without Fail
            </h1>
          </div>
          <div className="mx-auto max-w-[1150px]">
            <p className="text-white font-semibold text-base md:text-xl pt-3 ">
              Our undetectable AI humanizer can help you bypass AI detectors
              effectively, including the most stringent ones in the market.
            </p>
          </div>
          {/* working with images  */}
          <div className="mx-auto flex-wrap flex gap-8 mt-12">
            <div className='text-white flex flex-col md:flex-row flex-wrap gap-5 text-base items-center justify-start md:justify-between'>
              {toolData.map((tool, index) => (
                <span key={index} className='flex gap-4 items-center'>
                  <img src={tool.src} className='w-14 h-14' alt={tool.alt} />
                  {tool.alt}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* offer code */}
        <Offer />

        {/* humanize code */}
        <Humanizer />
        {/* match code*/}
        <Match />
        {/* undetectable */}
        <div className="max-w-[832px] px-4 mx-auto lg:py-20 py-14 md:py-10">
          <Image
            alt="Undetectable AI Writer You Can Trust"
            loading="lazy"
            width="60"
            height="60"
            decoding="async"
            className="mx-auto mb-6"
            style={{ color: "transparent" }}
            src="/ai-bypass/emoji.png"
          />
          <h2 className="text-white text-xl font-bold md:text-2xl lg:text-4xl text-center pt-3">
            Undetectable <span className="gradient-span-1">AI Writer </span> You Can
            Trust
          </h2>
          <div className="flex flex-col gap-6 my-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#1f1738] to-[#3b2d5c] p-4 rounded-lg"
              >
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <h3 className="text-white text-base lg:text-lg font-semibold lg:font-bold">
                    {feature.icon} {feature.title}
                  </h3>
                  <p className="text-[#677788] text-sm lg:text-base">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* faqs */}
        <div className="mt-6">
          <FAQs faqs={AIBypassFAQs} />
        </div>

        {/* freebypass code */}
        <Freebypass />
      </div>
    </>

  );
}

export default BypassPage;