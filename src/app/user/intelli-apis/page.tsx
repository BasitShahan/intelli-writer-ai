"use client";

import { PricingData } from "@/types";
import cardsPlans from "@/utils/cardsPlans";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsRecord2 } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa6";
import { APIsPricingData as defaultPricingData } from "../../../constants";
import Button from "@/components/Button";

interface PlanData {
  pricingData?: PricingData[];
}

const PricingCard: React.FC<{ card: PricingData }> = ({ card }) => {
  const renderCard = () => {
    switch (card.id) {
      case 0:
        return <div className="p-4"></div>;
      case 1:
        return (
          <div className="bg-gradient-to-r from-[rgb(62,55,65)] to-[#0d0d8daa] py-1 text-center text-1xl">
            Most Popular
          </div>
        );
    }
  };

  return (
    <div
      className={`bg-white/5 hover:bg-white/10 transition duration-500 md:max-w-[500px] md:w-[300px] sm:w-[50wh] w-[70wh] relative overflow-hidden border-[#FFFFFF14] text-white text-opacity-70 shadow-lg rounded-xl space-y-5 border ${
        card.id === 1 ? "border-white md:scale-110" : "border-white/20"
      } transition duration-300 `}
    >
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
          <span>{card.price}</span>
          <span className="text-base font-light pl-1">USD</span>
          <span className="text-base font-extralight">/month</span>
        </p>

        <div className="flex justify-center py-3 w-full">
          <Link href={card?.link} className="w-full">
            <Button
              title={"Subscribe now"}
              btnType="button"
              className={`!w-full`}
            />
          </Link>
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

          <div className="p-5 pb-6 lg:text-base text-sm">
        <div className="py-3 space-x-2 text-white w-full font-extralight border-t border-gray-600">
          <span className="font-medium">{card.calls}</span>
          <span>API calls per month</span>
        </div>
      </div>
      </div>
    </div>
  );
};

const PlanPage: React.FC<PlanData> = ({ pricingData = defaultPricingData }) => {
  const [plans, setPlans] = useState<PlanData[] | null>(null);

  const fetchPlans = async () => {
    try {
      const res = await cardsPlans();
      if (res?.success) {
        setPlans(res.data as PlanData[] | null);
      } else {
        console.error("Error fetching word count:", res.data);
      }
    } catch (error) {
      console.error("Error fetching word count:", error.message);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="absolute top-14 right-0 md:px-20 md:py-10 p-6 w-full lg:w-[calc(100%-250px)] mx-auto text-white">
      <div className="text-base text-slate-400 font-light p-2 flex items-center gap-2">
        <Link href="/user/dashboard">Dashboard</Link>
        <FaChevronRight className="text-sm" />
        <Link href="/user/intelli-apis">Intelli APIs</Link>
      </div>

      <h2 className="text-3xl font-semibold p-2 pb-3">Intelli APIs Pricing</h2>
      <div className="flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-4">
          {pricingData?.map((card) => (
            <PricingCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanPage;
