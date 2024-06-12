"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaChevronRight } from "react-icons/fa6";
import ContentResponse from "@/components/Content/ContentResponse";
import Audience from "@/components/Content/marketing/Audience";
import Business from "@/components/Content/marketing/Business";
import HelpWanted from "@/components/Content/marketing/HelpWanted";
import JobDescription from "@/components/Content/marketing/JobDescription";
import CompDesc from "@/components/Content/marketing/CompDesc";
import NewsLetter from "@/components/Content/marketing/NewsLetter";
import PressRelease from "@/components/Content/marketing/PressRelease";
import PushNotification from "@/components/Content/marketing/PushNotification";
import StartupIdeas from "@/components/Content/marketing/StartupIdeas";
import BlogDesc from "@/components/Content/blog-content/BlogDesc";

const ModuleLayout = () => {
  const { module }: any = useParams();
  const pageTitle = module.replace(/-/g, " ");

  const audience = [
    "advertisement",
    "facebook-advertisement",
    "google-advertisement",
    "value-proposition",
  ];

  const compdesc = [
    "mission-statement",
    "vision-statement",
    "welcome-email",
    "pain-agitate-solution",
    "product-sheet",
  ];

  return (
    <div className="absolute top-14 right-0 md:px-20 md:py-10 p-6 w-full lg:w-[calc(100%-250px)] mx-auto text-white overflow-y-auto">
      {/* Top Section */}
      <div className="w-full pb-4">
        {/* Top Breadcrumbs */}
        <div className="text-base text-slate-400 font-light p-2 flex items-center gap-2">
          <Link href="/user/dashboard">Dashboard</Link>
          <FaChevronRight className="text-sm" />
          <Link href="/user/marketing">Marketing</Link>
          <FaChevronRight className="text-sm" />
          <Link
            href={`/user/modules/marketing/${module}`}
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
        <div className="md:w-1/2 w-full">
          {module === "business-tagline" ? (
            <Business type={module} />
          ) : module === "help-wanted" ? (
            <HelpWanted type={module} />
          ) : module === "job-description" ? (
            <JobDescription type={module} />
          ) : audience.includes(module) ? (
            <Audience type={module} />
          ) : compdesc.includes(module) ? (
            <CompDesc type={module} />
          ) : module === "newsletter" ? (
            <NewsLetter type={module} />
          ) : module === "press-release" ? (
            <PressRelease type={module} />
          ) : module === "push-notification" ? (
            <PushNotification type={module} />
          ) : module === "startup-ideas" ? (
            <StartupIdeas type={module} />
          ) : module === "startup-names" ? (
            <BlogDesc type={module} />
          ) : (
            <div className="w-full h-screen flex items-center justify-center text-2xl opacity-80">
              No module found!
            </div>
          )}
        </div>

        <div className="md:w-1/2 w-full">
          <ContentResponse />
        </div>
      </div>
    </div>
  );
};

export default ModuleLayout;
