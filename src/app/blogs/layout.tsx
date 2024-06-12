import React from "react";
import type { Metadata } from "next";
import PageProps from "@/components/PageProps";
import Scripts from "@/components/Scripts";

export const metadata: Metadata = {
  title: "IntelliWriter.io Blogs – Keep in touch with Us",
  description:
    "Daily Updated blogs of Intelliwriter AI Development and features",
};
type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <head>
        <title>IntelliWriter.io Blogs – Keep in touch with Us</title>
        <meta
          name="description"
          content="Daily Updated blogs of Intelliwriter AI Development and features."
        />
        <link rel="canonical" href="https://intelliwriter.io/blogs" />
      </head>
      <body>
        <PageProps>{children}</PageProps>
        <Scripts />
      </body>
    </>
  );
}
