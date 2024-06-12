"use client";

import Button from "@/components/Button";
import { useWebContext } from "@/context/ContextProvider";
import React, { FormEvent, useState } from "react";
import Select, { Props as SelectProps } from "react-select";

type AsgLevelType =
  | SelectProps<{ value: number; label: string }>["value"]
  | null;

const AsgLevel = [
  { value: 1, label: "Easy" },
  { value: 2, label: "Medium" },
  { value: 3, label: "Complex" },
];

interface Props {
  type: string;
}
interface FormProps {
  sub?: string;
  start?: string;
  due?: string;
  asgLevel?: string;
  target?: string;
  question?: string;
  objective?: string;
}

const Assignment = ({ }: Props) => {
  const { getResponse } = useWebContext();

  const [formData, setFormData] = useState({
    sub: "",
    start: "",
    due: "",
    asgLevel: "",
    target: "",
    question: "",
    objective: "",
  });

  const [asgLevel, setAsgLevel] = useState<AsgLevelType>(null);

  const { sub, start, due, target, question, objective } = formData;

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
      setFormError({ sub: "Assignment Subject is required" });
      return;
    } else if (!start) {
      setFormError({ start: "Start date is required" });
      return;
    } else if (!due) {
      setFormError({ due: "Due date is required" });
      return;
    } else if (!asgLevel) {
      setFormError({ asgLevel: "Assignment Level is required" });
      return;
    } else if (!target) {
      setFormError({ target: "Target Audience is required" });
      return;
    } else if (!question) {
      setFormError({ question: "No of question is required" });
      return;
    } else if (!objective) {
      setFormError({ objective: "Learning objective is required" });
      return;
    } else {
      setFormError({
        sub: "",
        due: "",
        asgLevel: "",
        target: "",
        question: "",
        objective: "",
      });

      const prompt = `Write a Assignment having this subject name ${sub} write assignment start date having this start date ${sub} also write assignment due date having this due date ${due} also select assignment level ${asgLevel} for the target audience ${target} for the given number of question ${question} with some learning objective ${objective} . Response must be in html paragraph with strong tag for headings and <br/> for linebreaks.`;
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
              Assignment Subject <span className="text-pink-500">*</span>
            </label>

            <input
              type="text"
              name="sub"
              placeholder="i.e Enter Subject"
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
              Assignment Start Date <span className="text-pink-500">*</span>
            </label>

            <input
              type="text"
              name="start"
              placeholder="For example Jan 25, 2024"
              value={start}
              onChange={handleChange}
              className="contact-input bg-gradient-to-b from-[#0F1333] to-[#1D203F] "
            />
          </div>
          {formError?.start && (
            <p className="!text-red-500 text-sm px-2">{formError.start}</p>
          )}

          <div className="flex flex-col">
            <label htmlFor="name" className="text-white mb-2 font-bold">
              Assignment Due Date <span className="text-pink-500">*</span>
            </label>

            <input
              type="text"
              name="due"
              placeholder="For example Jan 25, 2024"
              value={due}
              onChange={handleChange}
              className="contact-input bg-gradient-to-b from-[#0F1333] to-[#1D203F] "
            />
          </div>
          {formError?.due && (
            <p className="!text-red-500 text-sm px-2">{formError.due}</p>
          )}

          <div className="flex flex-col">
            <label htmlFor="name" className="text-white mb-2 font-bold">
              Assignment Level <span className="text-pink-500">*</span>
            </label>
            <Select
              name="assignment_level"
              value={asgLevel}
              options={AsgLevel}
              className="w-full border rounded p-2 bg-[rgba(32,45,72,0.41)] focus:outline-[#640F6C]"
              onChange={(selectedOption) =>
                setAsgLevel(
                  selectedOption
                    ? (selectedOption as (typeof AsgLevel)[number])
                    : null
                )
              }
              placeholder="Select Assignment Level"
            />
          </div>
          {formError?.asgLevel && (
            <p className="!text-red-500 text-sm px-2">{formError.asgLevel}</p>
          )}

          <div className="flex flex-col">
            <label htmlFor="name" className="text-white mb-2 font-bold">
              Target Audience <span className="text-pink-500">*</span>
            </label>

            <input
              type="text"
              name="target"
              placeholder="i.e Bechalors, Masters, Content Writer"
              value={target}
              onChange={handleChange}
              className="contact-input bg-gradient-to-b from-[#0F1333] to-[#1D203F] "
            />
          </div>
          {formError?.target && (
            <p className="!text-red-500 text-sm px-2">{formError.target}</p>
          )}

          <div className="flex flex-col">
            <label htmlFor="name" className="text-white mb-2 font-bold">
              No of Question <span className="text-pink-500">*</span>
            </label>

            <input
              type="text"
              name="question"
              placeholder="Number of Question"
              value={question}
              onChange={handleChange}
              className="contact-input bg-gradient-to-b from-[#0F1333] to-[#1D203F] "
            />
          </div>
          {formError?.question && (
            <p className="!text-red-500 text-sm px-2">{formError.question}</p>
          )}

          <div className="flex flex-col">
            <label htmlFor="message" className="text-white mb-2 font-bold">
              Learning Objective <span className="text-pink-500">*</span>
            </label>
            <textarea
              placeholder="The best places to visit in this summer"
              name="objective"
              value={objective}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  objective: e.target.value,
                }))
              }
              className="contact-textarea bg-gradient-to-b from-[#0F1333] to-[#1D203F]"
            ></textarea>
          </div>
          {formError?.objective && (
            <p className="!text-red-500 text-sm px-2">
              {formError.objective}
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

export default Assignment;
