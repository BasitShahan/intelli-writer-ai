"use client";

import Button from "@/components/Button";
import { useWebContext } from "@/context/ContextProvider";
import React, { useState, FormEvent } from "react";

interface Props {
  type: string;
}
interface FormProps {
  tagline?: string;
  purpose?: string;
}

const Business = ({ type }: Props) => {
  const { getResponse } = useWebContext();

  const [formData, setFormData] = useState({
    tagline: "",
    purpose: "",
  });

  const { tagline, purpose } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [formError, setFormError] = useState<FormProps | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!tagline) {
      setFormError({ tagline: "Business name is required" });
      return;
    } else if (!purpose) {
      setFormError({ purpose: "Business purpose is required" });
      return;
    } else {
      setFormError({
        tagline: "",
        purpose: "",
      });

      const prompt = `Write a business tagline having this tagline ${tagline} for the purpose ${purpose}. Response must be in html paragraph with strong tag for headings and <br/> for linebreaks.`;
      getResponse(prompt);
    }
  };

  return (
    <div className="w-full flex flex-col items-start justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full justify-center flex border border-btnPrimary backdrop-blur-md px-6 py-10 rounded-lg drop-shadow-lg"
      >
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-white mb-2 font-bold">
              Business Tagline <span className="text-pink-500">*</span>
            </label>

            <input
              type="text"
              name="tagline"
              placeholder="i.e Enter business name"
              value={tagline}
              onChange={handleChange}
              className="contact-input bg-gradient-to-b from-[#0F1333] to-[#1D203F] "
            />
          </div>
          {formError?.tagline && (
            <p className="!text-red-500 text-sm px-2">{formError.tagline}</p>
          )}

          <div className="flex flex-col">
            <label htmlFor="name" className="text-white mb-2 font-bold">
              Business Purpose <span className="text-pink-500">*</span>
            </label>

            <input
              type="text"
              name="purpose"
              placeholder="i.e Describe your business purpose"
              value={purpose}
              onChange={handleChange}
              className="contact-input bg-gradient-to-b from-[#0F1333] to-[#1D203F] "
            />
          </div>
          {formError?.purpose && (
            <p className="!text-red-500 text-sm px-2">{formError.purpose}</p>
          )}

          {/* <div className="flex flex-col">
              <label htmlFor="message" className="text-white mb-2 font-bold">
                Message <span className="text-pink-500">*</span>
              </label>
              <textarea
                placeholder="Enter your message"
                value={title}
                onChange={handleChange}
                className="contact-textarea bg-gradient-to-b from-[#0F1333] to-[#1D203F]"
              ></textarea>
            </div>
            {formError?.subheading && (
              <p className="!text-red-500 text-sm px-2">
                {formError.subheading}
              </p>
            )} */}

          <Button
            btnType="submit"
            className="!w-full"
            title="Submit"
          />
        </div>
      </form>
    </div>
  );
};

export default Business;
