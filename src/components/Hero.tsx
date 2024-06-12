"use client";

import Image from "next/image";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";
import { HeroBg } from "../../public";
import ScrollButton from "./ScrollButton";

const Hero = () => {
  return (
    <div className="hero-section w-full md:pt-[100px] pt-[50px] ">
      <Image
        src={HeroBg}
        alt={HeroBg}
        width={1200}
        height={500}
        className="absolute w-fit md:h-screen sm:h-[700px] opacity-[0.4] h-[600px] top-0 right-0 overflow-hidden"
      />

      <div className="flex items-start w-full relative overflow-hidden">
        <div className="w-full md:px-10 px-3 flex gap-3 items-center ">
          <div className="w-full flex md:flex-row flex-col items-center justify-center relative">
            <div className="w-full text-center flex items-center justify-between flex-col gap-3">
              <div className="signboard bg-[#0f062c] bg-opacity-70">
                <div className="text-16-24-bold ">
                  AI Experts in Image, Voice, and Content Creation with
                  <span className="gradient-span-1 font-bold">
                    {" "}
                    Intelli GPT-4.
                  </span>
                </div>
              </div>
              <h1 className="md:text-[68px] text-2xl gap-3 !leading-normal flex flex-col justify-between font-bold text-white w-full relative ">
                <span className="capatilize">
                  Platform for Crafting Content
                </span>
                <span className="flex md:flex-row items-center flex-col justify-center gap-3">
                  <span className="whitespace-nowrap w-[350px] h-[60px] md:w-[455px] md:h-[110px] text-4xl md:text-6xl flex items-center justify-center rounded-lg px-3 bg-[#4d0663]">
                    <Typewriter
                      words={["AI Content", "AI Visuals", "AI Speech"]}
                      loop={100}
                      typeSpeed={70}
                      deleteSpeed={50}
                      delaySpeed={1000}
                    />
                  </span>
                </span>
                <span>
                  with <span className="c">IntelliWriter.</span>
                </span>
              </h1>

              <p className="text-center md:mx-16 w-full md:w-[] !text-white text-base md:text-[21px] font-[400]">
                AI Content Generator is here to help you create high-quality
                content in just a few seconds.
              </p>
              <div className="div-block-15 mt-5">
                <div className="md:gap-[90px] gap-[45px] flex flex-col ">
                  <Link
                    href="/user/dashboard"
                    className="btn-gradient w-full h-14 md:w-full md:h-full m-100 md:w-inline-block"
                  >
                    <div className="gradient-btt w-full h-full"></div>
                    <div className="bnt-inner">
                      <img
                        src="https://assets-global.website-files.com/65e6ec2daf39c088fe6cd402/65e6ffd665b03bba0228d49d_rocket-01.svg"
                        loading="lazy"
                        alt=""
                        className="img-rocket"
                      />
                      <div className="text-xs md:text-xl">Generate with AI</div>
                    </div>
                  </Link>
                  <ScrollButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
