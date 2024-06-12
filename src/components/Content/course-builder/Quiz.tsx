"use client";

import Button from "@/components/Button";
import { useWebContext } from "@/context/ContextProvider";
import React, { useState, FormEvent } from "react";

interface Props {
  type: string;
}
interface FormProps {
  sub?: string;
  topic?: string;
  question?: string;
}

const Quiz = ({ }: Props) => {
  const { getResponse } = useWebContext();

  const [formData, setFormData] = useState({
    sub: "",
    topic: "",
    question: "",
  });

  const { sub, topic, question } = formData;

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
    if (!sub) {
      setFormError({ sub: "Quiz Subject is required" });
      return;
    } else if (!topic) {
      setFormError({ topic: "quiz topic is required" });
      return;
    } else if (!question) {
      setFormError({ question: "Quiz question is required" });
      return;
    } else {
      setFormError({
        sub: "",
        topic: "",
        question: "",
      });

      const prompt = `Write a Quiz having this subject name ${sub} with having this quiz topic ${topic} also according to number of question ${question}. Response must be in html paragraph with strong tag for headings and <br/> for linebreaks.`;
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
              Quiz Subject <span className="text-pink-500">*</span>
            </label>

            <input
              type="text"
              name="sub"
              placeholder="i.e Physics, Computer, Maths"
              value={sub}
              onChange={handleChange}
              className="contact-input bg-gradient-to-b from-[#0F1333] to-[#1D203F] "
            />
          </div>
          {formError?.sub && (
            <p className="!text-red-500 text-sm px-2">{formError.sub}</p>
          )}

          <div className="flex flex-col">
            <label htmlFor="name" className="text-white mb-2 font-bold">
              Quiz Topic <span className="text-pink-500">*</span>
            </label>

            <input
              type="text"
              name="topic"
              placeholder="i.e Binomial, Newton, SEO Optimization"
              value={topic}
              onChange={handleChange}
              className="contact-input bg-gradient-to-b from-[#0F1333] to-[#1D203F] "
            />
          </div>
          {formError?.topic && (
            <p className="!text-red-500 text-sm px-2">{formError.topic}</p>
          )}

          <div className="flex flex-col">
            <label htmlFor="name" className="text-white mb-2 font-bold">
              No. of Questions <span className="text-pink-500">*</span>
            </label>

            <input
              type="text"
              name="question"
              placeholder="i.e 4,8,10"
              value={question}
              onChange={handleChange}
              className="contact-input bg-gradient-to-b from-[#0F1333] to-[#1D203F] "
            />
          </div>
          {formError?.question && (
            <p className="!text-red-500 text-sm px-2">{formError.question}</p>
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

export default Quiz;
