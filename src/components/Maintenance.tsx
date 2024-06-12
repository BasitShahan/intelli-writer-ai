import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Maintenance } from "../../public";

const MaintenancePage = () => {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center justify-center gap-3 !z-[100000] fixed top-0 left-0">
        <Image
          src={Maintenance}
          alt={Maintenance}
          width={850}
          height={850}
          className="md:w-[400px] w-full px-6 object-cover rounded-2xl filter grayscale opacity-50"
        />
        <h2 className="text-5xl md:sm text-center md:text-5xl my-3 text-white/50">
          On Maintenance!
        </h2>
        <p className="text-lg font-thin opacity-80 text-center mb-8">
          Soon new version of an AI Image generation will be live!
        </p>
        <div className="w-fit ">
          <Link href="/">
            <Button title="Back to Home" btnType="button" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default MaintenancePage;
