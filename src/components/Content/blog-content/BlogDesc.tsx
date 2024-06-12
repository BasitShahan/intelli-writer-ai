"use client";

import Button from "@/components/Button";
import { useWebContext } from "@/context/ContextProvider";
import React, { FormEvent, useState } from "react";

interface Props {
  type: string
}
interface FormProps {
  keyword?: string,
  description?: string,
}

const BlogDesc = ({ type }: Props) => {
  const { getResponse } = useWebContext();
  const [formData, setFormData] = useState({
    keyword: "",
    description: "",
  });
  const { keyword, description } = formData;

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
    if (!keyword) {
      setFormError({ keyword: "Keyword is required" });
      return;
    } else if (!description) {
      setFormError({ description: "Description is required" });
      return;
    } else {
      setFormError({
        keyword: "",
        description: "",
      });

      let query = "";
      switch (type) {
        case "blog-post":
          query = `Write 200-300 words blog post having this keywords ${keyword} and the description is this ${description}. I need response in this format:
          <p>
            <strong>{Blog post title should come here}:</strong> <br />
            <p>...</p>
          </p>, where ... is blog post content, you can ue bullets if needed! `;
          getResponse(query);
          break;
        case "paragraph":
          query = `Write 100-150 words blog paragraph having this keywords ${keyword} and the description is this ${description}. I need response in this format:
          <p>
            <strong>{Blog post title should come here}:</strong> <br />
            <p>...</p>
          </p>, where ... is blog paragraphcontent, you can ue bullets if needed! `;
          getResponse(query);
          break;
        case "startup-names":
          query = `Write business startup name having this keywords ${keyword} and the description is this ${description}. I need response in this format:
          <p>
            <strong>  Business Startup name:</strong> ...
          </p>, where ... is business startup name.`;
          getResponse(query);
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-start justify-center">
      <form onSubmit={handleSubmit} className="w-full justify-center flex border border-btnPrimary backdrop-blur-md px-6 py-10 rounded-lg drop-shadow-lg">
        <div className="flex flex-col gap-4 w-full">

          <div className="flex flex-col">
            <label htmlFor="name" className="text-white mb-2 font-bold">
              Keyword <span className="text-pink-500">*</span>
            </label>

            <input
              type="text"
              name="keyword"
              placeholder="i.e The best Summer destinations"
              value={keyword}
              onChange={handleChange}
              className="contact-input bg-gradient-to-b from-[#0F1333] to-[#1D203F] "
            />
          </div>
          {formError?.keyword && (
            <p className="!text-red-500 text-sm px-2">
              {formError.keyword}
            </p>
          )}

          <div className="flex flex-col">
            <label htmlFor="message" className="text-white mb-2 font-bold">
              Description <span className="text-pink-500">*</span>
            </label>
            <textarea
              placeholder="The best places to visit in this summer"
              name="description"
              value={description}
              onChange={(e) => setFormData((prev) => ({
                ...prev,
                description: e.target.value
              }))}
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

export default BlogDesc;
