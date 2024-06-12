"use client";

import contactSubmit from "@/utils/contactSubmit";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

interface ContactPageLayoutProps {
  children?: React.ReactNode;
  name?: string;
  email?: string;
  usage?: string;
  quality?: string;
  pickone?: string;
  Experience?: string;
  tools?: string[];
  interface?: string;
  endorse?: string;
  rating?: string;
  aspect?: string;
  features?: string;
  feedback?: string;
}

const Suggestion: React.FC<ContactPageLayoutProps> = () => {
  const [formData, setFormData] = useState<ContactPageLayoutProps>({
    name: "",
    email: "",
    usage: "",
    quality: "",
    pickone: "",
    Experience: "",
    tools: [],
    interface: "",
    endorse: "",
    rating: "0",
    aspect: "",
    features: "",
    feedback: ""
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const tools = checked
        ? [...(prevData.tools || []), value]
        : (prevData.tools || []).filter((tool) => tool !== value);
      return { ...prevData, tools };
    });
  };

  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedEndorse, setSelectedEndorse] = useState<number | null>(null);

  const handleRatingSelection = (value: number) => {
    setSelectedRating(value === selectedRating ? null : value);
  };

  const handleEndorseSelection = (value: number) => {
    setSelectedEndorse(value === selectedEndorse ? null : value);
  };

  const [contactError, setContactError] =
    useState<ContactPageLayoutProps | null>(null);
  const router = useRouter();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!formData.name) {
        setContactError({
          name: "Name is required",
          children: null,
        });
        return;
      } else if (!validateEmail(formData.email || "")) {
        setContactError({
          email: "Email is required",
          children: null,
        });
        return;
      } else if (!formData.Experience) {
        setContactError({
          Experience: "Duration with us?",
          children: null,
        });
        return;
      } else if (!formData.usage) {
        setContactError({
          usage: "Type of content you use",
          children: null,
        });
        return;
      } else if (!formData.quality) {
        setContactError({
          quality: "Did we elevate your content?",
          children: null,
        });
        return;
      } else if (!formData.tools) {
        setContactError({
          pickone: "Say about Intelliwriter required",
          children: null,
        });
        return;
      } else if (!formData.Experience) {
        setContactError({
          Experience: "How long you are with Intelliwriter required",
          children: null,
        });
        return;
      } else if (!formData.aspect) {
        setContactError({
          aspect: "What didn't meet your expectations required",
          children: null,
        });
        return;
      } else if (!formData.endorse) {
        setContactError({
          endorse: "Would you endorse Intelliwriter required",
          children: null,
        });
        return;
      } else if (!formData.rating) {
        setContactError({
          rating: "How would you rate Intelliwriter required",
          children: null,
        });
        return;
      } else if (!formData.features) {
        setContactError({
          features: "Features or tools you wish is required",
          children: null,
        });
        return;
      } else if (!formData.feedback) {
        setContactError({
          feedback: "Feedback is required",
          children: null,
        });
        return;
      } else {
        setContactError({
          name: "",
          email: "",
          usage: "",
          quality: "",
          pickone: "",
          Experience: "",
          tools: [],
          interface: "",
          endorse: "",
          rating: "",
          aspect: "",
          features: "",
          feedback: "",
          children: null,
        });

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Form submitted successfully!",
        });
        router.push("/user/rewards-program");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Ooops...",
        text: "Something went wrong!",
      });
    }
  };


  return (
    <div className="pt-4">
      {/* Feedback Content */}
      <div className="absolute top-14 right-0 md:px-20 md:py-10 p-6 w-full lg:w-[calc(100%-250px)] mx-auto text-white">
      <section className="z-10 container flex justify-center items-center">
          <div className="border-2 border-opacity-10 md:max-w-[950px] border-white rounded-3xl z-20">
            <div className="flex flex-col items-center py-8">
              <h2 className="text-[36px] md:text-[44px] font-semibold text-white text-center mb-4 gradient-span-1">
                Help Us Improve!
              </h2>

              <p className="hidden md:inline text-[16px] md:text-[16px] w-[80%] opacity-80 lg:text-[16px] text-white ">
                Your feedback will play a pivotal role in guiding the next phase
                of our development. As a small token of our appreciation, you
                will be rewarded 200 bonus credits!
              </p>

              <div className="mt-8 w-full justify-center flex">
                <form onSubmit={handleSubmit} className="w-full max-w-3xl">
                  <div className="flex flex-col space-y-10">
                    <div className="flex flex-row justify-between ">
                      <div className="flex flex-col">
                        <label
                          htmlFor="name"
                          className="text-white mb-3 font-bold"
                        >
                          Your name <span className="text-pink-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((prevData) => ({
                              ...prevData,
                              name: e.target.value,
                            }))
                          }
                          className="contact-input bg-gradient-to-b from-[#0F1333] to-[#1D203F] "
                        />
                        {contactError?.name && (
                          <p className="!text-red-500 text-sm px-2">
                            {contactError.name}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="email"
                          className="text-white mb-3 font-bold"
                        >
                          Your email <span className="text-pink-500">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((prevData) => ({
                              ...prevData,
                              email: e.target.value,
                            }))
                          }
                          className="contact-input bg-gradient-to-b from-[#0F1333] to-[#1D203F] "
                        />
                      </div>
                      {contactError?.email && (
                        <p className="!text-red-500 text-sm px-2">
                          {contactError.email}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="experience"
                        className="text-white mb-3 font-bold"
                      >
                        1. How long have you been a part of the Intelliwriter?{" "}
                        <span className="text-pink-500">*</span>
                      </label>
                      <div className="flex flex-row space-x-8">
                        <label className="text-white">
                          <input
                            type="radio"
                            name="experience"
                            value="Since you launched"
                            checked={
                              formData.Experience === "Since you launched"
                            }
                            onChange={(e) =>
                              setFormData((prevData) => ({
                                ...prevData,
                                Experience: e.target.value,
                              }))
                            }
                            className="mr-2"
                          />
                          Since you launched
                        </label>
                        <label className="text-white">
                          <input
                            type="radio"
                            name="experience"
                            value="About 6 months"
                            checked={formData.Experience === "About 6 months"}
                            onChange={(e) =>
                              setFormData((prevData) => ({
                                ...prevData,
                                Experience: e.target.value,
                              }))
                            }
                            className="mr-2"
                          />
                          About 6 months
                        </label>
                        <label className="text-white">
                          <input
                            type="radio"
                            name="experience"
                            value="Roughly 3 months"
                            checked={formData.Experience === "Roughly 3 months"}
                            onChange={(e) =>
                              setFormData((prevData) => ({
                                ...prevData,
                                Experience: e.target.value,
                              }))
                            }
                            className="mr-2"
                          />
                          Roughly 3 months
                        </label>
                        <label className="text-white">
                          <input
                            type="radio"
                            name="experience"
                            value="Started this month"
                            checked={
                              formData.Experience === "Started this month"
                            }
                            onChange={(e) =>
                              setFormData((prevData) => ({
                                ...prevData,
                                Experience: e.target.value,
                              }))
                            }
                            className="mr-2"
                          />
                          Started this month
                        </label>
                      </div>
                    </div>

                    {contactError?.Experience && (
                      <p className="!text-red-500 text-sm px-2">
                        {contactError.Experience}
                      </p>
                    )}

                    <div className="flex flex-col">
                      <label
                        htmlFor="usage"
                        className="text-white mb-3 font-bold"
                      >
                        2. What type of content did you primarily use
                        Intelliwriter for?{" "}
                        <span className="text-pink-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="E.g SEO articles, blog posts, product descriptions"
                        value={formData.usage}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            usage: e.target.value,
                          }))
                        }
                        className="contact-input bg-gradient-to-b from-[#0F1333] to-[#1D203F] "
                      />
                    </div>
                    {contactError?.usage && (
                      <p className="!text-red-500 text-sm px-2">
                        {contactError.usage}
                      </p>
                    )}

                    <div className="flex flex-col">
                      <label
                        htmlFor="quality"
                        className="text-white mb-3 font-bold"
                      >
                        3. In your opinion, did Intelliwriter help elevate the
                        quality and SEO ranking of your content?{" "}
                        <span className="text-pink-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="E.g Bossted my website traffic, improved engagement "
                        value={formData.quality}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            quality: e.target.value,
                          }))
                        }
                        className="contact-input bg-gradient-to-b from-[#0F1333] to-[#1D203F] "
                      />
                    </div>
                    {contactError?.quality && (
                      <p className="!text-red-500 text-sm px-2">
                        {contactError.quality}
                      </p>
                    )}

                    <div className="flex flex-col">
                      <label
                        htmlFor="tools"
                        className="text-white mb-3 font-bold"
                      >
                        4. Were there specific Intelliwriter tools that you
                        found more useful than others?{" "}
                        <span className="text-pink-500">*</span>
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 space-y-1">
  {[
    "Long Form Assistant",
    "Instant Blog Generator",
    "Readability Improver",
    "Templates",
    "Article Writer",
    "Outrank Article",
    "Article Generator",
    "Paraphraser",
    "Bypass AI",
    "Topical Authority",
  ].map((tool, index) => (
    <label key={index} className="text-white">
      <input
        type="checkbox"
        value={tool}
        checked={formData.tools?.includes(tool) || false}
        onChange={handleCheckboxChange}
        className="mr-2"
      />
      {tool}
    </label>
  ))}
