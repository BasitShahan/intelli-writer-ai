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
}

const CompDesc = ({ type }: Props) => {
  const { getResponse } = useWebContext();

  const [formData, setFormData] = useState({
    company: "",
    description: "",
  });

  const { company, description } = formData;

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
    } else {
      setFormError({
        company: "",
        description: "",
      });

      let prompt = "";
      switch (type) {
        case "mission-statement":
          prompt = `Write a mission statement having this company ${company} and the description is this ${description}. Response must be in html paragraph with strong tag for headings and <br/> for linebreaks.`;
          getResponse(prompt);
          break;
        case "vision-statement":
          prompt = `Write a vision statement having this company ${company} and the description is this ${description}. Response must be in html paragraph with strong tag for headings and <br/> for linebreaks.`;
          getResponse(prompt);
          break;
        case "welcome-email":
          prompt = `Write a welcome email having this company ${company} and the description is this:"${description}". Response must be html paragraph with strong tag for headings and subheadings, list points in numbers & <br/> for linebreaks.`;
          getResponse(prompt);
          break;
        case "pain-agitate-solution":
          prompt = `Write pain agitate solution having this product ${company} and the description is ${description}. Now, I want response in html paragraph with strong and bold tag for headings and subheadings represented by size and bullets with numbers. After paragraph, use <br/> for linebreaks.`;
          getResponse(prompt);
          break;
        case "product-sheet":
          prompt = `Generate compelling product sheet having this product ${company} and the description is ${description}. Now, I want response in html paragraph with strong and bold tag for headings and subheadings represented by size and bullets with numbers. After paragraph, use <br/> for linebreaks.`;
          getResponse(prompt);
          break;

        default:
          break;
      }
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
              placeholder="i.e The best places to visit in this summer"
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

export default CompDesc;
