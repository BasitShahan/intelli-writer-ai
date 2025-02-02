"use client";
import React, { useState } from "react";
import Image from "next/image";

const Features = () => {
  type ButtonType = "Chat-GPT" | "GPT-4" | "Gemini";

  type Content = {
    left: string;
    right: string;
  };

  const contentMapping: Record<ButtonType, Content> = {
    "Chat-GPT": {
      left: "Small acts of compassion have the power to transform lives in profound ways. A kind word, a helping hand, or a simple gesture of empathy can uplift spirits, restore hope, and instill a sense of belonging. These acts create ripples of positivity that spread beyond the immediate moment, fostering a culture of compassion and inspiring others to pay it forward. In a world that often feels disconnected, these small acts remind us of our shared humanity and the transformative impact we can have on one another",
      right: "Kind gestures, even if they are small, can have a deep influence on people's lives. We can feel security and support with a kind word, a helping hand, or a simple empathetic gesture. These behaviors give out positive feelings that can last for long, reinforcing the tendencies to showing compassion. In a society where people often feel detached from each other, these tiny deeds remind us of the humanity we share and the transformative influence we can have on everyone.",
    },
    "GPT-4": {
      left: "Cultivating appreciation enhances well-being by shifting focus from negatives to positives. Recognizing simple pleasures, expressing gratitude, and acknowledging others' kindness encourages positive emotions, strengthens relationships, and fosters resilience. This process of seeing the good in life can lead to improved mental health, increased happiness, and a more fulfilling life experience.",
      right: "Practicing gratitude changes our attention from negatives to positives, an important way to improve our mental health. When we are capable of feeling joyfulness from simple experiences, acknowledging people's kindness and showing appreciation to them, we can then enhance our emotional wellness, build better relationships with each other, and develop our power to deal with challenges. And when we start to recognize the positive aspects of our life, we can improve our mental health, and feel happy and satisfied more easily.",
    },
    "Gemini": {
      left: "There are many different types of exercise that we can do, so there is something for everyone. Whether we prefer to walk, run, swim, dance, or lift weights, there is an exercise that we can enjoy. And the best part is, we don't have to do a lot of exercise to reap the benefits. Even a moderate amount of exercise can make a big difference in our health.",
      right: "With so many physical exercises available, we can always find the one suitable for ourselves. Walking, jogging, swimming, dancing, or lifting weights, these can all be our choices. And the greatest thing is, we don't need to invest a lot of time and effort to get benefits from workouts. Just some moderate exercise, and we will see significant improvement in our health.",
    },
  };

  const [activeButton, setActiveButton] = useState<ButtonType>("Chat-GPT");

  const buttons: ButtonType[] = ["Chat-GPT", "GPT-4", "Gemini"];

  return (
    <div className="max-w-[1100px] px-4 mx-auto text-center lg:py-[100px] py-10">
      <h2 className="text-white text-xl font-bold md:text-2xl lg:text-4xl text-center py-6">
        AI Humanizer to <span className="gradient-span-1">ByPass </span> AI Detection
      </h2>
      <div className="space-y-3 max-w-[900px] mx-auto mt-3">
        <p>
          Intelli Bypass humanizes AI text generated by ChatGPT, GPT-4, or Gemini into 100% human score content. All outputs flow coherently, contain nuance, and read as if written by a person. See it in action.
        </p>
      </div>
      <div className="mt-12 md:mt-8 lg:mt-10">
        <ul className="flex flex-col sm:flex-row gap-10 w-fit mx-auto text-lg font-semibold md:gap-4 md:text-sm md:font-semibold">
          {buttons.map((button) => (
            <li
              key={button}
              className={`rounded px-8 cursor-pointer py-1.5 xs:px-4 ${
                activeButton === button
                  ? "bg-gradient-to-bl transition-all duration-300 from-[#471c7c] to-[#7628d6] hover:opacity-90 text-white"
                  : "bg-gray-300 text-black"
              }`}
              onClick={() => setActiveButton(button)}
            >
              {button}
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-5 mt-4 md:flex-row md:mt-4 lg:mt-8 text-sm mg:text-lg">
          {["left", "right"].map((side) => (
            <div
              key={side}
              className="w-full p-4 relative flex flex-col justify-between rounded-lg bg-gradient-to-br from-[#201634] to-[#643cba8a] md:p-6 md:pt-0 h-[350px] overflow-hidden"
            >
              <div className="lg:absolute top-0 start-0 bg-gradient-to-br from-[#201634] to-[#643cba8a] text-[#ffffff] rounded-b-lg h-9 flex items-center justify-center pe-3 pb-[5px] static w-fit mx-auto md:h-12">
                <span className="w-8 h-8 lg:h-10 lg:w-10">
                  <Image
                    alt={side === "left" ? "AI Verified" : "Human Written"}
                    width="48"
                    height="48"
                    decoding="async"
                    data-nimg="1"
                    style={{ filter: "invert(100%)" }}
                    src={
                      side === "left"
                        ? "/ai-bypass/features/ai-verified.svg"
                        : "/ai-bypass/features/verified.svg"
                    }
                  />
                </span>
                <div className="flex flex-row items-center md:flex-col md:gap-x-1">
                  <span className="text-lg font-extrabold block">100%</span>
                  <span className="text-xs block">
                    {side === "left" ? "AI-generated" : "Human Written"}
                  </span>
                </div>
              </div>
              <div className="flex-1 mt-5 overflow-y-auto">
                <p className="text-white text-base md:text-lg font-bold pt-2 pl-4">
                  Humanized By Intelli Bypass
                </p>
                <div className="space-y-3 sm:mt-3 text-display-secondary mt-2">
                  <p>{contentMapping[activeButton][side as keyof Content]}</p>
                </div>
              </div>
              <div className="border-t pt-4 max-w-[500px] mx-auto border-[#a8a39f] flex mt-5 flex-wrap justify-center gap-4 sm:gap-3 md:max-w-full">
                {[
                  { src: "/ai-bypass/features/zerogpt.png", alt: "Zero GPT" },
                  { src: "/ai-bypass/features/crossplag.svg", alt: "Crossplag" },
                  { src: "/ai-bypass/features/huggingFace.png", alt: "Hugging Face" },
                  { src: "/ai-bypass/features/copyleaks.svg", alt: "Copyleaks" },
                ].map((image, index) => (
                  <div key={index} className="w-fit">
                    <figure className="relative w-6 h-6 mx-auto">
                      <Image
                        alt={image.alt}
                        loading="lazy"
                        decoding="async"
                        data-nimg="fill"
                        className="object-cover"
                        width={100}
                        height={100}
                        src={image.src}
                      />
                    </figure>
                    <p className="text-sm flex items-center mt-1">
                      {image.alt}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5.5 h-5 text-[#FF8C40]"
                      >
                        <path
                          d="m8 16 8-8M16 16 8 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        ></path>
                      </svg>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
