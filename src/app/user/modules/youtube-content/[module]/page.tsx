"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaChevronRight } from "react-icons/fa6";
import ContentGenerator from "@/components/Content/youtube-content/ContentGenerator";
import Summarizer from "@/components/Content/youtube-content/Summarizer";

const ModuleLayout = () => {
  const { module }: any = useParams();
  const pageTitle = module.replace(/-/g, " ");


  return (
    <div className="absolute top-14 right-0 md:px-20 md:py-10 p-6 w-full lg:w-[calc(100%-250px)] mx-auto text-white overflow-y-auto">
      {/* Top Section */}
      <div className="w-full pb-4">
        {/* Top Breadcrumbs */}
        <div className="text-base text-slate-400 font-light p-2 flex items-center gap-2">
          <Link href="/user/dashboard">Dashboard</Link>
          <FaChevronRight className="text-sm" />
          <Link href="/user/youtube-content">Youtube Content</Link>
          <FaChevronRight className="text-sm" />
          <Link
            href={`/user/modules/youtube-content/${module}`}
            className="capitalize"
          >
            {pageTitle}
          </Link>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-medium p-2 pb-3 capitalize">
          {pageTitle}
        </h2>
      </div>

      <div className="flex w-full md:flex-row flex-col gap-5">
        <div className="md:w-full w-full">
          {module === "content-generator" ? (
            <ContentGenerator type={module} />
          ) : module === "content-summarizer" ? (
            <Summarizer type={module} />
          ) : (
            <div className="w-full h-screen flex items-center justify-center text-2xl opacity-80">
              No module found!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModuleLayout;
