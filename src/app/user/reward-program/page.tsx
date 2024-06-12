import Link from "next/link";
import Image from "next/image";
import React from "react";
import { RewardProgram } from "@/constants/affiliate";
import Button from "@/components/Button";

const RewardsProgram = () => {
  return (
    <>
    <div className="absolute top-14 right-0 md:px-20 md:py-10 p-6 w-full lg:w-[calc(100%-250px)] mx-auto text-white">
    <h1 className="text-center font-bold text-4xl py-4">
          Rewards Program
        </h1>
        <div className="border-t-2 border-[#122249] w-full "></div>

        <div className="w-full flex justify-between items-center mx-auto my-10">
          <div className="w-1/2 flex flex-col ">
            <h2 className="text-xl md:text-3xl font-semibold">
              🎉 Welcome to our Rewards Program!
            </h2>
            <p className="text-sm md:text-base">
              Your feedback is the lifeblood of our growth and evolution. That's
              why, at Intelliwriter we have a special way to show your
              gratitude. Every time you take a moment to share your experiences
              with our tools and services, we want to give back!
            </p>
          </div>

          <div>
            <Link href="/become-an-affiliate" target="_blank">
              <Button
                title="Earn More with Affiliate Program"
                btnType="button"
                className="text-2xl"
              />
            </Link>
          </div>
        </div>

        <div className="w-full gap-8 grid grid-cols-1 md:grid-cols-2">
  {RewardProgram.map((item) => (
    <div
      key={item.id}
      className="w-full bg-[#161738] shadow-xl py-7 px-5 md:px-10 rounded-xl border border-[#FFFFFF14]"
    >
      <div className="h-full p-0 flex flex-col md:flex-row items-center justify-center">
        <div className="flex justify-center gap-5">
          <div
            className={
              item.id === 1
                ? "bg-color-1"
                : item.id === 3
                ? "bg-color-3"
                : item.id === 4
                ? "bg-color-4"
                : ""
            }
            style={{
              height: "56px",
              borderRadius: "100%",
              width: item.id === 1 || item.id === 3 || item.id === 4 ? "56px" : "54px",
              padding: item.id === 1 || item.id === 3 || item.id === 4 ? "15px" : "0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {typeof item.icon === 'string' ? (
              <div dangerouslySetInnerHTML={{ __html: item.icon }} />
            ) : (
              <item.icon size={32} /> // Adjust the size as needed
            )}
          </div>
          <div className="flex flex-col">
            <h4 className="text-xl md:text-2xl font-semibold">
              {item.title}
            </h4>
            <p className="text-sm md:text-base py-5">{item.content}</p>
            <Link href={item.link} {...(item.id === 2 ? {} : { target: '_blank' })}>
            <button className="w-3/4 bg-white text-black mt-2 p-4 opacity-80 hover:opacity-100 text-center rounded-md font-medium">
              {item.button}
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

      </div>
    </>
  );
};

export default RewardsProgram;
