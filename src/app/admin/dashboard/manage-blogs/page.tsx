"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { useWebContext } from '@/context/ContextProvider';
import BlogCard from "@/components/BlogCard";

const dashboard = () => {
  const router = useRouter();
  const { blogs } = useWebContext();
  const [isAdmin, setIsAdmin] = useState(true);
  const adminEmail = typeof window !== "undefined" ? sessionStorage.getItem("adminEmail") : null;
  useEffect(() => {
    const adminTokens = sessionStorage.getItem("admintokens");
    if (!adminTokens) {
      setIsAdmin(true)
      router.push('/admin/intelli-admin');
    } else {
      setIsAdmin(false)
    }
  }, [router]);

  return (
    <>
      {isAdmin ?
        <div className="w-full flex justify-center items-center h-screen">
          <div className={`h-20 w-20 animate-spin rounded-full text-white border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`} />
        </div> :
        <>
          <div className="py-4 px-10 w-full bg-white/10 text-lg text-white">
            {adminEmail}
          </div>
          <p className="w-full md:text-5xl text-3xl text-white p-10">Welcome to Admin Panel</p>
          <div className="w-full flex flex-col justify-center items-center p-5 my-10">
            <div className="md:w-4/5 w-full flex flex-col md:flex-row items-center justify-between md:gap-36">
              <p className="text-gradient py-5 text-xl md:text-3xl font-semibold md:text-center">Blog List</p>
              <Link href="/admin/dashboard/blog-editor">
                <Button
                  title="Add New Blog"
                  btnType="submit"
                />
              </Link>
            </div>


            <div className="md:w-4/5 w-full h-full gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-1">
              {blogs.length > 0 ? (
                blogs.map(blog => <BlogCard key={blog.id} item={blog} />)
              ) : (
                <div className="text-center p-6 font-medium text-3xl w-full">
                  Nothing to show
                </div>
              )}
            </div>
          </div>
        </>
      }
    </>
  );
};

export default dashboard;
