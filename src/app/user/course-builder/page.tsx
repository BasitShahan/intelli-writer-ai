"use client";

import { Course } from "@/constants/dashboard";
import Link from "next/link";
import React from "react";
import { FaChevronRight } from "react-icons/fa6";

const CourseBuilderPage = () => {
  return (
    <div className="absolute top-14 right-0 md:px-20 md:py-10 p-6 w-full lg:w-[calc(100%-250px)] mx-auto text-white">
      <div className="text-base text-slate-400 font-light p-2 flex items-center gap-2">
        <Link href="/user/dashboard">Dashboard</Link>
        <FaChevronRight className="text-sm" />
        <Link href="/user/course-builder">Course Builder</Link>
      </div>

      <h1 className="text-3xl font-semibold p-2 pb-3">Course Builder</h1>
      <div className="grid grid-cols-1 gap-5 py-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Course.map((item) => (
          <Link
            href={item.url}
            key={item.id}
            className="flex flex-col rounded-lg py-4 px-6 bg-[rgba(32,45,72,0.41)] text-white gap-2 overflow-hidden border border-[#FFFFFF14] cursor-pointer"
          >
            <span className=" bg-[#f3e8ff] block w-10 h-10 rounded-md text-[#9333ea] text-2xl  p-2">
              {React.createElement(item.icon)}
            </span>
            <div className="text-lg font-bold">{item.title}</div>
            <div className="text-sm -mt-2 text-slate-400">
              {item.description}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CourseBuilderPage;
