"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useWebContext } from '@/context/ContextProvider';

const PostSidebar: React.FC<{ tags: string, title: string }> = ({ tags, title }) => {
  const { blogs } = useWebContext();

  const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];
  return (
    <div className={`w-full md:sticky top-0 pb-10 border-[#54515b] rounded-none text-white  pt-32 transition-all duration-200 custom-scrollbar`}>
      {/* Tags */}
      <div className=" w-full lg:w-[100%] relative flex flex-col gap-1 bg-[#121636] shadow-xl rounded-2xl p-6 my-6">
        <p className="border-l-4 border-[#c5268b] px-4 text-white text-2xl">
          Tags
        </p>

        <ul className="flex flex-col gap- justify-between list-disc p-5 text-lg font-extralight">
          {tagsArray.map((li, i) => (
            <li key={i} className="">#{li}</li>
          ))}
          {tagsArray.length === 0 &&
            <div>
              No tag to show
            </div>
          }
        </ul>
      </div>

      <div className=" w-full lg:w-[100%] relative flex flex-col gap-1 bg-[#121636] shadow-xl text-white rounded-2xl p-6 my-6">
        <p className="border-l-4 border-[#c5268b] px-4 text-white text-2xl">
          Recent Post
        </p>

        {blogs.slice(-5).map((item, id) => (
          title !== item.title ? (
            <Link href={`/blogs/${item.slug}`} key={id}
              className="w-full flex gap-5 "
            >
              <Image
                src={item.image}
                alt={item.image}
                width={75}
                height={75}
                className="rounded-md object-cover h-20 w-20"
              />
              <div className="flex flex-col gap-2">
                <p className="!text-white text-lg font-medium">{item.title}</p>
                <p className="text-sm">{item.publishDate}</p>
              </div>
            </Link>
          ) : null
        ))}
      </div>
    </div>
  );
};

export default PostSidebar;
