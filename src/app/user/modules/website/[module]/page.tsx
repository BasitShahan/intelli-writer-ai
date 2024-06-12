"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaChevronRight } from "react-icons/fa6";
import ContentResponse from "@/components/Content/ContentResponse";
import About from "@/components/Content/website/About";
import MetaDescription from "@/components/Content/website/MetaDescription";
import ProdDesc from "@/components/Content/website/ProdDesc";
import FeatureSection from "@/components/Content/website/FeatureSection";
import MetaKeyword from "@/components/Content/website/MetaKeyword";

const ModuleLayout = () => {
  const { module }: any = useParams();
  const pageTitle = module.replace(/-/g, " ");

  const about = [
    "about-us",
    "call-to-action",
    "headline",
    "subheadline",
  ];

  const proddesc = [
    "faq",
    "pros-and-cons",
    "review",
    "testimonial",
  ];

  return (
    <div className="absolute top-14 right-0 md:px-20 md:py-10 p-6 w-full lg:w-[calc(100%-250px)] mx-auto text-white overflow-y-auto">
      {/* Top Section */}
      <div className="w-full pb-4">
        {/* Top Breadcrumbs */}
        <div className="text-base text-slate-400 font-light p-2 flex items-center gap-2">
          <Link href="/user/dashboard">Dashboard</Link>
          <FaChevronRight className="text-sm" />
          <Link href="/user/website">Website</Link>
          <FaChevronRight className="text-sm" />
          <Link
            href={`/user/modules/website/${module}`}
            className={`${module === "call-to-action" ? '' : 'capitalize'}`}
          >
            {module === "call-to-action" ? 'Call to Action' : pageTitle}
          </Link>
        </div>

        {/* Title */}
        <h2 className={`text-3xl font-medium p-2 pb-3 ${module === "call-to-action" ? '' : 'capitalize'}`}>
          {module === "call-to-action" ? 'Call to Action' : pageTitle}
        </h2>
      </div>

      <div className="flex w-full md:flex-row flex-col gap-5">
        <div className="md:w-1/2 w-full">
          {module === "meta-description" ? (
            <MetaDescription type={module} />
          ) : about.includes(module) ? (
            <About type={module} />
          ) : proddesc.includes(module) ? (
            <ProdDesc type={module} />
          ) : module === "feature-section" ? (
            <FeatureSection type={module} />
          ) : module === "meta-keywords" ? (
            <MetaKeyword type={module} />
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
