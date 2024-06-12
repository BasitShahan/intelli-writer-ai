import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import { ContextProvider } from "@/context/ContextProvider";
import type { Metadata } from "next";
import "./globals.css";
import "swiper/css";
import "swiper/css/effect-cards";

export const metadata: Metadata = {
  title: "Intelliwriter.io: Best AI Image Generator & Free AI Writing",
  description:
    "Boost creativity with the best AI image generator & free AI writing tools. Explore 70+ innovative features!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ContextProvider>
        <AuthProvider>{children}</AuthProvider>
      </ContextProvider>
    </html>
  );
}
