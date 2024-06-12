"use client";

import "@/app/globals.css";
import { useAuth } from "@/context/AuthContext";
import { useWebContext } from "@/context/ContextProvider";
import {
  Alert,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { BiSolidImageAlt } from "react-icons/bi";
import { CgWebsite } from "react-icons/cg";
import { FaBook, FaDollarSign, FaRegShareSquare } from "react-icons/fa";
import { FaRocketchat, FaYoutube } from "react-icons/fa6";
import { GiSoundWaves,GiStarMedal, } from "react-icons/gi";
import { IoIosClose } from "react-icons/io";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdContactSupport, MdVoiceChat } from "react-icons/md";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { TbApi } from "react-icons/tb";
import {
  SiBloglovin,
  SiChatbot,
  SiGooglemarketingplatform,
} from "react-icons/si";
import { TbTextCaption } from "react-icons/tb";
import Swal from "sweetalert2";
import { Logo } from "../../public";

export function Sidebar() {
  const router = useRouter();
  const [openAlert, setOpenAlert] = React.useState(true);
  const { setToggle, toggle } = useWebContext();
  const { setTokens, setNameLetter } = useAuth();

  const logout = async () => {
    sessionStorage.removeItem("tokens");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("nameLetter");
    sessionStorage.removeItem("userId");
    setTokens(null);
    setNameLetter("");
    await Swal.fire({
      icon: "success",
      title: "Success",
      text: "Logout Successfully!",
    });
    router.push("/");
  };

  const pathName = usePathname();

  return (
    <div
      className={`sm:w-[250px] w-full border-r z-[999] fixed top-0 lg:left-0 transition-all duration-200 ${toggle ? "left-0" : "sm:-left-[250px] -left-full"
        } border-[#54515b] rounded-none h-screen p-0 py-4 pt-0 shadow-xl bg-[rgb(32,45,72)] md:bg-[rgba(32,45,72,0.4)] backdrop-blur-sm overflow-y-auto transition-all duration-200 custom-scrollbar`}
    >
      {/* Close icon */}
      <IoIosClose
        className="text-white text-4xl absolute top-5 right-2 lg:hidden block"
        onClick={() => setToggle(!toggle)}
      />

      <div className="mb-0 p-4 border-b border-[#54515b]">
        <Link href="/">
          <img src={Logo} alt="Logo" className="w-[150px] " />
        </Link>
      </div>

      <List placeholder="" className="py-4 rounded-none space-y-2">
        {/* Dashboard */}
        <div className="space-y-2">
          <p className="text-[12px] font-medium uppercase text-gray-300">
            Start Here
          </p>

          <Link
            href="/user/dashboard"
            className={`flex items-center border-b-0 p-3 list-item-hover rounded-[6px]  ${pathName == "/user/dashboard" ? "bg-btnPrimary" : ""
              } `}
            onClick={() => setToggle(!toggle)}
          >
            <ListItem placeholder="" className="p-0 space-x-2">
              <ListItemPrefix placeholder="">
                <LuLayoutDashboard className="h-5 w-5 text-white" />
              </ListItemPrefix>
              <Typography
                placeholder=""
                className="text-white font-normal text-[17px] "
              >
                Dashboard
              </Typography>
            </ListItem>
          </Link>
        </div>

        <div className="pt-3 space-y-2">
          <p className="text-[12px] font-medium uppercase text-gray-300">
            Our Tools
          </p>

          {/* AI Image Generator */}
          <Link
            href="/user/image-generator"
            className={`flex items-center border-b-0 p-3 list-item-hover rounded-[6px] ${pathName == "/user/image-generator" ? "bg-btnPrimary" : " "
              } `}
            onClick={() => setToggle(!toggle)}
          >
            <ListItem placeholder="" className="p-0 space-x-2">
              <ListItemPrefix placeholder="">
                <BiSolidImageAlt className="h-5 w-5 text-white" />
              </ListItemPrefix>
              <Typography
                placeholder=""
                className="text-white font-normal text-[17px] "
              >
                AI Image Generator
              </Typography>
            </ListItem>
          </Link>

          {/* AI Voice Generator */}
          <Link
            href="/user/voice-generator"
            className={`flex items-center border-b-0 p-3 list-item-hover rounded-[6px] ${pathName == "/user/voice-generator" ? "bg-btnPrimary" : " "
              } `}
            onClick={() => setToggle(!toggle)}
          >
            <ListItem placeholder="" className="p-0 space-x-2">
              <ListItemPrefix placeholder="">
                <GiSoundWaves className="h-5 w-5 text-white" />
              </ListItemPrefix>
              <Typography
                placeholder=""
                className="text-white font-normal text-[17px] "
              >
                AI Voice Generator
              </Typography>
            </ListItem>
          </Link>

          {/* AI Bypass */}
          <Link
            href="/user/ai-bypass"
            className={`flex items-center border-b-0 p-3 list-item-hover rounded-[6px] ${pathName == "/user/ai-bypass" ? "bg-btnPrimary" : " "
              } `}
            onClick={() => setToggle(!toggle)}
          >
            <ListItem placeholder="" className="p-0 space-x-2">
              <ListItemPrefix placeholder="">
                <FaRocketchat className="h-5 w-5 text-white" />
              </ListItemPrefix>
              <Typography
                placeholder=""
                className="text-white font-normal text-[17px] "
              >
                Bypass AI
              </Typography>
            </ListItem>
          </Link>

          {/* Blog Content */}
          <Link
            href="/user/blog-content"
            className={`flex items-center border-b-0 p-3 list-item-hover rounded-[6px] ${pathName == "/user/blog-content" ? "bg-btnPrimary" : " "
              } `}
            onClick={() => setToggle(!toggle)}
          >
            <ListItem placeholder="" className="p-0 space-x-2">
              <ListItemPrefix placeholder="">
                <SiBloglovin className="h-5 w-5 text-white" />
              </ListItemPrefix>
              <Typography
                placeholder=""
                className="text-white font-normal text-[17px] "
              >
                Blog Content
              </Typography>
            </ListItem>
          </Link>

          {/* Social Media */}
          <Link
            href="/user/social-media"
            className={`flex items-center border-b-0 p-3 list-item-hover rounded-[6px] ${pathName == "/user/social-media" ? "bg-btnPrimary" : " "
              } `}
            onClick={() => setToggle(!toggle)}
          >
            <ListItem placeholder="" className="p-0 space-x-2">
              <ListItemPrefix placeholder="">
                <FaRegShareSquare className="h-5 w-5 text-white" />
              </ListItemPrefix>
              <Typography
                placeholder=""
                className="text-white font-normal text-[17px] "
              >
                Social Media
              </Typography>
            </ListItem>
          </Link>

          {/* Marketing */}
          <Link
            href="/user/marketing"
            className={`flex items-center border-b-0 p-3 list-item-hover rounded-[6px] ${pathName == "/user/marketing" ? "bg-btnPrimary" : " "
              } `}
            onClick={() => setToggle(!toggle)}
          >
            <ListItem placeholder="" className="p-0 space-x-2">
              <ListItemPrefix placeholder="">
                <SiGooglemarketingplatform className="h-5 w-5 text-white" />
              </ListItemPrefix>
              <Typography
                placeholder=""
                className="text-white font-normal text-[17px] "
              >
                Marketing
              </Typography>
            </ListItem>
          </Link>

          {/* Website */}
          <Link
            href="/user/website"
            className={`flex items-center border-b-0 p-3 list-item-hover rounded-[6px] ${pathName == "/user/website" ? "bg-btnPrimary" : " "
              } `}
            onClick={() => setToggle(!toggle)}
          >
            <ListItem placeholder="" className="p-0 space-x-2">
              <ListItemPrefix placeholder="">
                <CgWebsite className="h-5 w-5 text-white" />
              </ListItemPrefix>
              <Typography
                placeholder=""
                className="text-white font-normal text-[17px] "
              >
                Website
              </Typography>
            </ListItem>
          </Link>

          {/* Course Builder */}
          <Link
            href="/user/course-builder"
            className={`flex items-center border-b-0 p-3 list-item-hover rounded-[6px] ${pathName == "/user/course-builder" ? "bg-btnPrimary" : " "
              } `}
            onClick={() => setToggle(!toggle)}
          >
            <ListItem placeholder="" className="p-0 space-x-2">
              <ListItemPrefix placeholder="">
                <FaBook className="h-5 w-5 text-white" />
              </ListItemPrefix>
              <Typography
                placeholder=""
                className="text-white font-normal text-[17px] "
              >
                Course Builder
              </Typography>
            </ListItem>
          </Link>

          <Link
            href="/user/image-caption-generator"
            className={`flex items-center border-b-0 p-3 list-item-hover rounded-[6px] ${pathName == "/user/image-caption-generation"
              ? "bg-[#640f6c]"
              : " "
              } `}
            onClick={() => setToggle(!toggle)}
          >
            <ListItem placeholder="" className="p-0 space-x-2">
              <ListItemPrefix placeholder="">
                <TbTextCaption className="h-5 w-5 text-white" />
              </ListItemPrefix>

              <Typography placeholder="" className="text-white font-normal text-[17px] ">
                Image Caption Generator{" "}
              </Typography>
            </ListItem>
          </Link>

          {/*SPEECH CONTENT*/}

          <Link
            href="/user/speech-content-generator"
            className={`flex items-center border-b-0 p-3 list-item-hover rounded-[6px] ${pathName == "/user/speech-content-generator"
                ? "bg-btnPrimary"
                : " "
              } `}
            onClick={() => setToggle(!toggle)}
          >
            <ListItem placeholder="" className="p-0 space-x-2">
              <ListItemPrefix placeholder="">
                <MdVoiceChat className="h-5 w-5 text-white" />
              </ListItemPrefix>
              <Typography
                placeholder=""
                className="text-white font-normal text-[17px] "
              >
                Speech Content
              </Typography>
            </ListItem>
          </Link>

          {/* Youtube Content */}
          <Link
            href="/user/youtube-content"
            className={`flex items-center border-b-0 p-3 list-item-hover rounded-[6px] ${pathName == "/user/youtube-content" ? "bg-btnPrimary" : " "
              } `}
            onClick={() => setToggle(!toggle)}
          >
            <ListItem placeholder="" className="p-0 space-x-2">
              <ListItemPrefix placeholder="">
                <FaYoutube className="h-5 w-5 text-white" />
              </ListItemPrefix>
              <Typography
                placeholder=""
                className="text-white font-normal text-[17px] "
              >
                Youtube Content
              </Typography>
            </ListItem>
          </Link>

          {/* Chat */}
          <Link
            href="/user/chat"
            className={`flex items-center border-b-0 p-3 list-item-hover rounded-[6px] ${pathName == "/user/chat" ? "bg-btnPrimary" : " "
              } `}
            onClick={() => setToggle(!toggle)}
          >
            <ListItem placeholder="" className="p-0 space-x-2">
              <ListItemPrefix placeholder="">
                <SiChatbot className="h-5 w-5 text-white" />
              </ListItemPrefix>
              <Typography
                placeholder=""
                className="text-white font-normal text-[17px] "
              >
                AI Chat
              </Typography>
            </ListItem>
          </Link>

          {/* Rewards and Community Program */}
          <Link
            href="/user/reward-program"
            className={`flex items-center border-b-0 p-3 list-item-hover rounded-[6px] ${pathName == "/user/reward-program" ? "bg-btnPrimary" : " "
              } `}
            onClick={() => setToggle(!toggle)}
          >
            <ListItem placeholder="" className="p-0 space-x-2">
              <ListItemPrefix placeholder="">
                <GiStarMedal  className="h-5 w-5 text-white" />
              </ListItemPrefix>
              <Typography
                placeholder=""
                className="text-white font-normal text-[17px] "
              >
                Rewards and Community
              </Typography>
            </ListItem>
          </Link>

          {/*Intelli APis Pricing*/}
          <Link
            href="/user/intelli-apis"
            className={`flex items-center border-b-0 p-3 list-item-hover rounded-[6px] ${pathName == "/user/intelli-apis" ? "bg-btnPrimary" : " "
              } `}
            onClick={() => setToggle(!toggle)}
          >
            <ListItem placeholder="" className="p-0 space-x-2">
              <ListItemPrefix placeholder="">
                <TbApi className="h-5 w-5 text-white" />
              </ListItemPrefix>
              <Typography
                placeholder=""
                className="text-white font-normal text-[17px] "
              >
                Intelli APIs
              </Typography>
            </ListItem>
          </Link>
        </div>

        <div className="pt-3 space-y-2">
          <p className="text-[12px] font-medium uppercase text-gray-300">
            Support
          </p>
          {/* Plans */}
          <Link
            href="/user/plans"
            className={`flex items-center border-b-0 p-3 list-item-hover rounded-[6px] ${pathName == "/user/plans" ? "bg-btnPrimary" : " "
              } `}
            onClick={() => setToggle(!toggle)}
          >
            <ListItem placeholder="" className="p-0 space-x-2">
              <ListItemPrefix placeholder="">
                <FaDollarSign className="h-5 w-5 text-white" />
              </ListItemPrefix>
              <Typography
                placeholder=""
                className="text-white font-normal text-[17px] "
              >
                Pricing Plans
              </Typography>
            </ListItem>
          </Link>

          {/* FAQs & Help */}
          <Link
            href="/user/faqs"
            className={`flex items-center border-b-0 p-3 list-item-hover rounded-[6px] ${pathName == "/user/faqs" ? "bg-btnPrimary" : " "
              } `}
            onClick={() => setToggle(!toggle)}
          >
            <ListItem placeholder="" className="p-0 space-x-2">
              <ListItemPrefix placeholder="">
                <MdContactSupport className="h-5 w-5 text-white" />
              </ListItemPrefix>
              <Typography
                placeholder=""
                className="text-white font-normal text-[17px] "
              >
                FAQs & Help
              </Typography>
            </ListItem>
          </Link>

          {/* Logout */}
          <div
            className="flex items-center border-b-0 p-3 list-item-hover rounded-[6px]"
            onClick={() => logout()}
          >
            <ListItem placeholder="" className="p-0 space-x-2">
              <ListItemPrefix placeholder="">
                <RiLogoutBoxRFill className="h-5 w-5 text-white" />
              </ListItemPrefix>
              <Typography
                placeholder=""
                className="text-white font-normal text-[17px] "
              >
                Log Out
              </Typography>
            </ListItem>
          </div>
        </div>
      </List>

      <Alert
        open={openAlert}
        className="sidebarAlert mt-0 bg-gradient-to-bl from-btnPrimary to-btnSecondary"
        onClose={() => setOpenAlert(false)}
      >
        <Typography placeholder="" variant="h6" className="mb-1">
          Upgrade to Premium
        </Typography>
        <Typography
          placeholder=""
          variant="small"
          className="font-normal opacity-80"
        >
          Upgrade to premium and get even more advanced features and premium.
        </Typography>
        <div className="mt-4 flex gap-3">
          <Typography
            placeholder=""
            as="a"
            href="#"
            variant="small"
            className="font-medium opacity-80"
            onClick={() => setOpenAlert(false)}
          >
            Dismiss
          </Typography>
          <Typography
            placeholder=""
            as="a"
            href="/user/plans"
            variant="small"
            className="font-medium"
          >
            Upgrade Now
          </Typography>
        </div>
      </Alert>
    </div>
  );
}
