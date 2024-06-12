"use client";

import Cards from "@/components/Cards";
import { IntelliApiData } from "@/constants";
import { useWebContext } from "@/context/ContextProvider";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { BiDockLeft } from "react-icons/bi";

const DocsPage = () => {
  const { setApiSidebartoggle } = useWebContext();

  return (
    <div className="lg:w-4/5 md:w-2/3 w-full py-10">
      <div className="sm:px-8 p-4 md:hidden block text-white">
        <AiOutlineMenu
          className="text-xl cursor-pointer"
          onClick={() => setApiSidebartoggle(true)}
        />
      </div>

      <div className="w-full p-4 lg:p-12 md:p-8 md:flex flex-col justify-between gap-4">
        {/* Top Heading */}
        <h1 className="text-4xl font-semibold text-left">API Docs</h1>

        <p className="text-gray-300 mb-4">
          Welcome to the documentation page for the Intelliwriter API Landing
          Page. Here, you will find detailed information and instructions on how
          to use our API, integrate it into your applications, and more.
        </p>

        {/* Content APIs */}
        <div className="w-full">
          <div className="flex py-5 gap-2 w-full">
            <BiDockLeft size={25} />
            <h2 className="font-medium text-2xl">Content APIs:</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {IntelliApiData.map((item) => (
              <Link key={item.id} href={item.link}>
                <Cards data={item} />
              </Link>
            ))}
          </div>
        </div>

        {/* Image APIs */}
        {/* <div className='w-full'>
                    <div className='flex py-5 gap-2'>
                        <IoIosImages size={25} />
                        <h2 className='font-medium text-2xl'>Image APIs:</h2>
                    </div>

                    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                        {ImageApiData.map((item) => (
                            <Link key={item.id} href={item.link}>
                                <Cards data={item} />
                            </Link>
                        ))}
                    </div>
                </div> */}

        {/* Voice APIs */}
        {/* <div className='w-full'>
                    <div className='flex py-5 gap-2'>
                        <RiVoiceprintFill size={25} />
                        <h2 className='font-medium text-2xl'>Voice APIs:</h2>
                    </div>

                    {VoiceApiData.length !== 0 ? (
                        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                            {VoiceApiData.map((item) => (
                                <Link key={item.id} href={item.link}>
                                    <Cards data={item} />
                                </Link>
                            ))}
                        </div>
                    ) :
                        <h2 className='text-sm text-gray-300 text-center py-2'>No API Available!</h2>
                    }
                </div> */}
      </div>
    </div>
  );
};

export default DocsPage;
