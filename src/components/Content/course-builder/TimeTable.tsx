"use client";

import Button from "@/components/Button";
import { useWebContext } from "@/context/ContextProvider";
import React, { FormEvent, useState } from "react";
import Select, { Props as SelectProps } from "react-select";

type TimeDuraType =
  | SelectProps<{ value: number; label: string }>["value"]
  | null;
type SchedHrsType =
  | SelectProps<{ value: number; label: string }>["value"]
  | null;
type EndHrsType = SelectProps<{ value: number; label: string }>["value"] | null;

const TimeDura = [
  { value: 1, label: "1 Week" },
  { value: 2, label: "2 Week" },
  { value: 3, label: "3 Week" },
];

const SchedHrs = [
  { value: 1, label: "1 AM" },
  { value: 2, label: "2 AM" },
  { value: 3, label: "3 Am" },
];

const EndHrs = [
  { value: 1, label: "1 AM" },
  { value: 2, label: "2 AM" },
  { value: 3, label: "3 AM" },
];

interface Props {
  type: string;
}
interface FormProps {
  sub?: string;
  timedura?: string;
  schedhrs?: string;
  endhrs?: string;
  description?: string;
}

const Assignment = ({ }: Props) => {
  const { getResponse } = useWebContext();

  const [formData, setFormData] = useState({
    sub: "",
    timedura: "",
    schedhrs: "",
    endhrs: "",
    description: "",
  });

  const [timedura, settimedura] = useState<TimeDuraType>(null);
  const [schedhrs, setschedhrs] = useState<SchedHrsType>(null);
  const [endhrs, setendhrs] = useState<EndHrsType>(null);

  const { sub, description } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [formError, setFormError] = useState<FormProps | null>(null);

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
      setFormError({ sub: "Assignment Subject is required" });
      return;
    } else if (!timedura) {
      setFormError({ timedura: "Time Duration is required" });
      return;
    } else if (!schedhrs) {
      setFormError({ schedhrs: "Schedule Hour is required" });
      return;
    } else if (!endhrs) {
      setFormError({ endhrs: "Ending Hours is required" });
      return;
    } else if (!description) {
      setFormError({ description: "Learning objective is required" });
      return;
    } else {
      setFormError({
        sub: "",
        timedura: "",
        schedhrs: "",
        endhrs: "",
        description: "",
      });

      const prompt = `Write a time table having this subject name ${sub} with the given time duration ${timedura} also schedule the hours of the time table having  ${schedhrs} also with the ending hours with ${endhrs} with the time table having this description ${description}. Response must be in html paragraph with strong tag for headings and <br/> for linebreaks.`;
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
              Subject <span className="text-pink-500">*</span>
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

          <div className="flex flex-col course">
            <label htmlFor="name" className="text-white mb-2 font-bold">
              Time Duration <span className="text-pink-500">*</span>
            </label>
            <Select
              name="time_duration"
              value={timedura}
              options={TimeDura}
              className="w-full rounded-full h-[55px] bg-gradient-to-b from-[#0F1333] to-[#1D203F]"
              onChange={(selectedOption) =>
                settimedura(
                  selectedOption
                    ? (selectedOption as (typeof TimeDura)[number])
                    : null
                )
              }
              styles={styles}
              placeholder="Select Time Duration"
            />
          </div>
          {formError?.timedura && (
            <p className="!text-red-500 text-sm px-2">{formError.timedura}</p>
          )}

          <div className="flex flex-col course">
            <label htmlFor="name" className="text-white mb-2 font-bold">
              Schedule Hour<span className="text-pink-500">*</span>
            </label>
            <Select
              name="time_duration"
              value={schedhrs}
              options={SchedHrs}
              className="w-full rounded-full h-[55px] bg-gradient-to-b from-[#0F1333] to-[#1D203F]"
              onChange={(selectedOption) =>
                setschedhrs(
                  selectedOption
                    ? (selectedOption as (typeof SchedHrs)[number])
                    : null
                )
              }
              styles={styles}
              placeholder="Select Schedule Hours"
            />
          </div>
          {formError?.schedhrs && (
            <p className="!text-red-500 text-sm px-2">{formError.schedhrs}</p>
          )}

          <div className="flex flex-col course">
            <label htmlFor="name" className="text-white mb-2 font-bold">
              Ending Hours <span className="text-pink-500">*</span>
            </label>
            <Select
              name="time_duration"
              value={endhrs}
              options={EndHrs}
              className="w-full rounded-full h-[55px] bg-gradient-to-b from-[#0F1333] to-[#1D203F]"
              onChange={(selectedOption) =>
                setendhrs(
                  selectedOption
                    ? (selectedOption as (typeof EndHrs)[number])
                    : null
                )
              }
              styles={styles}
              placeholder="Select Time Duration"
            />
          </div>
          {formError?.endhrs && (
            <p className="!text-red-500 text-sm px-2">{formError.endhrs}</p>
          )}

          <div className="flex flex-col">
            <label htmlFor="message" className="text-white mb-2 font-bold">
              Timetable Description <span className="text-pink-500">*</span>
            </label>
            <textarea
              placeholder="The best places to visit in this summer"
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

export default Assignment;
