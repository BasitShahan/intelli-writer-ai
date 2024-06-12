"use client";

import Button from "@/components/Button";
import { useWebContext } from "@/context/ContextProvider";
import React, { FormEvent, useState } from "react";

interface Props {
  type: string;
}
interface FormProps {
  company?: string;
  subject?: string;
}

const NewsLetter = ({ }: Props) => {
  const { getResponse } = useWebContext();
  const [formData, setFormData] = useState({
    company: "",
    subject: "",
  });

  const { company, subject } = formData;

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
    } else if (!subject) {
      setFormError({ subject: "Subject is required" });
      return;
    } else {
      setFormError({
        company: "",
        subject: "",
      });

      const prompt = `Write a newsletter having this company name ${company} and related to this subject ${subject}. Response must be in html paragraph with strong tag for headings and <br/> for linebreaks.`;
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
            <label htmlFor="name" className="text-white mb-2 font-bold">
              Subject <span className="text-pink-500">*</span>
            </label>

            <input
              type="text"
              name="subject"
              placeholder="i.e Discover our newly released product "
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

export default NewsLetter;
