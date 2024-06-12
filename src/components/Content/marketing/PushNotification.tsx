"use client";

import Button from "@/components/Button";
import { useWebContext } from "@/context/ContextProvider";
import { FormEvent, useState } from "react";


interface Props {
  type: string;
}
interface FormProps {
  description?: string;
}

const PushNotification = ({ }: Props) => {
  const { getResponse } = useWebContext();


  const [formData, setFormData] = useState({
    description: "",
  });

  const { description } = formData;

  const [formError, setFormError] = useState<FormProps | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!description) {
      setFormError({ description: "Description is required" });
      return;
    } else {
      setFormError({
        description: "",
      });

      const prompt = `Write a push notification having the description ${description}. Response must be in html paragraph with strong tag for headings and <br/> for linebreaks.`;
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
            <label htmlFor="message" className="text-white mb-2 font-bold">
              Description <span className="text-pink-500">*</span>
            </label>
            <textarea
              placeholder="i.e We strive to the best when it comes to content creation "
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

export default PushNotification;
