"use client";

import Button from "@/components/Button";
import { useWebContext } from "@/context/ContextProvider";
import React, { FormEvent, useState } from "react";

interface Props {
  type: string
}
interface FormProps {
  title?: string,
  content?: string,
}

const TitleContent = ({ type }: Props) => {
  const { getResponse } = useWebContext();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const { title, content } = formData;

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
    } else if (!content) {
      setFormError({ content: "Content is required" });
      return;
    } else {
      setFormError({
        title: "",
        content: "",
      });

      let prompt = ""
      switch (type) {
        case "blog-intro":
          prompt = `Write blog intro of 100-150 words on ${title}. The main purpose of the blog is:  ${content}. The response must be in this format:
          <strong>Introduction</strong>:
            <p>...</p>
            Here ... is the blog introduction.`;

          getResponse(prompt);
          break;
        case "blog-listicle":
          prompt = `Write blog listicle of 200-250 words on ${title}. The main purpose of the blog is:  ${content}. The response must be in this format:
          <strong>${title}</strong>:
            <ul>
            <li>
              <strong>...: </strong> ...
              <br /><br />
            </li>
            </ul>
            Here ... is the blog listicle. `;
          getResponse(prompt);
          break;
        case "blog-outline":
          prompt = `Write blog outline of 100-150 words on ${title}. The main purpose of the blog is:  ${content}. The response must be in this format:
          <strong>${title}(outline)</strong>:
            <p>...</p>
            Here ... is the blog outline. `;
          getResponse(prompt);
          break;
        case "blog-outro":
          prompt = `Write blog outro of 80-120 words on ${title}. The main purpose of the blog is:  ${content}. The response must be in this format:
          <strong>${title}(outro)</strong>:
            <p>...</p>
            Here ... is the blog outro. `;
          getResponse(prompt);
          break;
        case "blog-tags":
          prompt = `Write 15-20 blog tags on ${title} and the main purpose of the blog is:  ${content}. The response must be in this format:
          <strong>${title}(tags)</strong>:
            <p>...</p>
            Here ... is the blog hashags tags. `;
          getResponse(prompt);
          break;
        case "blog-talkings-points":
          prompt = `Write blog-talking-points of 150-200 words on ${title} and the main purpose of the blog is:  ${content}. The response must be in this format:
          <p>
            <strong>${title} Talking Points:</strong><br/>
            <ul>
              <li>${content}</li>
              <!-- Add more talking points as needed -->
            </ul>
          </p>`;
          getResponse(prompt);
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
              Title <span className="text-pink-500">*</span>
            </label>

            <input
              type="text"
              name="title"
              placeholder="i.e The best Summer destinations"
              value={title}
              onChange={handleChange}
              className="contact-input bg-gradient-to-b from-[#0F1333] to-[#1D203F] "
            />
          </div>
          {formError?.title && (
            <p className="!text-red-500 text-sm px-2">
              {formError.title}
            </p>
          )}

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
      </form >
    </div>
  );
};

export default TitleContent;
