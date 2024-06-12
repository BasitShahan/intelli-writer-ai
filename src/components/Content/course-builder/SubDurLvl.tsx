"use client";

import Button from "@/components/Button";
import { useWebContext } from "@/context/ContextProvider";
import React, { FormEvent, useState } from "react";
import Select from "react-select";

const CourseLevel = [
  { value: 1, label: "Beginner" },
  { value: 2, label: "Intermediate" },
  { value: 3, label: "Professional" },
];

interface Props {
  type: string;
}
interface FormProps {
  sub?: string;
  duration?: string;
  courseLevel?: string;
}

interface selectOption {
  label?: string | undefined;
  value?: number;
}

const SubDurLvl = ({ type }: Props) => {
  const { getResponse, setCourseContentInfo } = useWebContext();
  const [courseLevel, setAsgLevel] = useState<selectOption | null>(null);
  const [formError, setFormError] = useState<FormProps | null>(null);
  const [formData, setFormData] = useState({
    sub: "",
    duration: "",
    courseLevel: "",
  });


  const { sub, duration } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const styles = {
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "#00BBFE"
        : state.isSelected
          ? "#00BBFE"
          : "transparent",
    }),
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!sub) {
      setFormError({ sub: "Course Subject is required" });
      return;
    } else if (!duration) {
      setFormError({ duration: "Course Duration is required" });
      return;
    } else if (!courseLevel) {
      setFormError({ courseLevel: "Course Level is required" });
      return;
    } else {
      setFormError({
        sub: "",
        duration: "",
        courseLevel: "",
      });

      let prompt = "";
      switch (type) {
        case "course-content":
          setCourseContentInfo(sub, duration, courseLevel?.label || "");
          prompt = `You are course outline Generator for ${sub} subject. "You must generate briefly ${duration} duration course outline that aimed at ${courseLevel.label} level students.Including Credit Hours,Course Outcomes, Course Assessments,Recommended Books and Reference Material, Schedule with Theory and Practical Components in detail".  I want response in html paragraph with strong and bold tag for headings and subheadings represented by size and bullets with numbers. After paragraph, use <br/> for linebreaks. `;
          getResponse(prompt);
          break;

        case "course-outline":
          prompt = `You are course outline Generator for ${sub} subject. "You must generate briefly ${duration} duration course outline that aimed at ${courseLevel.label} level students.Including Credit Hours,Course Outcomes, Course Assessments,Recommended Books and Reference Material, Schedule with Theory and Practical Components in detail".  I want response in html paragraph with strong and bold tag for headings and subheadings represented by size and bullets with numbers. After paragraph, use <br/> for linebreaks.`;
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
              Course Subject <span className="text-pink-500">*</span>
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
              Course Duration <span className="text-pink-500">*</span>
            </label>

            <input
              type="text"
              name="duration"
              placeholder="For example 5 Days, 2 Weeks, 1 Month"
              value={duration}
              onChange={handleChange}
              className="contact-input bg-gradient-to-b from-[#0F1333] to-[#1D203F] "
            />
          </div>
          {formError?.duration && (
            <p className="!text-red-500 text-sm px-2">{formError.duration}</p>
          )}

          <div className="flex flex-col course">
            <label htmlFor="name" className="text-white mb-2 font-bold">
              Course Level <span className="text-pink-500">*</span>
            </label>
            <Select
              className="w-full rounded-full h-[55px] bg-gradient-to-b from-[#0F1333] to-[#1D203F]"
              value={courseLevel}
              onChange={(selectedOption) =>
                setAsgLevel(
                  selectedOption
                    ? (selectedOption as (typeof CourseLevel)[number])
                    : null
                )
              } options={CourseLevel}
              styles={styles}
              placeholder="Select Course Level"

            />
          </div>
          {formError?.courseLevel && (
            <p className="!text-red-500 text-sm px-2">
              {formError.courseLevel}
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

export default SubDurLvl;
