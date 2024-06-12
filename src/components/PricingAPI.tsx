import { RxCheck, RxCross2 } from "react-icons/rx";
import React from 'react';

interface Feature {
  id: number;
  icon: boolean;
  boldWord: string;
  feature: string;
}

interface PricingCardProps {
  name: string;
  price: number;
  offer: string;
  desc: string;
  features: Feature[];
  calls: string;
}

const PricingCard: React.FC<PricingCardProps> = ({ name, price, offer, desc, features, calls }) => {
  return (
    <div className={`xs:w-[350px] w-full overflow-hidden shadow-lg mx-2 my-4 py-8 text-white flex flex-col justify-between bg-[#191a3a] ${name === 'Developer' ? 'gradient-border-active' : ''} gradient-border rounded-xl`}>
      {/* Add "Most Popular" tag for the 'Developer' plan */}
      <div className={`${name === 'Developer' ? 'bg-[#1eb0ca] text-white text-opacity-80 text-sm w-full h-7 flex items-center justify-center rounded-t-lg  font-semibold -translate-y-8' : ''}`}>
        <div className="">
          {name === 'Developer' && 'Most Popular'}
        </div>
      </div>

      {/* Top Pricing */}
      <div className="px-6 pt-4 flex flex-col justify-between items-center">
        <span className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-300 to-blue-500">
          {name}
        </span>

        <p className="lg:text-4xl text-3xl my-3">${price}/month</p>

        <div className="w-fit group lg:text-base text-sm items-center rounded-full bg-gradient-to-r from-[#1eb0ca] to-[#ac5dfa] py-1.5 lg:px-8 px-4 transition-all duration-100">
          {offer}
        </div>

        <div className="py-3 lg:text-base text-sm text-white w-full font-extralight border-b border-gray-600">
          {desc}
        </div>
      </div>

      {/* Middle features */}
      <div className="p-6 pb-2 w-full flex h-full">
        <ul className="space-y-3">
          {features.map(item => (
            <li key={item.id} className="mb-2 flex gap-3 items-center">
              {item.icon ? (
                <RxCheck className="w-4.5 h-4 bg-gradient-to-tr from-[#011DFD] to-[#DE1DF5] rounded-full" />
              ) : (
                <RxCross2 className="w-4.5 h-4 bg-gradient-to-tr from-[#011DFD] to-[#DE1DF5] rounded-full" />
              )}
              <div className="space-x-2 lg:text-base text-sm">
                <span className="font-medium">{item.boldWord}</span>
                <span className="font-extralight">{item.feature}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-5 pb-0 lg:text-base text-sm">
        <div className="py-3 space-x-2 text-white w-full font-extralight border-t border-gray-600">
          <span className="font-medium">{calls}</span>
          <span>API calls per month</span>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
