"use client";

import Button from "@/components/Button";
import { useWebContext } from "@/context/ContextProvider";
import { FormEvent, useState } from "react";

interface Props {
  type: string
}
interface FormProps {
  content?: string,
}

const BlogGetContent = ({ type }: Props) => {
  const { getResponse } = useWebContext();
  const [formData, setFormData] = useState({
    content: "",
  });
  const { content } = formData;
  const [formError, setFormError] = useState<FormProps | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!content) {
      setFormError({ content: "Content is required" });
      return;
    } else {
      setFormError({
        content: "",
      });

      let query = "";
      switch (type) {
        case "blog-title":
          query = `Write blog title for this content ${content}. Now, I want response in this format:
          <strong>Title: ... </strong>, where ... is a blog title.`
          getResponse(query);
          break;
        case "content-grammar":
          query = `Correct the grammar of this ${content}. The response must be in this format: 
          <p><strong>Corrected content:</strong><br/>
          ...
        </p>, where ... is a corrected content.`;
          getResponse(query);
          break;
        case "content-rewriter":
          query = `Rewrite the this ${content} into enhanced and well defined words. The response must be in this format: 
          <p><strong>Rewrited Content:</strong><br/>
          ...
        </p>, where ... is a enhanced content.`;
          getResponse(query);
          break;
        case "content-summary":
          query = `Write short summary of this ${content}. The response must be in this format: 
          <p><strong>Content Summary:</strong><br/>
          ...
        </p>, where ... is a content summary.`;
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
            <label htmlFor="message" className="text-white mb-2 font-bold">
              Content <span className="text-pink-500">*</span>
            </label>
            <textarea
              placeholder="The best places to visit in this summer"
              name="content"
              value={content}
              onChange={(e) => setFormData((prev) => ({
                ...prev,
                content: e.target.value
              }))}
              className="contact-textarea bg-gradient-to-b from-[#0F1333] to-[#1D203F]"
            ></textarea>
          </div>
          {formError?.content && (
            <p className="!text-red-500 text-sm px-2">
              {formError.content}
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

export default BlogGetContent;
