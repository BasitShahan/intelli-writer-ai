"use client";

import Button from "@/components/Button";
import { useWebContext } from "@/context/ContextProvider";
import React, { FormEvent, useState } from "react";

interface Props {
  type: string;
}
interface FormProps {
  product?: string;
  audience?: string;
}

const Audience = ({ type }: Props) => {
  const { getResponse } = useWebContext();
  const [formData, setFormData] = useState({
    product: "",
    audience: "",
  });

  const { product, audience } = formData;

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
    if (!product) {
      setFormError({ product: "Product is required" });
      return;
    } else if (!audience) {
      setFormError({ audience: "Audience is required" });
      return;
    } else {
      setFormError({
        product: "",
        audience: "",
      });

      let prompt = "";
      switch (type) {
        case "advertisement":
          prompt = `Write an advertisement having this title ${product} and the content is this ${audience}. Response must be in html paragraph with strong tag for headings and <br/> for linebreaks.`;
          getResponse(prompt);
          break;
        case "facebook-advertisement":
          prompt = `Write an advertisement for facebook based on the title ${product} and the content is this: "${audience}". Response contains html strong tag for title and sub-title and list points in numbers for listicles with <br /> linebreaks.`;
          getResponse(prompt);
          break;
        case "google-advertisement":
          prompt = `Write an advertisement for google based on title ${product} and the content is this:"${audience}". Response must be html paragraph with strong tag for headings and subheadings, list points in numbers & <br/> for linebreaks.`;
          getResponse(prompt);
          break;
        case "value-proposition":
          prompt = `Generate value propositions of having this product ${product} according to this audience ${audience}. Now, I want response in html paragraph with strong and bold tag for headings and subheadings represented by size and bullets with numbers. After paragraph, use <br/> for linebreaks.`;
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
              Product <span className="text-pink-500">*</span>
            </label>

            <input
              type="text"
              name="product"
              placeholder="i.e Youtube, Netflix, Disney"
              value={product}
              onChange={handleChange}
              className="contact-input bg-gradient-to-b from-[#0F1333] to-[#1D203F] "
            />
          </div>
          {formError?.product && (
            <p className="!text-red-500 text-sm px-2">{formError.product}</p>
          )}

          <div className="flex flex-col">
            <label htmlFor="name" className="text-white mb-2 font-bold">
              Audience <span className="text-pink-500">*</span>
            </label>

            <input
              type="text"
              name="audience"
              placeholder="i.e Musicians, filmakers, gamers"
              value={audience}
              onChange={handleChange}
              className="contact-input bg-gradient-to-b from-[#0F1333] to-[#1D203F] "
            />
          </div>
          {formError?.audience && (
            <p className="!text-red-500 text-sm px-2">{formError.audience}</p>
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

export default Audience;
