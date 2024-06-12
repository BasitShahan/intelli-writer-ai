"use client";

import { contentApisData } from "@/constants/apisData";
import { useWebContext } from "@/context/ContextProvider";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ContentItem {
  params: { pages: string };
  id: string;
  title: string;
  link: string;
  endpoint: string;
  description: string;
  details: Array<{
    heading: string;
    method: string;
    route: string;
    description?: string;
    hasBullets?: boolean;
    bullets?: Array<{ paramTitle: string; type: string; description: string }>;
    hasCode?: boolean;
    code?: string;
    hasStatus?: boolean;
    bulletStatus?: Array<{ status: string; description: string }>;
    hasUsage?: boolean;
    bulletUsage?: Array<string>;
  }>;
  codeBlock: {
    javascript: string;
    python: string;
    java: string;
  };
}

const InnerPage: React.FC<ContentItem> = ({ params }) => {
  const { setApiSidebartoggle } = useWebContext();
  const [language, setLanguage] = useState<"javascript" | "python" | "java">(
    "javascript"
  );
  const [copyButtonText, setCopyButtonText] = useState("Copy");
  const codeBlock = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for potential data mismatches and handle them gracefully here
  }, [contentApisData]);

  const handleLanguageChange = (
    selectedLanguage: "javascript" | "python" | "java"
  ) => {
    setLanguage(selectedLanguage);
  };

  const handleCopyClick = () => {
    if (codeBlock.current) {
      const selectedItem = contentApisData.find(
        (item) => item.title === params.pages
      );
      if (selectedItem) {
        const textToCopy = selectedItem.codeBlock[language];
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();

        document.execCommand("copy");
        document.body.removeChild(textArea);

        setCopyButtonText("Copied");
        setTimeout(() => {
          setCopyButtonText("Copy");
        }, 2000);
      }
    }
  };

  return (
    <div className="lg:w-4/5 md:w-2/3 w-full py-10">
      <div className="sm:px-8 p-4 md:hidden block text-white">
        <AiOutlineMenu
          className="text-xl cursor-pointer"
          onClick={() => setApiSidebartoggle(true)}
        />
      </div>

      <div className="text-white w-full p-4 lg:p-12">
        {contentApisData.map((item) =>
          item.link === params.pages ? (
            <div key={item.id}>
              {/* API Information */}
              <h2 className="md:text-3xl text-2xl mb-6 w-fit font-lobster-two font-semibold text-left">
                {item.title}
              </h2>

              <SyntaxHighlighter
                language={"json"}
                style={coldarkDark}
                showLineNumbers={true}
                className="custom-scrollbar w-[cal(100% - 300px)] rounded-lg drop-shadow-xl endpoint-scrollbar"
              >
                {item.endPoint}
              </SyntaxHighlighter>

              {/* API Page Body */}
              {item.details.map((e) => (
                <div key={e.heading} className="mt-6">
                  <h2 className="text-lg font-semibold">{e.heading}</h2>

                  {/* Method + Route */}
                  <>
                    <span
                      className={`${
                        e.method === "GET"
                          ? "text-green-500"
                          : e.method === "POST"
                          ? "text-orange-400"
                          : ""
                      } font-thin`}
                    >
                      {e.method}
                    </span>{" "}
                    <span className="text-gray-400">{e.route}</span>
                  </>

                  {/* Paragraph */}
                  {e.description && (
                    <p className="font-thin">{e.description}</p>
                  )}

                  {e.hasBullets ? (
                    <ul className="list-disc pl-5">
                      {e.bullets.map((bullet) => (
                        <li key={bullet.paramTitle}>
                          <span className="text-purple-500 mr-1">
                            {bullet.paramTitle}
                          </span>{" "}
                          <span className="font-thin opacity-70 mr-1">
                            ({bullet.type})
                          </span>{" "}
                          <span className="font-thin">
                            {bullet.description}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    ""
                  )}

                  {e.hasCode ? (
                    <SyntaxHighlighter
                      language={"json"}
                      style={coldarkDark}
                      showLineNumbers={true}
                      className="custom-scrollbar rounded-lg drop-shadow-xl"
                    >
                      {e.code}
                    </SyntaxHighlighter>
                  ) : (
                    ""
                  )}

                  {e.hasStatus ? (
                    <ul className="list-disc pl-5">
                      {e.bulletStatus.map((bullet) => (
                        <li key={bullet.status}>
                          <span
                            className={`${
                              bullet.status === "200 OK"
                                ? "text-blue-500"
                                : bullet.status === "400 Bad Request"
                                ? "text-red-500"
                                : ""
                            } mr-1`}
                          >
                            {bullet.status}
                          </span>
                          {": "}
                          <span className="font-thin">
                            {bullet.description}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    ""
                  )}

                  {e.hasUsage ? (
                    <ul className="list-disc pl-5">
                      {e.bulletUsage.map((bullet, i) => (
                        <li key={i} className="font-thin">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    ""
                  )}
                </div>
              ))}

              {/* Description */}
              <p className="mt-4 font-thin">{item.description}</p>

              {/* Code Block */}
              <div className="relative rounded-lg overflow-hidden py-6">
                {/* Language selection buttons */}
                <div className="flex -mb-3">
                  <button
                    className={`text-sm px-2 py-2 w-1/3 bg-gray-800 hover:border rounded-tl-lg hover:border-cyan-500 hover:text-cyan-500  ${
                      language === "javascript"
                        ? " border border-cyan-500 text-cyan-500"
                        : " text-white"
                    }`}
                    onClick={() => handleLanguageChange("javascript")}
                  >
                    Node.js
                  </button>
                  <button
                    className={`text-sm px-2 py-2  w-1/3 bg-gray-800 hover:border hover:border-cyan-500 hover:text-cyan-500 ${
                      language === "python"
                        ? "border border-cyan-500 text-cyan-500"
                        : " text-white"
                    }`}
                    onClick={() => handleLanguageChange("python")}
                  >
                    Python
                  </button>
                  <button
                    className={`text-sm px-2 py-2 w-1/3 bg-gray-800 hover:border rounded-tr-lg hover:border-cyan-500 hover:text-cyan-500 ${
                      language === "java"
                        ? " border border-cyan-500 text-cyan-500"
                        : " text-white"
                    }`}
                    onClick={() => handleLanguageChange("java")}
                  >
                    Java
                  </button>
                </div>

                {/* Code block with syntax highlighting */}
                <div className="flex items-center justify-end">
                  <button
                    onClick={handleCopyClick}
                    className="copyButton self-end bg-gray-700  text-white rounded-full text-sm px-2 pt-0.5 pb-1 -mb-[46px] mr-2"
                  >
                    {copyButtonText}
                  </button>
                </div>

                <div
                  ref={codeBlock}
                  className="bg-[#111B27] pt-5 rounded-b-lg overflow-hidden"
                >
                  <SyntaxHighlighter
                    language={language}
                    style={coldarkDark}
                    showLineNumbers={true}
                    className="custom-scrollbar"
                  >
                    {item.codeBlock[language]}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
};

export default InnerPage;
