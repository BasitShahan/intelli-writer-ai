"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import Link from "next/link";
import Box from "@mui/material/Box";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { BasicCardData } from "@/constants/dashboard";
import {
  FaRegImages,
  FaRegCommentAlt,
  FaUserFriends,
  FaRegFileAlt,
  FaRegNewspaper,
  FaRegCalendarAlt,
  FaUser,
} from "react-icons/fa";
import { BiUserVoice } from "react-icons/bi";
import { MdContentCopy } from "react-icons/md";
import {
  Captionbg,
  ImageGeneration2,
  Speechcontentbg,
  aichat,
  blogcontent,
  coursecontent,
  imagegene,
  marketingcontent,
  socialmediaBg,
  voice,
  websitecontent,
  youtubebg,
} from "../../../../public";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: string | number; max?: number }
) {
  const { value, max = 100, ...rest } = props;
  // Convert value to number
  const numericValue = typeof value === "string" ? parseFloat(value) : value;
  let percentage: number;
  if (
    isNaN(numericValue) ||
    (typeof value === "string" && value === "unlimited")
  ) {
    percentage = 100; // Default to 100% if value is NaN or "unlimited"
  } else {
    percentage = Math.min((numericValue / max) * 100, 100); // Calculate percentage, ensuring it doesn't exceed 100%
  }
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          sx={{
            height: 10,
            borderRadius: 10,
            backgroundColor: "#202d4869",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#1976D2",
            },
          }}
          value={percentage}
          {...rest}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          percentage
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const DashboardPage = () => {
  const [userName, setUserName] = useState<string | null>("");
  const [wordCount, setWordCount] = useState<string | null>(null);
  const [chatCount, setChatCount] = useState<string | null>(null);
  const [imagesCount, setImagesCount] = useState<string | null>(null);
  const [voiceCount, setVoicesCount] = useState<string | null>(null);
  const [planName, setPlanName] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  useEffect(() => {
    const sessionName = sessionStorage.getItem("name");
    setUserName(sessionName);
    const storedImage = localStorage.getItem("profileImage");
    setProfileImage(storedImage);
  }, []);
  const tokens =
    typeof window !== "undefined" ? sessionStorage.getItem("tokens") : null;
  const userEmail =
    typeof window !== "undefined" ? sessionStorage.getItem("userEmail") : null;
  const userId =
    typeof window !== "undefined" ? sessionStorage.getItem("userId") : null;
  useEffect(() => {
    const sessionName = sessionStorage.getItem("name");
    setUserName(sessionName);
  }, []);
  const fetchCurrentPlan = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/current-plan/get-plan/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch current plan");
      }
      const data = await response.json();
      // Set state variables based on the response
      setWordCount(data.words_left === "unlimited" ? 100 : data.words_left);
      setChatCount(data.chat_count);
      setImagesCount(data.image_count);
      setVoicesCount(data.voice_count);
      setPlanName(data.plan_name);
      setPlanName(data.plan_name);
    } catch (error: any) {
      console.error("Error fetching current plan:", error.message);
    }
  };
  useEffect(() => {
    fetchCurrentPlan();
  }, []);

  return (
    <div className="text-white mt-16 md:pl-48 md:py-10 p-6 w-full h-full overflow-y-auto lg:w-[calc(100%-250px)] mx-auto ">
      <div className="w-full flex flex-col gap-6 justify-center items-center">
        <div className="w-full min-h-[280px] flex flex-col justify-between gap-4 rounded-[12px] bg-[rgba(32,45,72,0.41)] px-2 py-6 md:p-6 ">
          <div className="flex flex-col md:flex-row w-full gap-2 relative">
            <div className="w-20 h-20 flex items-center justify-center">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={profileImage}
                  className="object-cover object-center h-full w-full rounded-md"
                />
              ) : (
                <FaUser className="object-cover object-center h-full w-full rounded-md" />
              )}
            </div>
            <div className="md:w-4/5 w-full flex flex-row gap-3 items-center justify-between relative whitespace-normal">
              <div className=" flex flex-col items-start justify-start md:px-4">
                <h2 className="font-semibold text-lg md:text-3xl">
                  {userName}
                </h2>
                <p className="text-sm md:text-base opacity-80">{userEmail}</p>
              </div>
            </div>
            <span
              key={BasicCardData[0].id}
              className={`absolute top-0 right-0 text-sm md:text-base md:top-0 md:right-0 rounded-lg px-2 bg-gradient-to-bl ${
                planName === "Basic Plan"
                  ? "from-[#8b828c] to-[#444444]"
                  : planName === "Standard Plan"
                  ? "from-cyan-500 to-[#113391]"
                  : "from-[#ff00c8] to-[#2C63FF] "
              }`}
            >
              {planName}
            </span>
          </div>
          <div className="w-full mt-2 grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Cards */}
            {BasicCardData.slice(1).map((item) => (
              <Box className="mx-2" key={item.id}>
                <label className="opacity-80">{item.title}</label>
                <LinearProgressWithLabel
                  variant="determinate"
                  value={
                    item.id === 2
                      ? typeof wordCount === "string"
                        ? parseInt(wordCount)
                        : wordCount || 0
                      : item.id === 3
                      ? typeof chatCount === "string"
                        ? parseInt(chatCount)
                        : chatCount || 0
                      : item.id === 4
                      ? typeof imagesCount === "string"
                        ? parseInt(imagesCount)
                        : imagesCount || 0
                      : item.id === 5
                      ? typeof voiceCount === "string"
                        ? parseInt(voiceCount)
                        : voiceCount || 0
                      : 0
                  }
                  max={item.remaining || 0}
                />
              </Box>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiles.map((tile, index) => (
            <div
              key={index}
              className="rounded-lg py-4 px-6 bg-white/5 relative backdrop-blur-md text-white
                overflow-hidden border border-[#FFFFFF14] text-center hover:scale-105 hover:bg-[#67508471] hover:transition hover:ease-in-out hover:duration-500 shadow-lg flex flex-col items-center justify-between"
            >
              <img
                src={tile.image}
                className="w-full h-32 object-cover mb-4 rounded-lg"
                alt={tile.alt}
              />
              <h3 className="text-xl font-bold text-white">{tile.title}</h3>
              <p className="text-gray-200 mb-4">{tile.description}</p>
              <Link href={tile.link}>
                <Button
                  title="Explore"
                  className="bg-white text-white hover:bg-gray-800 px-6 py-2 rounded-full"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const tiles = [
  {
    image: imagegene,
    alt: "AI Image Generation",
    title: "AI Image Generation",
    description: "Generate high-quality images using AI",
    link: "/user/image-generator",
  },
  {
    image: voice,
    alt: "Text to Speech",
    title: "Text to Speech",
    description: "Convert text into speech with natural voices",
    link: "/user/voice-generator",
  },
  {
    image: youtubebg,
    alt: "YouTube Content Generation",
    title: "YouTube Content Generation",
    description: "Generate engaging content for your YouTube channel",
    link: "/user/youtube-content",
  },
  {
    image: aichat,
    alt: "AI Chatbot",
    title: "AI Chatbot",
    description: "Create intelligent chatbots for your website or app",
    link: "/user/chat",
  },
  {
    image: Speechcontentbg,
    alt: "Speech Content Generator",
    title: "Speech Content Generator",
    description: "Generate content for speeches and presentations",
    link: "/user/speech-content-generator",
  },
  {
    image: Captionbg,
    alt: "Image Caption Generator",
    title: "Image Caption Generator",
    description: "Automatically generate captions for images",
    link: "/user/image-caption-generator",
  },
  {
    image: blogcontent,
    alt: "Blog Content Generator",
    title: "Blog Content Generator",
    description: "Generate blog posts and articles with AI",
    link: "/user/blog-content",
  },
  {
    image: socialmediaBg,
    alt: "Social Media Content Generator",
    title: "Social Media Content Generator",
    description: "Generate content for social media platforms",
    link: "/user/social-media",
  },
  {
    image: websitecontent,
    alt: "Website Content Generator",
    title: "Website Content Generator",
    description: "Generate content for websites",
    link: "/user/website",
  },
  {
    image: marketingcontent,
    alt: "Marketing Content Generator",
    title: "Marketing Content Generator",
    description: "Generate content for Marketing",
    link: "/user/marketing",
  },
  {
    image: coursecontent,
    alt: "Course Builder",
    title: "Course Builder",
    description: "Generate content for creating courses",
    link: "/user/course-builder",
  },
];

export default DashboardPage;
