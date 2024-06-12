import PageProps from "@/components/PageProps";
import Scripts from "@/components/Scripts";
import type { Metadata } from "next";
import React from "react";
import Head from "next/head";
export const metadata: Metadata = {
  title: "IntelliWriter Image generator – Get Instant AI Generated Images",
  description:
    "Generate effortlessly images for our AI tool by defining you thoughts!",
};

const AIImages = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>
          IntelliWriter Image generator – Get Instant AI Generated Images
        </title>
        <meta
          name="description"
          content="Generate effortlessly images for our AI tool by defining you thoughts!"
        />
        <link rel="canonical" href="https://intelliwriter.io/contact" />
        <script dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MNPNZ6PR');` }} />

      </Head>
      <body>
        <PageProps>{children}</PageProps>
        <Scripts />
      </body>
    </>
  );
};

export default AIImages;
