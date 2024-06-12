"use client";

import Button from "@/components/Button";
import ImagesCollection from "@/components/ImagesCollection";
import generateImages from "@/utils/generateImages";
import cogoToast from "cogo-toast";
import React, { useEffect, useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import { RiCameraLensLine } from "react-icons/ri";
import Select from "react-select";

type Option = {
  value: string;
  label: string;
};

const ImageGeneratorPages = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [inputText, setInputText] = useState("");
  const [progress, setProgress] = useState(0);
  const [selectedOption, setSelectedOption] = useState<Option>({
    value: "1:1",
    label: "1:1",
  });
  const [tabsHistory, setTabsHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [showDefaultImages, setShowDefaultImages] = useState(true);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    const storedHistory = localStorage.getItem("tabsHistory");
    if (storedHistory) {
      setTabsHistory(JSON.parse(storedHistory));
    }

    if (tabsHistory.length === 0) {
      setActiveTab("All");
    }

    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, []);

  const handleClearHistory = () => {
    localStorage.removeItem("tabsHistory");
    setTabsHistory([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      cogoToast.error("Please enter input to generate.");
      return;
    }

    setLoading(true);
    const currentInputText = inputText;

    try {
      const { success, response } = await generateImages({
        prompt: inputText,
        userId: sessionStorage.getItem("userId"),
        aspectRatio: selectedOption.value,
      });

      if (success) {
        setProgress(0);
        const imageUrls = response?.images;
        if (!imageUrls || imageUrls.length === 0) {
          cogoToast.error("Please upgrade your plan to generate images.");
          setLoading(false);
          return;
        }
        setImages(imageUrls);
        setShowDefaultImages(false);
        setLoading(false);

        setTabsHistory((prevHistory) => {
          const updatedHistory = [...prevHistory, currentInputText];
          localStorage.setItem("tabsHistory", JSON.stringify(updatedHistory));
          return updatedHistory;
        });
        setInputText("");
      } else {
        cogoToast.error("Image count is zero. Please upgrade your plan");
        setLoading(false);
      }
    } catch (error) {
      cogoToast.error("Something went wrong. Please try again later.");
      setLoading(false);
    }
  };


  const handleTabChange = (tab: string, query?: string) => {
    setActiveTab(tab);
    if (tab === "All") {
      setShowDefaultImages(true);
    } else {
      setShowDefaultImages(false);
    }
    if (query) {
      setInputText(query);
    } else {
      setInputText("");
    }
    if (tab !== "All") {
      handleGenerate();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  const openModal = (index: number): void => {
    setSelectedImage(index);
  };

  const closeModal = (): void => {
    setSelectedImage(null);
  };

  const downloadImage = async (imageUrl: string): Promise<void> => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `intelliwriter_${Date.now()}.${blob.type.split("/")[1]}`;
      link.click();
    } catch (error) {
      console.error("Error downloading image:", error);
      // cogoToast.error("Failed to download image. Please try again later.");
    }
  };

  const option: Option[] = [
    { value: "1:1", label: "1:1" },
    { value: "1:2", label: "1:2" },
    { value: "1:3", label: "1:3" },
  ];

  const styles = {
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "#00BBFE"
        : state.isSelected
          ? "#00BBFE"
          : "transparent",
    }),
  };

  return (
    <div className=" h-screen overflow-y-hidden fixed top-14 right-0 md:px-20 md:py-5 p-6 w-full lg:w-[calc(100%-250px)] text-white flex">
      <div className="flex flex-col w-full gap-4 relative">
        <div className="tabs flex gap-4 items-center justify-between">
          <div className="flex items-center gap-3 overflow-x-auto max-w-full scrollbar-hide">
            <Tab
              title="All"
              onClick={() => handleTabChange("All")}
              isActive={activeTab === "All"}
            />
            {tabsHistory.map((query, index) => (
              <Tab
                key={index}
                title={query.slice(0, 12) + (query.length > 12 ? "..." : "")}
                onClick={() => handleTabChange("History", query)}
                isActive={activeTab === "History" && inputText === query}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleClearHistory}
            className="text-[16px] font-[600] border-2 border-cyan-50 px-[12px] py-[3px] rounded-[6px] "
          >
            Clear
          </button>
        </div>
        <div className="w-full relative flex-grow">
          {loading ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                <div className="bg-[rgba(32,45,72,0.41)] w-full h-[150px] md:h-[350px] rounded-lg card-reload"></div>
                <div className="bg-[rgba(32,45,72,0.41)] w-full h-[150px] md:h-[350px] rounded-lg card-reload"></div>
                <div className="bg-[rgba(32,45,72,0.41)] w-full h-[150px] md:h-[350px] rounded-lg card-reload"></div>
                <div className="bg-[rgba(32,45,72,0.41)] w-full h-[150px] md:h-[350px] rounded-lg card-reload"></div>
              </div>
            </>
          ) : (
            <>
              {showDefaultImages ? (
                <ImagesCollection />
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                  {images.map((imageUrl, index) => (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`Image ${index}`}
                      className="w-full h-[150px] md:h-[350px] cursor-pointer rounded-[12px] "
                      onClick={() => openModal(index)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        <div className="mt-4 bottom-[10%] absolute w-full">
          <div className="relative">
            <textarea
              rows={1} // Set rows to 1
              value={inputText}
              ref={textAreaRef}
              onChange={handleInputChange}
              onKeyDown={(e) => handleKeyDown(e)}
              className="w-full pl-1 md:pl-12 pr-44 md:pr-48 py-4 h-16 rounded-[12px] flex text-white border bg-[#0f1021] focus:outline-none border-gradient-blue-purple scrollbar-hide overflow-hidden"
              style={{ lineHeight: "2.2" }}
              placeholder="Describe your image, including objects and colors!"
            />
            <div className="hidden md:flex absolute inset-y-0 left-0 items-center pl-3">
              <RiCameraLensLine className="text-[#a87fdb] text-2xl" />
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-2 md:space-x-4">
              <Select
                className="w-[100px] md:w-[120px]"
                defaultValue={selectedOption}
                onChange={(e) => setSelectedOption(e as Option)}
                options={option}
                styles={styles}
              />
              <button
                type="button"
                onClick={handleGenerate}
                className="bg-gradient-to-bl transition-all duration-300 from-btnPrimary to-btnSecondary font-semibold p-[12px] rounded-md h-fit flex justify-between items-center gap-2 hover:opacity-90 "
              >
                <BsSend className="text-white text-lg" />
              </button>
            </div>
            {selectedImage !== null && (
              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div
                  className="max-w-2xl w-full relative"
                  style={{ width: "800px", height: "600px" }}
                >
                  <img
                    alt={`Image ${selectedImage}`}
                    width={800}
                    height={600}
                    className="block h-full w-full rounded-lg object-cover object-center"
                    src={images[selectedImage]}
                  />
                  <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4">
                    <button
                      type="button"
                      className="text-white bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                    <Button
                      btnType="button"
                      title="Download"
                      className="!w-fit !rounded-lg"
                      onClick={() => downloadImage(images[selectedImage])}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

type TabProps = {
  title: string;
  isActive: boolean;
  onClick: () => void;
};

const Tab: React.FC<TabProps> = ({ title, isActive, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 whitespace-nowrap bg-gray-700 py-2 capitalize text-sm font-medium focus:outline-none rounded-[6px] ${isActive
          ? "bg-gradient-to-bl transition-all duration-300 from-btnPrimary to-btnSecondary text-white"
          : "text-white"
        }`}
    >
      {title}
    </button>
  );
};

export default ImageGeneratorPages;
