import React from "react";
import Image from "next/image";

const industries = [
  {
    title: "Small Businesses",
    description:
      "Small businesses can utilize Intelli Bypass to detect AI content, whether it's from freelancers, agencies, or other sources, and humanize it to ensure their website, blogs, and ad copies truly reflect their brand and messaging.",
    imageUrl: "/ai-bypass/match/small-business.svg",
  },
  {
    title: "Advertising Professionals",
    description:
      "With Intelli Bypass, advertisers can transform their AI-generated ad copies into engaging and persuasive content that bypasses AI detectors, driving readers to take action.",
    imageUrl: "/ai-bypass/match/advertising.svg",
  },
  {
    title: "SEO Experts",
    description:
      "Futureproof your AI-generated content from Google penalties with our AI checker and bypasser, eliminating the risk of being flagged by AI detectors and remaining compliant with search engine guidelines.",
    imageUrl: "/ai-bypass/match/seo.svg",
  },
  {
    title: "Students",
    description:
      "Writing essays and assignments can take up a significant amount of time for students. With HIX Bypass, you can efficiently generate drafts that bypass AI detection and plagiarism checks.",
    imageUrl: "/ai-bypass/match/student.svg",
  },
];

const Match = () => {
  return (
    <div className="py-12 lg:py-[80px] max-w-[1104px] mx-auto px-4">
      <h2 className="text-center text-xl font-bold lg:text-4xl md:text-2xl text-white">
        Suitable for Many Industries and Professions
      </h2>
      <p className="text-center text-lg md:text-xl text-white mt-4">
        Intelli Bypass is helpful for a wide range of occasions. Here&apos;s a
        look at some of the people who can benefit from using our free AI
        content detector and AI bypasser:
      </p>
      <div className="grid grid-cols-1 mt-4 lg:mt-10 gap-x-6 lg:grid-cols-2 gap-y-6">
        {industries.map((industry, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-[#1f1738] to-[#3b2d5c] p-4 rounded-lg"
          >
            <div className="flex flex-col justify-center items-center md:items-start gap-x-3 lg:flex-row gap-4">
              <span className="w-[10%] md:w-[8%] lg:w-[30%] h-full self-center">
                <Image
                  alt="Bypass AI With a 99% Success Rate"
                  loading="lazy"
                  width="170"
                  height="170"
                  decoding="async"
                  data-nimg="1"
                  style={{ color: "transparent" }}
                  src={industry.imageUrl}
                />
              </span>
              <div className="space-y-[6px] text-center md:text-start">
                <h3 className="text-white text-base lg:text-lg font-semibold  lg:font-bold">
                  {industry.title}
                </h3>
                <p className="text-[#677788] lg:text-sm">
                  {industry.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Match;
