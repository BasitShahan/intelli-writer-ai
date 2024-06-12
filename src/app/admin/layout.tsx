import React from "react";
import Head from "next/head";
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Admin | Intelliwriter</title>
      </Head>
      <body>{children}</body>
    </>
  );
};

export default AdminLayout;
