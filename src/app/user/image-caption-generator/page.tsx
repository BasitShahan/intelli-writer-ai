"use client";
import ImageCaption from "@/utils/ImageCaption";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { MdClose, MdCloudUpload } from "react-icons/md";
import { TbSend } from "react-icons/tb";
import Select from "react-select";

interface selectOption {
  label?: string | undefined;
  value?: number;
}

const ImageCaptionGeneratorPage = () => {
  const [responses, setResponses] = useState<string[]>([]);
  const [image, setImage] = useState<File | Blob | null>(null);
  const [error, setError] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [tone, setTone] = useState<string>("");
  const [additionalInfo, setAdditionalInfo] = useState<string>("");
  const [copiedStates, setCopiedStates] = useState<string[]>([]);
  const [Tone, setAsgLevel] = useState<selectOption | null>(null);
  const [formData, setFormData] = useState({
    Tone: "",
  });

  const Tones = [
    { value: 1, label: "Funny" },
    { value: 2, label: "Happy" },
    { value: 3, label: "Serious" },
    { value: 4, label: "Sad" },
    { value: 5, label: "Angry" },
    { value: 6, label: "Ecstatic" },
    { value: 7, label: "Curious" },
    { value: 8, label: "Informative" },
    { value: 9, label: "Cute" },
    { value: 10, label: "Cool" },
    { value: 11, label: "Controversial" },
  ];


  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setImage(file);
    }
    else {
      setImage(null); 
    }
  };

  useEffect(() => {
    if (responses.length > 0) {
      setCopiedStates(Array(responses.length).fill("Copy"));
    }
  }, [responses]);

  const handleCancelImage = () => {
    setImage(null);
  };

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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    image: File | Blob | null
  ) => {
    e.preventDefault();
    setLoader(true);
    setError("");
    setResponses([]);
    try {
      if (!Tone) {
        setError("Caption Tone is required!");
        setLoader(false);
      }
      // if (!image) {
      //   setError("Image is requir");
      //   setLoader(false);
      // } else {
        const data = {
          image: image,
          tone: tone,
          additionalInfo: additionalInfo, 
        };

        const result = await ImageCaption(data);
        if (result.success) {
          setError("");
          setResponses(result.captions);
        } else {
          setError(result.message);
        }
        setLoader(false);
      // }
    } catch (error) {
      setError(`${error}`);
      setLoader(false);
    }
  };

  const handleCopy = (caption: string, index: number) => {
    setCopiedStates((prevCopiedStates) => {
      const newCopiedStates = [...prevCopiedStates];
      newCopiedStates[index] = "Copied";
      return newCopiedStates;
    });
    navigator.clipboard
      .writeText(caption)
      .then(() => {
        setTimeout(() => {
          setCopiedStates((prevCopiedStates) => {
            const newCopiedStates = [...prevCopiedStates];
            newCopiedStates[index] = "Copy";
            return newCopiedStates;
          });
        }, 5000);
      })
      .catch((err) => console.error("Failed to copy caption: ", err));
  };

  return (
    <div className="absolute top-14 right-0 md:px-20 md:py-5 p-6 w-full lg:w-[calc(100%-250px)] text-white">
      <div className="flex justify-center w-full flex-col h-full text-white md:py-10 py-5 -mt-6">
        <div className="text-base text-slate-400 font-light p-2 flex items-center gap-2">
          <Link href="/user/dashboard">Dashboard</Link>
          <FaChevronRight className="text-sm" />
          <Link href="/user/youtube-content">Image Caption Generator</Link>
        </div>
        <h2 className="text-3xl font-semibold p-2 pb-3">
          Image Caption Generator
        </h2>

        <div className="w-full flex flex-col justify-between items-center gap-5 py-5">
          {/* Prompt Form */}
          <form
            onSubmit={(e) => handleSubmit(e, image)}
            className="w-full border border-gray-600 rounded-md bg-[rgba(32,45,72,0.41)] flex flex-col gap-4 py-6 px-2 md:px-6 items-center"
          >
            <div className="w-full">
              <p className="w-full p-2 text-base font-semibold">
                Caption Tone (<span className="text-red-600">*</span>)
              </p>
              <Select
                className="w-full md:py-5 p-2 outline-none rounded-md bg-primary px-3"
                value={Tone}
                onChange={(selectedOption) => {
                  setAsgLevel(
                    selectedOption
                      ? (selectedOption as (typeof Tones)[number])
                      : null
                  );
                  setTone(selectedOption ? selectedOption.label || '' : '');
                }}
                options={Tones}
                styles={styles}
                placeholder="Select Caption Tone"
              />
            </div>

            <div className="w-full">
              <p className="w-full p-2 text-base font-semibold">
                Additional Information
              </p>
              <input
                className="w-full md:py-5 p-2 outline-none rounded-md bg-primary px-3"
                placeholder="Describe some addition information!"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
              />
            </div>

            <div className="w-full flex flex-col items-center gap-3 p-5">
              {/* Option to upload audio */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
                id="upload-image"
              />
              <div
                className="cursor-pointer w-full h-30vh rounded-md py-10 border border-gray-600 bg-[rgba(32,45,72,0.41)] flex flex-col items-center justify-center"
                onClick={() => document.getElementById("upload-image")?.click()}
              >
                <MdCloudUpload className="text-6xl text-white" />
                Upload Image file
              </div>{" "}
              {/* Display uploaded or recorded audio */}
              <div className="flex flex-col w-full">
                {image && (
                  <div className="flex flex-col justify-center items-center gap-4">
                    <img
                      src={URL.createObjectURL(image)}
                      alt=""
                      className="w-[50%] rounded-xl p-1 bg-transparent "
                    />
                  </div>
                )}
                {!image && (
                  <div>
                    <input
                      type="file"
                      className="hidden"
                      id="uploadImage"
                      onChange={handleImage}
                    />
                  </div>
                )}
              </div>
              {/* Submit n cancel button */}
              <div className="flex gap-5">
                {image && (
                  <button
                    type="button"
                    onClick={handleCancelImage}
                    className="bg-gradient-to-bl from-btnPrimary to-btnSecondary font-semibold my-5 px-4 py-2 rounded-md h-fit flex justify-between items-center gap-2 hover:opacity-90"
                  >
                    Cancel <MdClose className="text-white text-xl" />
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-gradient-to-bl from-btnPrimary to-btnSecondary font-semibold my-5 px-4 py-2 rounded-md h-fit flex justify-between items-center gap-2 hover:opacity-90"
                >
                  Submit <TbSend className="text-white text-xl" />
                </button>
              </div>
            </div>
          </form>
          {error !== "" && (
            <span className="w-full text-sm text-red-600">{error}</span>
          )}

          {/* Loading Box */}
          {loader && (
            <div className="bg-primary border border-gray-600 rounded-lg w-full h-60 flex items-center justify-center">
              <div className="inline-block mt-5 h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            </div>
          )}

          {/* Response Box */}
          {responses.length > 0 && (
            <div className="w-full">
              <h2 className="text-2xl font-semibold">Captions</h2>
              {responses.map((response, index) => (
                <div
                  key={index}
                  className="bg-[rgba(32,45,72,0.41)] border border-gray-600 rounded-lg p-2 focus:outline-none w-full my-2 flex flex-col justify-between"
                >
                  <p>{response}</p>
                  <button
                    className="border border-gray-600 rounded-md px-2 py-1 text-sm bg-[#213481] text-slate-200 self-end"
                    onClick={() => handleCopy(response, index)}
                  >
                    {copiedStates[index]}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCaptionGeneratorPage;
