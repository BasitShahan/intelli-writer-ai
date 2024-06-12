"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  features,
  missions,
  trust_api_section_data,
} from "@/constants/apisData";
import { FAQs } from "@/components";
import { API } from "@/constants/FaqsData";
import { APIsPlans } from "@/constants/index";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import PricingAPI from "@/components/PricingAPI";

interface CodeOptions {
  javascript: string;
  python: string;
  java: string;
}

const HomePage: React.FC = () => {
  const [language, setLanguage] = useState<"javascript" | "python" | "java">(
    "javascript"
  );
  const [copyButtonText, setCopyButtonText] = useState<string>("Copy");

  const codeOptions = {
    javascript: `const fetch = require('node-fetch'); // For Node.js \n const api_key = 'your_api_key'; \n const url = 'https://api.yourdomain.com/ai-function'; \n const data = { text: 'Your text here' }; \n fetch(url, { \n   method: 'POST', \n   headers: { \n     'Authorization': \`Bearer \${api_key}\`, \n     'Content-Type': 'application/json', \n   }, \n   body: JSON.stringify(data), \n }) \n .then(response => response.json()) \n .then(result => console.log(result));`,
    python: `import requests \n api_key = 'your_api_key' \n url = 'https://api.yourdomain.com/ai-function' \n data = {'text': 'Your text here'} \n response = requests.post(url, headers={'Authorization': f'Bearer {api_key}'}, json=data) \n result = response.json() \n print(result)`,
    java: `import org.apache.http.HttpResponse; \n import org.apache.http.client.methods.HttpPost; \n import org.apache.http.entity.StringEntity; \n import org.apache.http.impl.client.CloseableHttpClient; \n import org.apache.http.impl.client.HttpClients; \n CloseableHttpClient client = HttpClients.createDefault(); \n HttpPost httpPost = new HttpPost("https://api.yourdomain.com/ai-function"); \n httpPost.addHeader("Authorization", "Bearer your_api_key"); \n httpPost.addHeader("Content-Type", "application/json"); \n StringEntity input = new StringEntity("{\"text\":\"Your text here\"}"); \n httpPost.setEntity(input); \n HttpResponse response = client.execute(httpPost); \n // Process the response here`,
  };

  const handleLanguageChange = (
    selectedLanguage: "javascript" | "python" | "java"
  ) => {
    setLanguage(selectedLanguage);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(codeOptions[language]);
    setCopyButtonText("Copied");
    setTimeout(() => {
      setCopyButtonText("Copy");
    }, 2000);
  };

  const tokens =
  typeof window !== "undefined" ? sessionStorage.getItem("tokens") : null;
  const targetLink = tokens ? "/user/intelli-apis" : "/auth/login";


  return (
    <div className="lg:w-4/5 md:w-2/3 w-full py-10 font-AR One Sans">
      <div className="w-full p-4 lg:p-12 md:p-8 md:flex flex-col justify-between gap-4">
        <div className="text-center w-full md:pl-20 px-10 md:pb-16 text-white flex flex-col items-center justify-center gap-5">
          <h1 className="md:text-[68px] text-2xl gap-3 !leading-[1] flex flex-col justify-between font-bold text-white w-full relative ">
            <span className="capatilize">Empower Your Projects</span>
            <span className="gradient-span-1">with our affordable</span>
            AI APIS.
          </h1>
          <p className="text-center max-w-[680px] mx-16 !text-white text-base md:text-[22px] font-[400]">
            Welcome to the future of artificial intelligence. IntelliWriter
            offers a range of cutting-edge AI APIs to revolutionize your
            projects and explore innovative possiblities.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-6 justify-center">
            <Link href={targetLink}>
              <button className="btn-pill-solid rounded-[30px]">
                Get Started
              </button>
            </Link>
            <Link href={targetLink}>
              <button className="gradient-outline-btn ">
                <span>Learn More</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Why choose our API */}
        <div className="w-full lg:px-20 lg:py-10 sm:mt-[10px] md:px-10 md:py-5 px-6 py-3 relative overflow-hidden">
          <div className="w-full flex items-center justify-center flex-col">
            <div className=" w-full text-white flex-col flex gap-8">
              <h2 className="lg:text-6xl text-5xl font-normal relative lg:p-10 md:p-6 p-4">
                <span className="border-text text-white opacity-50 absolute md:top-3 lg:top-4 top-0 lg:left-10">
                  Why Choose Our
                </span>
                <span className="gradient-span-1 text-white relative lg:p-6 p-6 font-[600]">
                  {" "}
                  AI APIs?
                </span>
              </h2>
              <p className="md:text-lg text-white-700">
                Discover the advantages of partnering with IntelliWriter. Our AI
                APIs offer an array of features that can transform your
                projects, streamline your processes, and elevate your
                applications.
              </p>
            </div>

            <div className="flex items-center justify-center">
              <div className="min-[376px]:w-4/5 w-full h-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 py-10">
                {features.map((item) => (
                  <div
                    key={item.id}
                    className="w-full h-full flex flex-col rounded-lg py-8 px-10 bg-[#191a3a] hover:bg-blue-950 text-white gap-4 overflow-hidden relative"
                  >
                    <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-pink-400 blur-[50px]"></div>
                    <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-blue-400 blur-[50px]"></div>
                    <Image
                      src={item.icon}
                      alt={item.icon}
                      width={100}
                      height={100}
                      className="w-1/2"
                    />
                    <h2 className="text-2xl font-medium">{item.title}</h2>
                    <p className="text-base text-white">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="w-full xl:px-20 xl:py-10 md:px-10 md:py-5 px-6 py-3 relative overflow-hidden">
          <div className="w-full relative">
            <div className="xl:w-1/2 w-full text-white flex-col flex gap-8">
              <h2 className="lg:text-6xl text-5xl font-normal relative lg:p-10 md:p-6 p-4">
                <span className="border-text text-white opacity-50 absolute md:top-3 lg:top-4 top-0 lg:left-10">
                  Explore
                </span>
                <span className="gradient-span-1 text-white relative lg:p-6 p-6 font-[600]">
                  AI APIs
                </span>
              </h2>
              <p className="md:text-lg ">
                Our mission is to make cutting-edge artificial intelligence
                accessible to developers and businesses of all sizes.
              </p>
            </div>

            <div className="lg:flex lg:gap-5 mt-5">
              <div className="lg:w-1/2 w-full text-white flex-col flex gap-8">
                {missions.map((item) => (
                  <div
                    key={item.id}
                    className="w-full h-full md:flex items-center justify-center text-white gap-4 "
                  >
                    <Image
                      src={item.icon}
                      alt="icon"
                      width={100}
                      height={100}
                      className="h-[50px] md:h-[70px]"
                    />
                    <div className="py-2 md:py-0">
                      <h2 className="text-2xl font-semibold">{item.title}</h2>
                      <p className="text-base ">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Code Panel */}
              <div className="pt-5 lg:w-1/2">
                <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                  {/* Language selection buttons */}
                  <div className="flex">
                    <button
                      className={`text-sm px-2 py-2 w-1/3 bg-gray-800 hover:border rounded-tl-lg hover:border-cyan-500 hover:text-cyan-500 ${
                        language === "javascript"
                          ? " border border-cyan-500 text-cyan-500"
                          : " text-white"
                      }`}
                      onClick={() => handleLanguageChange("javascript")}
                    >
                      Node.js
                    </button>
                    <button
                      className={`text-sm px-2 py-2  w-1/3 bg-gray-800 hover:border hover:border-cyan-500 hover:text-cyan-500 ${
                        language === "python"
                          ? "border border-cyan-500 text-cyan-500"
                          : " text-white"
                      }`}
                      onClick={() => handleLanguageChange("python")}
                    >
                      Python
                    </button>
                    <button
                      className={`text-sm px-2 py-2 w-1/3 bg-gray-800 hover:border rounded-tr-lg hover:border-cyan-500 hover:text-cyan-500 ${
                        language === "java"
                          ? " border border-cyan-500 text-cyan-500"
                          : " text-white"
                      }`}
                      onClick={() => handleLanguageChange("java")}
                    >
                      Java
                    </button>
                  </div>

                  {/* Code block with syntax highlighting */}
                  <div className="flex items-center justify-end">
                    <button
                      onClick={handleCopyClick}
                      className="copyButton self-end bg-gray-700 text-white rounded-full text-sm px-2 pt-0.5 pb-1 -mb-[40px] mr-2"
                    >
                      {copyButtonText}
                    </button>
                  </div>
                  <div>
                    <SyntaxHighlighter
                      language={language}
                      style={coldarkDark}
                      showLineNumbers={true}
                      className="custom-scrollbar"
                    >
                      {codeOptions[language]}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing plans */}

        <div className="w-full lg:px-20 lg:py-10 sm:mt-[10px] md:px-10 md:py-5 px-6 py-3 relative overflow-hidden">
          <h2 className="lg:text-6xl text-5xl font-normal relative lg:p-10 md:p-6 p-4">
            <span className="border-text text-white opacity-50 absolute md:top-3 lg:top-4 top-0 lg:left-10">
              API's
            </span>
            <span className="gradient-span-1 text-white relative lg:p-6 p-6 font-[600]">
              PLANS
            </span>
          </h2>
          <p className="md:text-lg ">
            Simple pricing plans for everyone and every budget.
          </p>
        </div>
        <div className=" w-full px-6 flex md:flex-row flex-col justify-center md:items-end items-center gap-10 pb-16">
          {APIsPlans.map((plan, index) => (
            <PricingAPI key={index} {...plan} />
          ))}
        </div>

        {/* Trust Our API section */}
        <div className="w-full h-full flex lg:flex-row flex-col justify-center items-center bg-transparent gap-4 px-10">
          <div className="w-full lg:px-20 lg:pt-0 md:px-10 text-white flex flex-col gap-5">
            <h2 className="lg:text-6xl text-5xl font-normal relative lg:p-10 md:p-6 p-4">
              <span className="border-text text-white opacity-50 absolute md:top-3 lg:top-4 top-0 lg:left-10">
                Trust in Our Approved
              </span>
              <span className="gradient-span-1 text-white relative lg:p-6 p-6 font-[600]">
                AI APIs Security
              </span>
            </h2>
            <p>
              At IntelliWriter, your security is our utmost priority. We
              understand the importance of safeguarding your data and ensuring
              the reliability of our AI APIs.
            </p>
            <ul>
              {trust_api_section_data.map((item) => (
                <li key={item.id} className="flex">
                  <span className="p-2 text-2xl text-cyan-400">
                    {item.icon}
                  </span>
                  <span className="p-1 pl-4">{item.paragraph}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FAQs*/}
        <FAQs faqs={API} />
      </div>
    </div>
  );
};

export default HomePage;
