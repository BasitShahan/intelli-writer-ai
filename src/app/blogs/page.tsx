"use client";

import Button from "@/components/Button";
import { blogpost } from "@/constants";
import Link from "next/link";
import React from "react";

const BlogPage = () => {
  const firstCard = blogpost.find((card) => card.id === 1);

  return (
    <>
      <div className="p-10 xl:mx-52 text-white">
        <div className="w-full pb-10 gap-1 flex flex-col items-center justify-center text-center">
          <h2 className="text-5xl font-bold">Welcome to Intelli-Blogs</h2>
          <p className="w-3/5 text-white-50">Dive into the forefront of AI innovation with GPT-4. Discover the latest news, trends, and insights in the realm of generative AI.</p>
        </div>
        {firstCard && (
          <div className="w-full flex md:flex-row gap-5 flex-col text-white md:justify-start justify-center md:items-center">
            <div className="lg:w-3/5 md:w-1/2 h-[400px] w-full">
              <img
                src={firstCard.image}
                alt={firstCard.image}
                className="object-cover object-center w-[600px] h-[400px] rounded-2xl"
              />
            </div>
            <div className="lg:w-3/5 md:w-1/2 w-full flex flex-col p-6">
              <p className="text-sm">{firstCard.date}</p>
              <h4 className="font-semibold mt-5 text-2xl">{firstCard.title}</h4>
              <p className=" mt-2 mb-4 text-base ">
                {firstCard.desc.split(" ").length > 40
                  ? `${firstCard.desc
                    .replace(/(<([^>]+)>)/gi, "")
                    .split(" ")
                    .slice(0, 40)
                    .join(" ")}...`
                  : firstCard.desc.replace(/(<([^>]+)>)/gi, "")}
              </p>
              <Link href={firstCard.link}>
                <div>
                  <Button
                    title="Continue Reading"
                    btnType="button"
                    className="py-10"
                  />
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="p-10 xl:mx-52 flex flex-col gap-5">
        <h2 className="text-3xl font-bold text-white">Recent Blogs</h2>
        <div className=" items-center justify-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 md:gap-10 gap-6">
          {blogpost.map(
            (post) =>
              post.id !== 1 && (
                <Link href={post.link} key={post.id}>
                  <div className="w-full flex flex-col justify-between h-full gap-3">
                    <img
                      src={post.image}
                      alt={post.image}
                      className="h-[400px] w-[400px] rounded-2xl"
                    />
                    <div className="w-full text-white text-sm md:text-base xl:text-lg flex justify-between flex-col xl:h-[120px] lg:h-[120px] md:h-[130px] sm:h-[125px] h-full">
                      <h4 className="font-semibold">
                        {post.title.split(" ").length > 4
                          ? `${post.title.split(" ").slice(0, 4).join(" ")}...`
                          : post.title}{" "}
                      </h4>
                      <div className="text-sm">{post.desc.split(" ").length > 8
                          ? `${post.desc.split(" ").slice(0, 8).join(" ")}...`
                          : post.desc}{" "}</div>
                      <div className="border-t-2 border-[#ffffff37] my-3 py-3">
                        <p className="text-sm">{post.date}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              )
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
