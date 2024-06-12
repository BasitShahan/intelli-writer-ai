"use client";

import { useWebContext } from "@/context/ContextProvider";
import dynamic from "next/dynamic";
import React from "react";
import Chatbot from "./Chatbot";
import ADAButton from "@/components/ADAButton";
const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

const PageProps = ({ children }: { children: React.ReactNode }) => {
  const { aboutRef, pricingRef } = useWebContext();
  return (
    <>
      <Header aboutRef={aboutRef} pricingRef={pricingRef} />
      {children}
      {/* <Chatbot/> */}
      <ADAButton />
      <Footer />
    </>
  );
};

export default PageProps;
