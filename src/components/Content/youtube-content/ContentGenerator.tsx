"use client";
import React, { FormEvent, useState } from "react";
import { TbSend } from "react-icons/tb";
import IntelliAI from "@/utils/IntelliAI";
import { YoutubeContents } from "@/constants/dashboard";

interface Props {
  type: string;
}
interface FormProps {
  title?: string;
}

const ContentGenerator = ({ type }: Props) => {
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [formData, setFormData] = useState({ title: "" });
  const { title } = formData;
  const [formError, setFormError] = useState<FormProps | null>(null);
  const userId =
    typeof window !== "undefined" ? sessionStorage.getItem("userId") : null;
  const [youtubeTitle, setYoutubeTitle] = useState<string>("");
  const [youtubeDesc, setYoutubeDesc] = useState<string>("");
  const [youtubeKeyword, setYoutubeKeyword] = useState<string>("");
  const [youtubeTag, setYoutubeTag] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [response, setResponse] = useState<boolean>(false);
  const [copiedStates, setCopiedStates] = useState<string[]>([]);

  const updatedContents = YoutubeContents.map((item) => {
    switch (item.title) {
      case "Title":
        return { ...item, output: youtubeTitle };
      case "Description":
        return { ...item, output: youtubeDesc };
      case "Keywords":
        return { ...item, output: youtubeKeyword };
      case "Tags":
        return { ...item, output: youtubeTag };
      default:
        return item;
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCopy = (content: string, index: number) => {
    setCopiedStates((prevCopiedStates) => {
      const newCopiedStates = [...prevCopiedStates];
      newCopiedStates[index] = "Copied";
      return newCopiedStates;
    });
    navigator.clipboard
      .writeText(content)
      .then(() => {
        setTimeout(() => {
          setCopiedStates((prevCopiedStates) => {
            const newCopiedStates = [...prevCopiedStates];
            newCopiedStates[index] = "Copy";
            return newCopiedStates;
          });
        }, 5000);
      })
      .catch((err) =>
        console.error("Failed to copy Youtube generated content: ", err)
      );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResponse(false);
    setButtonDisabled(true);
    setLoader(true);
    try {
      if (!title) {
        setFormError({ title: "Title is required" });
        setResponse(false);
        setLoader(false);
        setButtonDisabled(false);
        return;
      } else {
        setFormError({
          title: "",
        });

        const titlePrompt = {
          prompt: `role:"You are a youtube video title generator assistant."
        text:"Generate small SEO friendly youtube video title for this Topic :<Python FastAPI>"
        Titles:"FastAPI - A python framework | Full Course"
        text:"Generate small SEO friendly youtube video title for this Topic : <${title}>"
        Titles:" "`,
          userId: userId,
        };

        const descPrompt = {
          prompt: `role:"You are a youtube video description generator assistant."
          text:"Generate a 70 words youtube video description of this title:"python is easy"
          Description:"Are you a programmer who wants to learn Python? Look no further! In this engaging and informative video, we will take you on a journey through the world of Python programming. Python is known for its simplicity and ease of use, making it the perfect language for beginners. Whether you're a novice or have some coding experience, this beginner's guide will walk you through the fundamentals of Python. From variables and data types to control structures and functions, you'll gain a solid foundation in Python programming. Join us now and unlock the power of Python in no time!"
          text:"Generate a 70 words youtube video description of this title: ${title}" `,
          userId: userId,
        };

        const keywordsPrompt = {
          prompt: `role:"You are a youtube video title keywords generator assistant."
        text:"Generate 20 keywords for this title :<How to create a Great LinkedIn Profile in 2023 | for College Students>"
        keywords:"
    #LinkedInProfile
    #CollegeStudents
    #ProfessionalDevelopment
    #2023Guide
    #CareerTips
    #ProfileOptimization
    #JobSeekers
    #NetworkingSkills
    #PersonalBranding
    #CareerGrowth
    #OnlineNetworking
    #ResumeBuilding
    #StudentSuccess
    #DigitalPortfolio
    #EmploymentStrategies
    #OnlinePresence
    #ProfessionalImage
    #JobSearchTips
    #LinkedInStrategies
    #OnlineProfessionalism
    " text:"Generate 20 keywords for this title: <${title}>"
        keywords:" "`,
          userId: userId,
        };

        const tagsPrompts = {
          prompt: ` role:"You are a youtube video title tags generator assistant."
        text:"Generate 20 comma seperated tags for this title :<How to create a Great LinkedIn Profile in 2023 | for College Students>"
        Tags:"LinkedIn, Profile, College Students, Networking, Online Presence, Resume Building, Professional Development, Social Media, Career Growth, Job Search, Personal Branding, Digital Networking, Online Profile, 2023, Career Advice, LinkedIn Tips, Profile Optimization, Social Networking, Professional Profile, College Graduates"
        text:"Generate 30 comma seperated tags for this title : <${title}>"
        Tags:" "`,
          userId: userId,
        };

        const resTitle = await IntelliAI(titlePrompt);
        const resDesc = await IntelliAI(descPrompt);
        const resKeyword = await IntelliAI(keywordsPrompt);
        const resTag = await IntelliAI(tagsPrompts);

        if (
          resTitle.success &&
          resDesc.success &&
          resKeyword.success &&
          resTag.success
        ) {
          setYoutubeTitle(resTitle.response);
          setYoutubeDesc(resDesc.response);
          setYoutubeKeyword(resKeyword.response);
          setYoutubeTag(resTag.response);
          setError("");
          setButtonDisabled(false);
          setLoader(false);
          setResponse(true);
        } else {
          setButtonDisabled(false);
          setLoader(false);
          setResponse(false);
          setError("Failed to generate response");
        }
      }
    } catch (error) {
      setLoader(false);
      setButtonDisabled(false);
      setResponse(false);
      console.error(error);
    }
  };

  return (
    <div className="py-6 md:p-6 w-full lg:w-full text-white">
      <div className="flex justify-center items-center w-full flex-col h-full text-white -mt-6">
        <div className=" w-full flex flex-col justify-between items-center gap-5">
          <form
            onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}
            className="w-full border border-gray-600 rounded-md bg-[rgba(32,45,72,0.41)]"
          >
            <div className="w-full lg:p-5 p-3 border-b border-b-gray-600 flex flex-col gap-3 justify-between items-start">
              <label >About your youtube video</label>
              <div className="w-full flex md:flex-row flex-col gap-3 items-center ">
                <div className="w-full md:w-11/12">
                  <input
                    className="w-full md:py-3 p-2 outline-none rounded-md bg-primary px-3"
                    placeholder="Create about your youtube video!"
                    name="title"
                    value={title}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-bl from-btnPrimary to-btnSecondary font-semibold  px-4 py-2 rounded-md h-fit flex justify-between items-center gap-2 hover:opacity-90"
                  disabled={buttonDisabled}
                >
                  {buttonDisabled ? "Processing..." : "Generate"}
                  {!buttonDisabled && <TbSend className="text-white text-xl" />}
                </button>
              </div>
            </div>
          </form>
          {formError?.title && (
            <p className="!text-red-500 text-sm px-2">{formError.title}</p>
          )}
          {error !== "" && (
            <span className="w-full text-sm text-red-600">{error}</span>
          )}
        </div>
      </div>

      {loader && (
        <div className="bg-primary border border-gray-600 rounded-lg w-full h-60 flex items-center justify-center">
          <div className="inline-block mt-5 h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        </div>
      )}
      {response && error === "" && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 py-5">
          {updatedContents.map((item) => (
            <div
              key={item.id}
              className="flex flex-col rounded-lg py-4 px-6 border-b-4 border-gray-600 bg-[rgba(32,45,72,0.41)] relative overflow-hidden"
            >
              <div className="flex justify-between items-center">
                <p className="text-white">{item.title}</p>
                <button
                  className="border mb-3 border-gray-600 rounded-md px-2 py-1 text-sm bg-[#213481] text-slate-200 self-end"
                  onClick={() => handleCopy(item.output, item.id)}
                >
                  {copiedStates[item.id] || "Copy"}
                </button>
              </div>
              <p>{item.output}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ContentGenerator;