</div>

                    </div>
                    {contactError?.tools && (
                      <p className="!text-red-500 text-sm px-2">
                        {contactError.tools}
                      </p>
                    )}

                    <div className="flex flex-col">
                      <label
                        htmlFor="interface"
                        className="text-white mb-3 font-bold"
                      >
                        5. How intuitive and user-friendly did you find our
                        interface and tools?{" "}
                        <span className="text-pink-500">*</span>
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3">
                        <label className="text-white">
                          <input
                            type="radio"
                            name="interface"
                            value="Very intuitive"
                            checked={formData.interface === "Very intuitive"}
                            onChange={(e) =>
                              setFormData((prevData) => ({
                                ...prevData,
                                interface: e.target.value,
                              }))
                            }
                            className="mr-2"
                          />
                          Very intuitive
                        </label>
                        <label className="text-white">
                          <input
                            type="radio"
                            name="interface"
                            value="Somewhat intuitive"
                            checked={
                              formData.interface === "Somewhat intuitive"
                            }
                            onChange={(e) =>
                              setFormData((prevData) => ({
                                ...prevData,
                                interface: e.target.value,
                              }))
                            }
                            className="mr-2"
                          />
                          Somewhat intuitive
                        </label>
                        <label className="text-white">
                          <input
                            type="radio"
                            name="interface"
                            value="Neutral"
                            checked={formData.interface === "Neutral"}
                            onChange={(e) =>
                              setFormData((prevData) => ({
                                ...prevData,
                                interface: e.target.value,
                              }))
                            }
                            className="mr-2"
                          />
                          Neutral
                        </label>
                        <label className="text-white">
                          <input
                            type="radio"
                            name="interface"
                            value="Could be more intuitive"
                            checked={
                              formData.interface === "Could be more intuitive"
                            }
                            onChange={(e) =>
                              setFormData((prevData) => ({
                                ...prevData,
                                interface: e.target.value,
                              }))
                            }
                            className="mr-2"
                          />
                          Could be more intuitive
                        </label>
                        <label className="text-white">
                          <input
                            type="radio"
                            name="interface"
                            value="Not intuitive at all"
                            checked={
                              formData.interface === "Not intuitive at all"
                            }
                            onChange={(e) =>
                              setFormData((prevData) => ({
                                ...prevData,
                                interface: e.target.value,
                              }))
                            }
                            className="mr-2"
                          />
                          Not intuitive at all
                        </label>
                      </div>
                    </div>

                    {contactError?.interface && (
                      <p className="!text-red-500 text-sm px-2">
                        {contactError.interface}
                      </p>
                    )}

                    <div className="flex flex-col">
                      <label
                        htmlFor="pickone"
                        className="text-white mb-3 font-bold"
                      >
                        6. If you had to pick one thing, what would you say
                        Intelliwriter nailed perfectly?{" "}
                        <span className="text-pink-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="E.g User-friendly interface, diverse, template options"
                        value={formData.pickone}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            pickone: e.target.value,
                          }))
                        }
                        className="contact-input bg-gradient-to-b from-[#0F1333] to-[#1D203F] "
                      />
                    </div>
                    {contactError?.pickone && (
                      <p className="!text-red-500 text-sm px-2">
                        {contactError.pickone}
                      </p>
                    )}

                    <div className="flex flex-col">
                      <label
                        htmlFor="aspect"
                        className="text-white mb-3 font-bold"
                      >
                        7. Is there an aspect of Intelliwriter that didn’t meet
                        your expectations or that you'd like to see improved?{" "}
                        <span className="text-pink-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="E.g More language support, quicker response time"
                        value={formData.aspect}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            aspect: e.target.value,
                          }))
                        }
                        className="contact-input bg-gradient-to-b from-[#0F1333] to-[#1D203F] "
                      />
                    </div>
                    {contactError?.aspect && (
                      <p className="!text-red-500 text-sm px-2">
                        {contactError.aspect}
                      </p>
                    )}

                    <div className="flex flex-col">
                      <label
                        htmlFor="endorse"
                        className="text-white mb-3 font-bold"
                      >
                        8. Would you endorse Intelliwriter to your peers?{" "}
                        <span className="text-pink-500">*</span>
                      </label>
                      <div className="flex items-center">
                        {Array.from({ length: 11 }, (_, i) => (
                          <div
                            key={i}
                            className={`mr-2 p-2 rounded cursor-pointer ${
                              selectedEndorse === i
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200"
                            }`}
                            onClick={() => handleEndorseSelection(i)}
                          >
                            {i}
                          </div>
                        ))}
                      </div>
                      {contactError?.endorse && (
                        <p className="text-red-500 text-sm px-2">
                          {contactError.endorse}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="rating"
                        className="text-white mb-3 font-bold"
                      >
                        9. How would you rate the value for money of
                        Intelliwriter services?{" "}
                        <span className="text-pink-500">*</span>
                      </label>
                      <div className="flex items-center">
                        {Array.from({ length: 11 }, (_, i) => (
                          <div
                            key={i}
                            className={`mr-2 p-2 rounded cursor-pointer ${
                              selectedRating === i
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200"
                            }`}
                            onClick={() => handleRatingSelection(i)}
                          >
                            {i}
                          </div>
                        ))}
                      </div>
                    </div>
                    {contactError?.rating && (
                      <p className="text-red-500 text-sm px-2">
                        {contactError.rating}
                      </p>
                    )}
                    <div className="flex flex-col">
                      <label
                        htmlFor="features"
                        className="text-white mb-3 font-bold"
                      >
                        10. Are there additional tools or features you wish
                        Intelliwriter would introduce in the future?{" "}
                        <span className="text-pink-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="E.g More features, tools, quicker response time"
                        value={formData.features}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            features: e.target.value,
                          }))
                        }
                        className="contact-input bg-gradient-to-b from-[#0F1333] to-[#1D203F] "
                      />
                    </div>
                    {contactError?.features && (
                      <p className="!text-red-500 text-sm px-2">
                        {contactError.features}
                      </p>
                    )}

                    <div className="flex flex-col">
                      <label
                        htmlFor="feedback"
                        className="text-white mb-3 font-bold"
                      >
                        11. Any other thoughts or feedback you'd like to share
                        with us? <span className="text-pink-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="E.g. More language support, quicker response time  "
                        value={formData.feedback}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            feedback: e.target.value,
                          }))
                        }
                        className="contact-input bg-gradient-to-b from-[#0F1333] to-[#1D203F] "
                      />
                    </div>
                    {contactError?.feedback && (
                      <p className="!text-red-500 text-sm px-2">
                        {contactError.feedback}
                      </p>
                    )}
                      <div>
                        <button
                          type="submit"
                          className="bg-gradient-to-bl transition-all duration-300 from-[#471c7c] to-[#7628d6] hover:opacity-90 py-2.5 tracking-wider lg:text-base text-sm text-white font-medium md:px-6 px-4 rounded-full"
                        >
                          Submit Feedback
                        </button>
                      </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Suggestion;
