"use client";

import Button from "@/components/Button";
import { useWebContext } from "@/context/ContextProvider";
import { FormEvent, useState } from "react";


interface Props {
  type: string
}
interface FormProps {
  domain?: string,
}

const StartupIdeas = ({ }: Props) => {
  const { getResponse } = useWebContext();



  const [formData, setFormData] = useState({
    domain: "",
  });

  const { domain } = formData;

  const [formError, setFormError] = useState<FormProps | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!domain) {
      setFormError({ domain: "Domain is required" });
      return;
    } else {
      setFormError({
        domain: "",
      });

      const prompt = `Write a startup ideas having this domain ${domain}. Response must be in html paragraph with strong tag for headings and <br/> for linebreaks.`;
      getResponse(prompt);
    }
  };

  return (
    <div className="w-full flex flex-col items-start justify-center">
      <form onSubmit={handleSubmit} className="w-full justify-center flex border border-btnPrimary backdrop-blur-md px-6 py-10 rounded-lg drop-shadow-lg">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col">
            <label htmlFor="message" className="text-white mb-2 font-bold">
              Domain <span className="text-pink-500">*</span>
            </label>
            <textarea
              placeholder=" i.e: Web Programming, digital art, artificial intelligence "
              name="domain"
              value={domain}
              onChange={(e) => setFormData((prev) => ({
                ...prev,
                domain: e.target.value
              }))}
              className="contact-textarea bg-gradient-to-b from-[#0F1333] to-[#1D203F] "
            ></textarea>
          </div>
          {formError?.domain && (
            <p className="!text-red-500 text-sm px-2">
              {formError.domain}
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

export default StartupIdeas;
