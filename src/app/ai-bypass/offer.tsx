"use client";
import React from "react";
import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";

interface CardProps {
  src: string;
  alt: string;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ src, alt, title, description }) => (
  <div className="flex flex-col max-w-full lg:max-w-[360px] h-[300px] rounded-lg py-4 px-6 bg-white/5 relative backdrop-blur-md text-white gap-2 overflow-hidden border border-[#FFFFFF14] hover:scale-105 hover:bg-[#67508471] hover:transition hover:ease-in-out hover:duration-500">
    <div className="absolute -bottom-4 -right-4 bg-[#ac7aeb] w-28 h-28 blur-[80px]"></div>
    <div className="absolute -bottom-4 -right-4 bg-gray-800 w-16 h-16 blur-[50px]"></div>
    <div className="absolute top-4 left-4 bg-gray-800 w-16 h-16 blur-[50px]"></div>
    <span>
      <Image
        className="w-8 h-8"
        alt={alt}
        loading="lazy"
        width="48"
        height="48"
        decoding="async"
        data-nimg="1"
        style={{ color: "transparent" }}
        src={src}
      />
    </span>
    <h2 className="text-white text-lg font-bold">{title}</h2>
    <p className="text-[16px] md:text-[15px] xl:text-[16px] font-normal text-gray-200">
      {description}
    </p>
  </div>
);

const Offer = () => {
  const cardData = [
    {
      src: "/ai-bypass/unrivaled.svg",
      alt: "Bypass AI With a 99% Success Rate",
      title: "Unrivaled Bypass AI Technology",
      description:
        "Powered by advanced natural language processing, our AI model analyzes millions of human-written datasets to identify linguistic patterns and styles. It then replicates these patterns, converting AI text into human-like writing.",
    },
    {
      src: "/ai-bypass/ai-detection.svg",
      alt: "Bypass AI With a 99% Success Rate",
      title: "Built-in AI Detection Capabilities",
      description:
        "After humanizing AI-generated content, Intelli Bypass can automatically help you scan the text to determine the likelihood of it getting flagged by the mainstream AI detectors on the market.",
    },
    {
      src: "/ai-bypass/spam-folder.svg",
      alt: "Bypass AI With a 99% Success Rate",
      title: "Avoid Spam Folders",
      description:
        "Intelli Bypass can help prevent your AI-generated emails from getting lost in spam folders, unseen and unread by rewriting it to appear human-written and authentic.",
    },
    {
      src: "/ai-bypass/google-penalties.svg",
      alt: "Bypass AI With a 99% Success Rate",
      title: "Avoid Google Penalties",
      description:
        "With Intelli Bypass, you can get undetectable AI content that sounds authentically human. This prevents the risk of facing Google penalties that could contribute to a drastic decline in website traffic.",
    },
    {
      src: "/ai-bypass/paraphrasing.svg",
      alt: "Bypass AI With a 99% Success Rate",
      title: "Expert-level Paraphrasing",
      description:
        "Instead of simply spinning content, HIX Bypass is an anti AI detector that can produce material that appears human-written through sophisticated content restructuring and rewriting techniques.",
    },
  ];

  return (
    <div className="py-[120px] max-w-[1232px] px-4 mx-auto flex flex-col items-center gap-[64px] lg:py-12 lg:flex-row md:gap-5 lg:gap-8">
      <div className="flex flex-col w-full lg:w-1/3 items-center shrink-0 space-y-4">
        <h1 className="text-white text-3xl md:text-5xl lg:mx-0 font-semibold capitalize w-full lg:text-start text-center">
          Bypass<span className="gradient-span-1"> AI</span> With a 99%
          Success Rate
        </h1>
        <p className="text-sm md:text-lg mx-5 lg:mx-0 my-4 text-center lg:text-start">
          Our AI humanizer help you handle AI text in one seamless workflow.
          Here are some of their outstanding features:
        </p>
        <Link href="/auth/register">
        <Button title="Make AI Text Undetectable for Free" btnType="button" className="!w-fit" />
        </Link>
      </div>
      {/* Right section start */}
      <div className="w-full md:w-2/3 space-y-3 lg:space-y-4 flex flex-col md:flex-row flex-wrap gap-3 justify-center">
        {cardData.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>

  );
};

export default Offer;
