"use client";

import React, { FC } from "react";
import { RoadmapData } from "@/constants";

interface CircleContainerProps {
  heading: string;
  text: string;
}

const CircleContainer: FC<CircleContainerProps> = ({ heading, text }) => {
  return (
    <div className="w-36 h-36 bg-[#FFFFFF05] border border-gray-600 rounded-full mx-4 text-white text-center flex flex-col items-center justify-center m-1">
      <h2 className="mb-2 text-xl font-normal">{heading}</h2>
      <p>{text}</p>
    </div>
  );
};

interface ContentContainerProps {
  heading: string;
  text: string;
}

const ContentContainer: FC<ContentContainerProps> = ({ heading, text }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <div
      className={`w-full h-52  xl:h-44  border border-gray-600 rounded-lg py-6 px-3 text-white m-1 relative text-center flex items-center justify-center ${isHovered ? "bg-[#010409]" : "bg-[#070C16]"} `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 className={` mb-2 text-4xl font-normal ${isHovered ? 'hidden' : 'block'}`}>{heading}</h2>
      <p className={`text-[16px] ${isHovered ? 'block' : 'hidden'}`}>
        {text}
      </p>
    </div>
  );
};


const OurRoadmap: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  return (

    <div className='flex flex-col gap-3 py-10'>
      <div className='md:p-10'>
        <h2 className='xl:text-[92px] lg:text-[72px] lg:text-6xl text-5xl font-normal italic relative p-10'>
          <span className='border-text text-white opacity-20 absolute lg:-top-6 md:top-3 top-4 left-10'>OUR ROADMAP</span>
          <span className='text-white relative lg:p-10 py-6 px-2'>PROJECT & STRATEGY PLAN</span>
        </h2>
        <p className='lg:text-3xl md:text-2xl text-lg font-sans font-thin !text-white/80 px-10'>Our mission is AI-Powered content and image creation serving people.</p>
      </div>
      <div className="px-5 my-3 w-full grid md:grid-cols-2 gap-4">
        {RoadmapData.map((item, index) => (
          <div
            className="relative m-3 hover:scale-105 hover:ease-in-out hover:duration-500"
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span className={`absolute text-5xl italic -top-5 left-5 text-white bg-gradient-to-b px-3 z-10 ${hoveredIndex === index ? "from-[#010409] to-[#010409]" : "from-[#010409] to-[#070C16]"}`}>
              {item.Question}
            </span>
            <ContentContainer heading={item.heading} text={item.description} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurRoadmap;
