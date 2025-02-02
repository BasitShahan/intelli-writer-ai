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
  description?: string;
}

const Audience = ({ type }: Props) => {
  const { getResponse } = useWebContext();
  const [formData, setFormData] = useState({
    product: "",
    audience: "",
    description: "",
  });
  const { product, audience, description } = formData;
  const [formError, setFormError] = useState<FormProps | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!product) {
      setFormError({ product: "Product is required" });
      return;
    } else if (!audience) {
      setFormError({ audience: "Audience is required" });
      return;
    } else if (!description) {
      setFormError({ description: "Description is required" });
      return;
    } else {
      setFormError({
        product: "",
        audience: "",
        description: "",
      });

      let query = "";
      switch (type) {
        case "about-us":
          query = `Write about us having this product ${product} according to this audience ${audience} the description is ${description}. Now, I want response in html paragraph with strong and bold tag for headings and subheadings represented by size and bullets with numbers. After paragraph, use <br/> for linebreaks.`;
          getResponse(query);
          break;
        case "call-to-action":
          query = `Write call to action having this product ${product} according to this audience ${audience} the description is ${description}. Now, I want response in html paragraph with strong and bold tag for headings and subheadings represented by size and bullets with numbers. After paragraph, use <br/> for linebreaks.`;
          getResponse(query);
          break;
        case "headline":
          query = `Write headline having this product ${product} according to this audience ${audience} the description is ${description}. Now, I want response in html paragraph with strong and bold tag for headings and subheadings represented by size and bullets with numbers. After paragraph, use <br/> for linebreaks.`;
          getResponse(query);
          break;
        case "how-it-works":
          query = `Write how it works having this product ${product} according to this audience ${audience} the description is ${description}. Now, I want response in html paragraph with strong and bold tag for headings and subheadings represented by size and bullets with numbers. After paragraph, use <br/> for linebreaks.`;
          getResponse(query);
          break;
        case "subheadline":
          query = `Write subheadline having this product ${product} according to this audience ${audience} the description is ${description}. Now, I want response in html paragraph with strong and bold tag for headings and subheadings represented by size and bullets with numbers. After paragraph, use <br/> for linebreaks.`;
          getResponse(query);
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

          <div className="flex flex-col">
            <label htmlFor="message" className="text-white mb-2 font-bold">
              Description <span className="text-pink-500">*</span>
            </label>
            <textarea
              placeholder="i.e The best places to visit in this summer"
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

export default Audience;
