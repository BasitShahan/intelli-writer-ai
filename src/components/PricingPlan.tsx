"use client";

import { useWebContext } from "@/context/ContextProvider";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CheckIcon } from "../../public";
import { pricingData as defaultPricingData } from "../constants";
import { PricingData } from "../types";
import { BsRecord2 } from "react-icons/bs";
import Button from "./Button";

const tokens =
  typeof window !== "undefined" ? sessionStorage.getItem("tokens") : null;

interface PricingPlanProps {
  pricingData?: PricingData[];
}

const PricingCard: React.FC<{ card: PricingData }> = ({ card }) => {
  const router = useRouter();
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (card.id === 0 && tokens) {
      setSubscribed(true);
    } else {
      setSubscribed(false);
    }
  }, [card.id, tokens]);

  const handleClick = () => {
    if (tokens || subscribed) {
      router.push(`${card.link}`);
    } else {
      if (card.id === 0 && !subscribed) {
        router.push("/auth/register");
      } else {
        router.push("/auth/login");
      }
    }
  };
  const renderCard = () => {
    switch (card.id) {
      case 0:
        return <div className="p-4"></div>;
      case 1:
        return (
          <div className="bg-gradient-to-r xl:text-base lg:text-sm text-xs text-white font-medium from-black/60 to-[#471c7c] py-1 text-center">
            Recommended
          </div>
        );
      case 2:
        return <div className="py-4"></div>;
      default:
        return null; // Handle default case if necessary
    }
  };
  return (
    <div className={`bg-white/5 hover:bg-white/10 transition duration-500 md:max-w-[480px] sm:w-[50wh] w-[70wh] relative overflow-hidden border-[#FFFFFF14] text-white text-opacity-70 shadow-lg rounded-xl space-y-5 border ${card.id === 1 ? 'border-white md:scale-110' : 'border-white/20'} transition duration-300 `}>
      {renderCard()}

      <div className="absolute -bottom-4 -right-4 bg-[#ac7aeb] w-28 h-28 blur-[80px]"></div>
      <div className="absolute -bottom-4 -right-4 bg-gray-800 w-16 h-16 blur-[30px]"></div>
      <div className="absolute top-4 left-4 bg-[#9a58eb] w-16 h-16 blur-[50px]"></div>

      <div className="w-full flex flex-col justify-between gap-5 relative 2xl:px-6 xl:px-5 lg:px-4 px-3">
        {/* Card top */}
        <div className="flex items-center lg:gap-3 gap-2">
          <div className="xl:text-[40px] lg:text-[25px] text-xl text-white ">
            {React.createElement(card.icon)}
          </div>

          <div>
            <p className="!text-white xl:text-lg lg:text-base text-sm tracking-widest font-extralight">
              {card.packagehint}
            </p>
            <p className="!text-white xl:text-2xl lg:text-xl text-lg tracking-widest font-bold pb-3">
              {card.package}
            </p>
          </div>
        </div>

        {/* Card pricing */}
        <p className="xl:text-5xl lg:text-4xl text-3xl !text-white/90">
          <span className="pricing-font">{card.price}</span>
          <span className="text-base font-light pl-1">USD</span>
          <span className="text-base font-extralight">/month</span>
        </p>

        <div className="w-full flex justify-center">
          {card.id === 0 && subscribed ? (
            <Button title="Subscribed" btnType="button" onClick={handleClick} disbaled className="opacity-70 hover:opacity-70" />
          ) : (
            <Button
              title={
                card.id === 0 && subscribed ? "Subscribed" : "Subscribe now"
              }
              btnType="button"
              onClick={handleClick}
              className={`w-full ${card.id === 0 && subscribed ? "hidden" : ""
                }`}
            />
          )}
        </div>

        <div className="py-6">
          <ul className="flex flex-col gap-3">
            {card.featuresName.map((featurename, index) => (
              <li
                key={index}
                className="flex xl:gap-2 gap-1 items-start xl:text-base lg:text-sm text-xs font-light text-white w-full"
              >
                <div className="saturate-[3] text-gray-400 lg:text-base text-sm mt-[5px]">
                  <BsRecord2 />
                </div>
                <div>{featurename}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const PricingPlan: React.FC<PricingPlanProps> = ({
  pricingData = defaultPricingData,
}) => {
  const { pricingRef } = useWebContext();

  return (
    <div className="w-full flex items-center flex-col justify-center pb-10" id="pricing" ref={pricingRef}>
      <div className="xl:px-16 md:px-6 px-4 w-full container" >
        <h2 className="lg:text-6xl text-5xl font-normal relative lg:p-10 md:p-6 p-4">
          <span className="border-text text-white opacity-50 absolute md:top-3 lg:top-4 top-0 lg:left-10">
            GET STARTED
          </span>
          <span className="gradient-span-1 text-white relative lg:p-6 p-6 font-[600]">FUTURE PLANS</span>
        </h2>

        <p className="md:text-[21px] text-[16px] font-[500] leading-[36px] !text-white lg:px-10 md:p-6 p-4">
          Simple pricing plans for everyone and every budget.
        </p>

        <div className=" w-full">
          <div className="w-full flex justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-3 justify-center xl:gap-10 gap-7 xl:px-10 md:p-6 p-4">
              {pricingData.map((card) => (
                <PricingCard key={card.id} card={card} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlan;
