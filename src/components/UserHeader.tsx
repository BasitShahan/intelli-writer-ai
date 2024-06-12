"use client";

import { useAuth } from "@/context/AuthContext";
import { useWebContext } from "@/context/ContextProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { BiLogOut } from "react-icons/bi";
import { IoMdMenu } from "react-icons/io";
import Swal from "sweetalert2";
import { dropdownMenu, staticNotifications } from "../constants";
import Notifications from "./Notifications";

interface DropdownMenu {
  id: number;
  icon: IconType;
  title: string;
  link: string;
}

const UserHeader = () => {
  const { toggle, setToggle } = useWebContext();
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { nameLetter, setTokens, setNameLetter } = useAuth();
  const [sessionName, setSessionName] = useState<string | null>("Loading...");
  const [sessionLetter, setSessionLetter] = useState<string | null>("");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const logout = async () => {
    ["tokens", "name", "nameLetter", "userId"].forEach((item) =>
      sessionStorage.removeItem(item)
    );
    setTokens(null);
    setNameLetter("");
    await Swal.fire({
      icon: "success",
      title: "Success",
      text: "Logout Successfully!",
    });
    router.push("/");
  };

  const toggleNotifications = () => {
    setShowNotifications((prevState) => !prevState);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setSessionLetter(
      typeof window !== "undefined"
        ? sessionStorage.getItem("nameLetter")
        : null
    );
    setSessionName(
      typeof window !== "undefined" ? sessionStorage.getItem("name") : null
    );

    const storedImage = localStorage.getItem("profileImage");
    setProfileImage(storedImage);
  }, [sessionName, sessionLetter]);

  return (
    <div className="w-full fixed z-50 top-0 left-0">
      <div
        className={`flex items-center sticky top-0 z-20 justify-between px-2 md:px-8 py-2 sm:h-[80px] h-[60px] lg:ml-[250px] ${isScrolled
            ? "bg-[rgba(32,45,72,0.4)] backdrop-blur-sm"
            : "bg-transparent"
          }`}
      >
        {/* Toggle Button */}
        <div className="flex items-center justify-start gap-3">
          <IoMdMenu
            className="text-3xl p-0 m-0 pl-2 flex lg:hidden text-white"
            onClick={() => setToggle(!toggle)}
          />

          <div>
            <h2 className="text-white font-semibold md:text-lg text-sm">
              Hi, {sessionName}
            </h2>
            <p className="text-[10px] md:text-sm text-[whitesmoke]">
              Welcome to Intelliwriter
            </p>
          </div>
        </div>

        <div className="flex">
          <div className="flex items-center gap-3">
            {/* User Avatar */}
            <div className="relative">
              <div
                className={`w-10 h-10 rounded-full uppercase ${profileImage ? " " : "border-2"
                  } bg-slate-300 flex items-center justify-center text-lg cursor-pointer`}
                onClick={() => setDropdown(!dropdown)}
              >
                  
                  <span>{nameLetter || sessionLetter}</span>
                
              </div>

              <ul
                className={`absolute w-[250px] z-[999] right-0 bg-primary rounded-2xl py-3 px-5 overflow-hidden ${dropdown
                    ? "visible transition-all duration-200 translate-y-2"
                    : " invisible transition-all duration-200 translate-y-0 pointer-events-none "
                  }`}
              >
                {dropdownMenu.map((item) => (
                  <Link key={item.id} href={item.link} passHref>
                    <li
                      className="p-3 flex items-center cursor-pointer justify-start gap-4 text-white hover:bg-slate-500 transition duration-200 rounded-2xl hover:scale-105"
                      onClick={() => setDropdown(!dropdown)}
                    >
                      {item.icon && (
                        <img src={item.icon} className="w-[20px]" alt="" />
                      )}
                      <span>{item.title}</span>
                    </li>
                    {(item.id == 2 || item.id == 5) && <div className="w-full flex justify-center"> <div className="my-1.5 w-full h-[1px] bg-[#524d60]" /></div>}
                  </Link>
                ))}

                <li
                  className="p-3 flex items-center justify-start gap-4 text-white hover:bg-slate-500 transition duration-200 cursor-pointer rounded-2xl hover:scale-105"
                  onClick={() => {
                    setDropdown(!dropdown);
                    logout();
                  }}
                >
                  <span className="text-xl">
                    <BiLogOut />
                  </span>
                  <span>Logout</span>
                </li>
              </ul>
            </div>

            {dropdown && (
              <div
                className="w-full h-screen z-20 fixed top-0 left-0 bg-black/30 transition-all duration-200"
                onClick={() => setDropdown(!dropdown)}
              />
            )}
          </div>
        </div>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div className="absolute right-0 mt-0 mr-2 z-30">
            {showNotifications && (
              <div>
                <div
                  className="w-full h-screen fixed bg-black/40 top-0 left-0"
                  onClick={() => setShowNotifications(false)}
                ></div>

                <div className="absolute right-0 mt-0 md:mr-6 z-30">
                  <Notifications
                    notifications={staticNotifications}
                    toggleNotifications={toggleNotifications}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHeader;
