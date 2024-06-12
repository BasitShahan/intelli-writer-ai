"use client"

import { useState } from "react";
import { TbSend } from "react-icons/tb";
import IntelliSummarizer from "@/utils/IntelliSumarizer";

interface Props {
  type: string;
}


const Summarizer = ({ type }: Props) => {
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [responseText, setResponseText] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [formData, setFormData] = useState("");
  const [formError, setFormError] = useState<string>("");
  const [response, setResponse] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(value);
  };

  const handleSubmit = async (e: {
    currentTarget: any; preventDefault: () => void;
  }) => {
    e.preventDefault();
    setButtonDisabled(true);
    setLoader(true);
    if (formData===("")) {
      setFormError("Link is required");
      setResponse(false);
      setLoader(false);
      setButtonDisabled(false);
      return;
    }
    else {
      setFormError("");

      try {

        const prompt = e.currentTarget.querySelector("input")!.value;
        const result = await IntelliSummarizer(prompt);

        if (result.success) {
          setResponse(true);
          setError("");
          setButtonDisabled(false);
          setLoader(false);
          setResponseText(result.response);
        }
        else {
          setButtonDisabled(false);
          setLoader(false);
          setError(result.response);
          setResponse(false);
        }
      } catch (error) {
        setLoader(false);
        setButtonDisabled(false);
        console.error(error);
      }
    }
    // https://youtu.be/pTB0EiLXUC8?si=z8CWBx74Le2qkd1m
  };

  return (
    <div className="py-6 md:p-6 w-full lg:w-full text-white">
      <div className="flex justify-center w-full flex-col h-full text-white -mt-6">
        <div className="w-full flex flex-col justify-between items-center gap-5">
          <form
            className="w-full border border-gray-600 rounded-md bg-[rgba(32,45,72,0.41)]"
            onSubmit={handleSubmit}
          >
            <div className="w-full lg:p-5 p-3 flex flex-col gap-3 justify-between items-start">
              <label>Enter Youtube URL here</label>
              <div className="w-full flex md:flex-row flex-col gap-3 items-center ">
                <div className="w-full md:w-11/12">
                  <input
                    className="w-full md:py-4 p-2 outline-none rounded-md bg-primary px-3"
                    placeholder="Paste or Enter youtube video link here!"
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-bl from-btnPrimary to-btnSecondary font-semibold px-4 py-2 rounded-md h-fit flex justify-between items-center gap-2 hover:opacity-90"
                  disabled={buttonDisabled}
                >
                  {buttonDisabled ? "Processing..." : "Generate"}
                  {!buttonDisabled && <TbSend className="text-white text-xl" />}
                </button>
              </div>
            </div>
            <div className="px-5 py-3 opacity-70">
              What video do you want to summarize?
              <p>Note: Please enter english content URL for youtube video summarization</p>
            </div>
          </form>
          {formError !=="" && (
            <p className="!text-red-500 text-sm px-2">{formError}</p>
          )}
          {error !== "" && (
            <span className="w-full text-sm text-red-600">{error}</span>
          )}
          {loader && (
            <div className="bg-primary border border-gray-600 rounded-lg w-full h-60 flex items-center justify-center">
              <div className="inline-block mt-5 h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            </div>
          )}
          {!loader && responseText && error === "" && (
            <div className="w-full p-3 rounded-md bg-[rgba(32,45,72,0.41)]">
              <p>{responseText}</p>
            </div>
          )}
        </div>
      </div>
    </div>

  );
};

export default Summarizer;
