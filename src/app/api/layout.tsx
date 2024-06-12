import PageProps from "@/components/PageProps";
import Scripts from "@/components/Scripts";
import type { Metadata } from "next";
import React from "react";
import Head from "next/head";
export const metadata: Metadata = {
  title: "IntelliWriter.io API – Integrate AI Writing & Image Generation",
  description:
    "Seamlessly integrate IntelliWriter.io's AI capabilities into your platform with our robust API. Enhance your app with powerful writing and image tools.",
};

interface APIProps {
  children: React.ReactNode;
}

const APIPageLayout: React.FC<APIProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>
          IntelliWriter.io API – Integrate AI Writing & Image Generation
        </title>
        <meta
          name="description"
          content="Seamlessly integrate IntelliWriter.io's AI capabilities into your platform with our robust API. Enhance your app with powerful writing and image tools."
        />
        <link rel="canonical" href="https://intelliwriter.io/api" />
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

export default APIPageLayout;
