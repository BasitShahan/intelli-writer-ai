"use client";

import { blogpost } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PostSidebar from "@/components/PostSidebar";
import { usePathname } from "next/navigation";
import { FaChevronRight } from "react-icons/fa";

const BlogPost = () => {
  const pathname = usePathname();

  return (
    <>
      {blogpost.map(item => (
        pathname === item.link ? (
          <div className="container mx-auto flex xl:flex-row flex-col justify-center gap-10 w-11/12">
            <div className="xl:w-3/4 w-full text-white py-10">
              <div key={item.id} className="w-full flex flex-col p-5 gap-4">
                {/* Top Breadcrumbs */}
                <div className="text-base text-slate-400 font-light p-2 flex items-center gap-2">
                  <Link href="/">Home</Link>
                  <FaChevronRight className="text-sm" />
                  <Link href="/blogs">Blogs</Link>
                  <FaChevronRight className="text-sm" />
                  <div className="capitalize">
                    {item.link.substring(item.link.lastIndexOf('/') + 1).split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </div>
                </div>

                <div className="py-6">
                  <h2 className="font-normal xl:text-6xl lg:text-5xl text-4xl mb-5">{item.title}</h2>
                  <p className="text-base text-slate-400">{item.date}</p>
                </div>

                <div className="w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.image}
                    width={900}
                    height={400}
                    className=" w-full md:h-[500px] h-[250px] object-cover"
                  />
                </div>
                <div className="text-lg py-10 font-normal opacity-full">
                  <p className="blog-stylings" dangerouslySetInnerHTML={{ __html: item.desc }}></p>
                </div>
              </div>
            </div>
            <div className="xl:w-1/4 w-full relative">
              <PostSidebar tags={item.tags} title={item.title} />
            </div>
          </div>
        ) : null
      ))}
    </>
  );
};

export default BlogPost;