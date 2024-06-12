"use client";

import Button from "@/components/Button";
import { useWebContext } from "@/context/ContextProvider";
import React, { FormEvent, useState } from "react";

interface Props {
  type: string;
}
interface FormProps {
  company?: string;
  description?: string;
  subject?: string;
}

const PressRelease = ({ }: Props) => {
  const { getResponse } = useWebContext();

  const [formData, setFormData] = useState({
    company: "",
    description: "",
    subject: "",
  });

  const { company, description, subject } = formData;

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
    if (!company) {
      setFormError({ company: "Company name is required" });
      return;
    } else if (!description) {
      setFormError({ description: "Description is required" });
      return;
    } else if (!subject) {
      setFormError({ subject: "Subject is required" });
      return;
    } else {
      setFormError({
        company: "",
        description: "",
        subject: "",
      });

      const prompt = `write Press release having this Company name ${company} with the description  ${description} and having subject ${subject}. Now, I want response in html paragraph with strong and bold tag for headings and subheadings represented by size and bullets with numbers. After paragraph, use <br/> for linebreaks.`;
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
              Company <span className="text-pink-500">*</span>
            </label>

            <input
              type="text"
              name="company"
              placeholder="i.e Youtube, Netflix, Disney"
              value={company}
              onChange={handleChange}
              className="contact-input bg-gradient-to-b from-[#0F1333] to-[#1D203F] "
            />
          </div>
          {formError?.company && (
            <p className="!text-red-500 text-sm px-2">{formError.company}</p>
          )}

          <div className="flex flex-col">
            <label htmlFor="message" className="text-white mb-2 font-bold">
              Description <span className="text-pink-500">*</span>
            </label>
            <textarea
              placeholder="i.e We strive the best when it comes to content creation"
              name="description"
              value={description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="contact-textarea bg-gradient-to-b from-[#0F1333] to-[#1D203F]"
            ></textarea>
          </div>
          {formError?.description && (
            <p className="!text-red-500 text-sm px-2">
              {formError.description}
            </p>
          )}

          <div className="flex flex-col">
            <label htmlFor="name" className="text-white mb-2 font-bold">
              Subject <span className="text-pink-500">*</span>
            </label>

            <input
              type="text"
              name="subject"
              placeholder="i.e Discover our newly released product"
              value={subject}
              onChange={handleChange}
              className="contact-input bg-gradient-to-b from-[#0F1333] to-[#1D203F] "
            />
          </div>
          {formError?.subject && (
            <p className="!text-red-500 text-sm px-2">{formError.subject}</p>
          )}

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

export default PressRelease;
