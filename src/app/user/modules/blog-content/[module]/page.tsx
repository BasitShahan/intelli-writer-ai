"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaChevronRight } from "react-icons/fa6";
import Article from "@/components/Content/blog-content/Article";
import ContentResponse from "@/components/Content/ContentResponse";
import TitleContent from "@/components/Content/blog-content/TitleContent";
import BlogBody from "@/components/Content/blog-content/BlogBody";
import BlogDesc from "@/components/Content/blog-content/BlogDesc";
import BlogGetContent from "@/components/Content/blog-content/BlogGetContent";

const ModuleLayout = () => {
  const { module }: any = useParams();
  const pageTitle = module.replace(/-/g, " ");

  const blogPages = [
    "blog-intro",
    "blog-listicle",
    "blog-outline",
    "blog-outro",
    "blog-tags",
    "blog-talkings-points"
  ];

  const blogBody = [
    "blog-paragraph",
    "blog-section",
  ];

  const blogDesc = [
    "blog-post",
    "paragraph",
    "startup-names"
  ];

  const blogContent = [
    "blog-title",
    "content-grammar",
    "content-rewriter",
    "content-summary",
  ];

  return (
    <div className="absolute top-14 right-0 md:px-20 md:py-10 p-6 w-full lg:w-[calc(100%-250px)] mx-auto text-white overflow-y-auto">
      {/* Top Section */}
      <div className="w-full pb-4">
        {/* Top Breadcrumbs */}
        <div className="text-base text-slate-400 font-light p-2 flex items-center gap-2">
          <Link href="/user/dashboard">Dashboard</Link>
          <FaChevronRight className="text-sm" />
          <Link href="/user/blog-content">Blog Content</Link>
          <FaChevronRight className="text-sm" />
          <Link
            href={`/user/modules/blog-content/${module}`}
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
          {module === "article" ? (
            <Article type={module} />
          ) : blogPages.includes(module) ? (
            <TitleContent type={module} />
          ) : blogBody.includes(module) ? (
            <BlogBody type={module} />
          ) : blogDesc.includes(module) ? (
            <BlogDesc type={module} />
          ) : blogContent.includes(module) ? (
            <BlogGetContent type={module} />
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
