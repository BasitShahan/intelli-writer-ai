"use client";

import Image from "next/image";
import ChatComponent from "@/components/ChatComponent";
import { FaSquare } from "react-icons/fa";
import { CHAT_STEPS } from "@/constants/dashboard";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { BsSend } from "react-icons/bs";
import { RiAttachmentLine } from "react-icons/ri";
import { useMediaQuery } from "react-responsive";
import { logoMin } from "../../../../public";

const page = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(true);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [userMessages, setUserMessages] = useState<
    { text: string; sender: string }[]
  >([]);
  const [textAreaHeight, setTextAreaHeight] = useState<string>("3.2rem");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const isSmallMobile = useMediaQuery({ maxWidth: 640 });

  const generateResponse = async (): Promise<void> => {
    setLoading(true);
    try {
      const newUserMessage = { text: userInput, sender: "user" };
      setUserMessages([newUserMessage]);

      setTimeout(() => {
        setShowInput(false);
        setLoading(false);
        setUserInput("");
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Error occurred!");
      setShowInput(false);
      setLoading(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      generateResponse();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setUserInput(event.target.value);
    const computedHeight =
      event.target.scrollHeight > 108
        ? "6rem"
        : event.target.value
        ? `${event.target.scrollHeight}px`
        : "3.2rem";
    setTextAreaHeight(computedHeight);
  };

  useEffect(() => {
    const initialHeight = "3.2rem";
    setTextAreaHeight(initialHeight);
  }, []);

  return (
    <div
      className="absolute top-14 right-0 md:px-20 md:py-10 p-6 w-full lg:w-[calc(100%-250px)] mx-auto text-white flex flex-col justify-between py-6 items-center"
      style={{
        height: "calc(100vh - 44px)",
      }}
    >
      {!showInput && <ChatComponent userMessages={userMessages} />}

      {showInput && (
        <div>
          {isSmallMobile ? (
            <div className="flex justify-center items-center gap-2 mt-16">
              <Image src={logoMin} alt="logo" width={50} height={50} />
              <h2 className="text-[rgba(247,15,255,1)] text-[18px] font-bold ">
                How can I assist you?
              </h2>
            </div>
          ) : (
            <div className="hidden md:flex justify-center ">
              <ul className="grid grid-cols-1 text-white sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-16">
                {CHAT_STEPS.map((step, index) => (
                  <li
                    key={index}
                    className={`${
                      index === 0 || index === CHAT_STEPS.length - 1
                        ? "order-first"
                        : "order-last"
                    } ${index === 2 ? "mt-8" : ""}`}
                  >
                    <img
                      src={step.image}
                      alt="Step Image"
                      className="w-[250px] md:w-full h-auto"
                    />
                    <div className="flex justify-center mt-4 items-center flex-col text-center gap-2">
                      <h2 className="text-[rgba(247,15,255,1)] text-[18px] md:text-lg font-bold">
                        {step.title}
                      </h2>
                      <p className="max-w-[240px] md:max-w-none text-white text-[16px] md:text-base font-semibold">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 fixed bottom-[12px]">
        <div className="relative">
          <textarea
            rows={1}
            ref={inputRef}
            value={userInput}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter your text here"
            className=" w-[calc(100vw-50px)] md:w-[calc(100vw-350px)] pl-14 md:pr-32 pr-32 pb-8 md:pb-5 rounded-[12px] flex py-4 text-white border bg-[#0f1021] focus:outline-none border-gradient-blue-purple scrollbar-hide "
          ></textarea>

          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <RiAttachmentLine className="text-[#a87fdb] text-2xl" />
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-4">
            <button
              type="button"
              onClick={generateResponse}
              disabled={!userInput}
              className="bg-gradient-to-bl from-btnPrimary to-btnSecondary font-semibold p-[12px] rounded-md h-fit flex justify-between items-center gap-2 hover:opacity-90 "
            >
              {isLoading ? (
                <FaSquare className="text-white text-lg animate-spin" />
              ) : (
                <BsSend className="text-white text-lg" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;