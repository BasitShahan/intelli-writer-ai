"use client";

import Button from "@/components/Button";
import { useWebContext } from "@/context/ContextProvider";
import React, { FormEvent, useState } from "react";

interface Props {
  type: string;
}
interface FormProps {
  title?: string;
  keywords?: string;
  subheading?: string;
}

const Article = ({ }: Props) => {
  const { getResponse } = useWebContext();

  const [formData, setFormData] = useState({
    title: "",
    keywords: "",
    subheading: "",
  });

  const { title, keywords, subheading } = formData;

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
    if (!title) {
      setFormError({ title: "Title is required" });
      return;
    } else if (!keywords) {
      setFormError({ keywords: "Keywords are required" });
      return;
    } else if (!subheading) {
      setFormError({ subheading: "Subheading is required" });
      return;
    } else {
      setFormError({
        title: "",
        keywords: "",
        subheading: "",
      });

      const query = `Write blog article of 300-400 words having the title ${title} according to the keywords ${keywords}  which contains  ${subheading} as subheading. Now, I want response in only html paragraph with <strong> tag for headings and subheadings, <ul> or <ol> tag for bullets(if needed) and always use <br/><br/> for linebreaks after every section or paragraph ends. The response must be in blog article format with three sections: 
      Introduction:
        ...
      ${subheading}:
        ... 
      Conclusion:
        ...
      where ... are its content.`;
      getResponse(query);
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
              Title <span className="text-pink-500">*</span>
            </label>

            <input
              type="text"
              name="title"
              placeholder="i.e Ocean, Beach & Hotel"
              value={title}
              onChange={handleChange}
              className="contact-input bg-gradient-to-b from-[#0F1333] to-[#1D203F] "
            />
          </div>
          {formError?.title && (
            <p className="!text-red-500 text-sm px-2">{formError.title}</p>
          )}

          <div className="flex flex-col">
            <label htmlFor="name" className="text-white mb-2 font-bold">
              Keywords <span className="text-pink-500">*</span>
            </label>

            <input
              type="text"
              name="keywords"
              placeholder="i.e Ocean, Beach & Hotel"
              value={keywords}
              onChange={handleChange}
              className="contact-input bg-gradient-to-b from-[#0F1333] to-[#1D203F] "
            />
          </div>
          {formError?.keywords && (
            <p className="!text-red-500 text-sm px-2">{formError.keywords}</p>
          )}

          <div className="flex flex-col">
            <label htmlFor="phone" className="text-white mb-2 font-bold">
              Subheading <span className="text-pink-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your Subheading"
              name="subheading"
              value={subheading}
              onChange={handleChange}
              className="contact-input bg-gradient-to-b from-[#0F1333] to-[#1D203F] "
            />
          </div>
          {formError?.subheading && (
            <p className="!text-red-500 text-sm px-2">
              {formError.subheading}
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

export default Article;

