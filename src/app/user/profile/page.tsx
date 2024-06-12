"use client";

import deleteUser from "@/utils/deleteUser";
import updatePassword from "@/utils/updatePassword";
import updateProfile from "@/utils/updateProfile";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BiMessageRoundedDetail, BiSolidLock } from "react-icons/bi";
import { FaEnvelope, FaHome, FaUser, FaUserTie, FaPlus } from "react-icons/fa";
import { GrOrganization } from "react-icons/gr";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import Swal from "sweetalert2";
import { bgImage } from "../../../../public";
import Button from "@/components/Button";

interface ProfilePageLayoutProps {
  children: React.ReactNode;
  fullName?: string;
  email?: string;
  phone: number;
  password?: string;
  newpassword?: string;
  address: string;
  company_name: string;
  company_position: string;
  short_bio: string;
}

const ProfilePage: React.FC<ProfilePageLayoutProps> = () => {
  const router = useRouter();

  const [fullName, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [company_name, setCompany_name] = useState<string>("");
  const [company_position, setComp_pnyPosition] = useState<string>("");
  const [short_bio, setShort_bio] = useState<string>("");

  const [oldPassword, setOldPassword] = useState<string>("");
  const [seeOldPass, setSeeOldPass] = useState<"text" | "password">("password");
  const [newPassword, setNewPassword] = useState<string>("");
  const [seeNewPass, setSeeNewPass] = useState<"text" | "password">("password");
  const [error, setError] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [oldPasswordError, setOldPasswordError] = useState<string>("");
const [newPasswordError, setNewPasswordError] = useState<string>("");


  //Profile Image
  const [image, setImage] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function to handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setImage(imageUrl); // Update image state with the data URL
        localStorage.setItem("profileImage", imageUrl); // Store the image URL in localStorage
      };
      reader.readAsDataURL(file); // Read the selected file as a data URL
    }
    toggleDropDownOff();
  };

  // Function to toggle dropdown menu on
  const toggleDropDownOn = () => {
    setShowDropdown(true);
  };

  // Function to toggle dropdown menu off
  const toggleDropDownOff = () => {
    setShowDropdown(false);
  };

  // Function to remove profile image
  const removeProfileImage = () => {
    if (image) {
      localStorage.removeItem("profileImage");
      setImage(null); // Reset the image state
      toggleDropDownOff(); // Close the dropdown after updating image state
    }
  };

  const calculatePasswordStrength = (password: string) => {
    // Regular expressions to check for required criteria
    const capitalLetterRegex = /[A-Z]/;
    const smallLetterRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialSymbolRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

    // Check if the password meets each requirement
    const hasCapitalLetter = capitalLetterRegex.test(password);
    const hasSmallLetter = smallLetterRegex.test(password);
    const hasNumber = numberRegex.test(password);
    const hasSpecialSymbol = specialSymbolRegex.test(password);
    const hasValidLength = password.length >= 8;

    // Calculate the password strength
    let strength = 0;
    if (hasCapitalLetter) strength += 0.2;
    if (hasSmallLetter) strength += 0.2;
    if (hasNumber) strength += 0.2;
    if (hasSpecialSymbol) strength += 0.2;
    if (hasValidLength) strength += 0.2;
    setPasswordStrength(strength);
    setError(strength < 1 ? "Password format is not correct!" : "");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        toggleDropDownOff();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const sessionTokens =
      typeof window !== "undefined" ? sessionStorage.getItem("tokens") : null;
    const userId =
      typeof window !== "undefined" ? sessionStorage.getItem("userId") : null;
    const profileImage = localStorage.getItem("profileImage");
    setImage(profileImage as string);

    if (!sessionTokens || !userId) {
      router.push("/auth/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${sessionTokens}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();

        // Now set the state variables
        setName(data.fullName || "");
        setEmail(data.email || "");
        setPhone(data.phonenumber || "");
        setAddress(data.address || "");
        setCompany_name(data.company_name || "");
        setComp_pnyPosition(data.company_position || "");
        setShort_bio(data.short_bio || "");
      } catch (error) {
        console.error("Error fetching user data:", (error as Error).message);
      }
    };

    fetchUserData();
  }, [router]);

  const deleteAccount = async () => {
    try {
      const response = await deleteUser();

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.message,
        });

        router.push("/auth/login");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage = (error as Error).message;

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage || "Failed to update password",
      });
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userdata = {
      fullName,
      phonenumber: phone,
      address,
      company_name,
      company_position,
      short_bio,
    };

    const sessionTokens = sessionStorage.getItem("tokens");
    const userId = sessionStorage.getItem("userId");

    if (!sessionTokens || !userId) {
      router.push("/auth/login");
      return;
    }

    try {
      const response = await updateProfile(userdata);

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.message,
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage = (error as Error).message;

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage || "Failed to update user",
      });
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const passwordData = {
      oldPassword,
      newPassword,
    };

    // Check if old password and new password are empty
    if (!oldPassword) {
      setOldPasswordError("Current Password is required");
      setNewPasswordError("");
      return;
    }

    if (!newPassword) {
      setNewPasswordError("New Password is required");
      setOldPasswordError("");
      return;
    } 
    if (oldPassword === newPassword) {
      setNewPasswordError("Enter new password");
      setOldPasswordError("");
      return;
    }

    // Reset error if both fields are filled
    setOldPasswordError("");
    setNewPasswordError("");

    if (passwordStrength < 0.9) {
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      });
      return;
    }

    const sessionTokens = sessionStorage.getItem("tokens");
    const userId = sessionStorage.getItem("userId");

    if (!sessionTokens || !userId) {
      router.push("/auth/login");
      return;
    }

    try {
      const response = await updatePassword(passwordData);

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.message,
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage = (error as Error).message;

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage || "Failed to update password",
      });
    }
  };

  return (
    <div className="absolute top-14 right-0 md:px-20 md:py-5 p-6 w-full lg:w-[calc(100%-250px)] text-white">
      <h2 className="text-2xl lg:text-start text-center font-semibold pb-5">
        Profile
      </h2>

      <div className="rounded-[12px] py-6 bg-[rgba(32,45,72,0.41)] p-6 ">
        {/* Profile */}
        <>
          {/* IMAGE */}
          <div className="w-full h-full items-center flex justify-center rounded-xl relative">
            <div
              className="md:w-[150px] md:h-[150px] w-[120px] h-[120px] overflow-hidden rounded-full transition-opacity flex items-center justify-center cursor-pointer"
              onClick={toggleDropDownOn}
              ref={dropdownRef}
            >
              <img
                src={image || bgImage}
                alt="user"
                className="z-0 w-full h-full object-cover"
              />

              <FaPlus
                className={`text-white text-4xl z-10 absolute font-bold ${
                  image ? "hidden" : "group-hover:block"
                }`}
              />
              {showDropdown && (
                <div className="absolute top-[50%] right-[50%] mt-2 w-36 bg-primary-two rounded-md shadow-lg z-50">
                  <button className="relative block w-full px-4 py-2 text-sm text-white text-opacity-80 hover:text-opacity-100">
                    Upload Image
                    <input
                      type="file"
                      name="image"
                      className="absolute top-0 w-full h-full inset-0 opacity-0 cursor-pointer"
                      onChange={handleImageChange}
                    />
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-sm text-white text-opacity-80 hover:text-opacity-100"
                    onClick={removeProfileImage}
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* General input form */}
          <div className="md:p-5 ">
            <form onSubmit={handleProfileUpdate}>
              <div className="py-5 text-xl font-medium">General</div>
              <div className="border-t py-5">
                <div className="w-full flex flex-col lg:flex-row justify-between lg:gap-16 ">
                  <label className="relative w-full">
                    <div className="flex flex-row items-center gap-2 absolute left-3 top-1/2 ">
                      <FaUser size={16} />
                    </div>
                    Full Name <span className="text-pink-500">*</span> <br />
                    <input
                      autoComplete="off"
                      name="fullName"
                      placeholder="Full Name"
                      type="text"
                      className="w-full py-3 rounded-[12px] bg-[rgba(32,45,72,0.41)] outline-none  focus:outline-[#640F6C] lg:!pl-[48px] mt-2 mb-4 text-white pl-10"
                      value={fullName}
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>

                  <label className="relative w-full">
                    <div className="flex flex-row items-center gap-2 absolute left-3 top-1/2 ">
                      <FaEnvelope size={16} />
                    </div>
                    Email <span className="text-pink-500">*</span> <br />
                    <input
                      autoComplete="off"
                      readOnly
                      name="email"
                      placeholder="Email"
                      type="email"
                      className="w-full py-3 rounded-[12px] bg-[rgba(32,45,72,0.41)] outline-none  focus:outline-[#640F6C] lg:!pl-[48px] mt-2 mb-4 text-white pl-10"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div className=" flex flex-col lg:flex-row justify-between lg:gap-16">
                <label className="relative w-full">
                  <div className="flex flex-row items-center gap-2 absolute left-3 top-1/2  ">
                    <MdOutlinePhoneAndroid size={18} />
                  </div>
                  Phone Number <span className="text-pink-500">*</span> <br />
                  <input
                    autoComplete="off"
                    name="phone"
                    placeholder="Phone Number"
                    type="tel"
                    className="w-full py-3 rounded-[12px] bg-[rgba(32,45,72,0.41)] outline-none  focus:outline-[#640F6C] lg:!pl-[48px] mt-2 mb-4 text-white pl-10"
                    value={phone}
                    required
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </label>

                <label className="relative w-full">
                  <div className="flex flex-row items-center gap-2 absolute left-3 top-1/2  ">
                    <FaHome size={16} />
                  </div>
                  Address <span className="text-pink-500">*</span> <br />
                  <input
                    autoComplete="off"
                    name="address"
                    placeholder="Enter your Address"
                    type="text"
                    className="w-full py-3 rounded-[12px] bg-[rgba(32,45,72,0.41)] outline-none  focus:outline-[#640F6C] lg:!pl-[48px] mt-2 mb-4 text-white pl-10"
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </label>
              </div>

              <div className="py-5 text-xl font-medium">Work</div>

              <div className="py-5 border-t">
                <div className="flex flex-col lg:flex-row justify-between lg:gap-16">
                  <label className="relative w-full">
                    <div className="flex flex-row items-center gap-2 absolute left-3 top-1/2  ">
                      <GrOrganization size={14} />
                    </div>
                    Company Name <br />
                    <input
                      autoComplete="off"
                      name="company_name"
                      placeholder="Company Name"
                      type="text"
                      className="w-full py-3 rounded-[12px] bg-[rgba(32,45,72,0.41)] outline-none  focus:outline-[#640F6C] lg:!pl-[48px] mt-2 mb-4 text-white pl-10"
                      value={company_name}
                      onChange={(e) => setCompany_name(e.target.value)}
                    />
                  </label>

                  <label className="relative w-full">
                    <div className="flex flex-row items-center gap-2 absolute left-3 top-1/2 ">
                      <FaUserTie size={16} />
                    </div>
                    Company Position <br />
                    <input
                      autoComplete="off"
                      name="company_position"
                      placeholder="Type your job title"
                      type="text"
                      className="w-full py-3 rounded-[12px] bg-[rgba(32,45,72,0.41)] outline-none  focus:outline-[#640F6C] lg:!pl-[48px] mt-2 mb-4 text-white pl-10"
                      value={company_position}
                      onChange={(e) => setComp_pnyPosition(e.target.value)}
                    />
                  </label>
                </div>

                <label className="relative w-full">
                  <div className="flex flex-row items-center gap-2 absolute left-3 top-[26%] ">
                    <BiMessageRoundedDetail size={22} />
                  </div>
                  Short Bio <br />
                  <textarea
                    autoComplete="off"
                    name="short_bio"
                    placeholder="Tell about your background, capabilities and work"
                    rows={4}
                    cols={30}
                    className="w-full py-3 rounded-[12px] bg-[rgba(32,45,72,0.41)] outline-none  focus:outline-[#640F6C] lg:!pl-[48px] mt-2 mb-4 text-white pl-10"
                    value={short_bio}
                    onChange={(e) => setShort_bio(e.target.value)}
                  />
                </label>
              </div>

              <div className="flex justify-end">
                <Button
                  title="Update Profile"
                  btnType="submit"
                  className="!w-fit !rounded"
                />
              </div>
            </form>
          </div>
        </>

        {/* New password */}
        <div className="md:p-5">
          <div className="py-5 text-lg lg:text-xl font-medium">
            Change Password
          </div>

          <div className="py-5 border-t">
            <form onSubmit={handlePasswordUpdate}>
              <div className="flex flex-col lg:flex-row justify-between lg:gap-16">
                <label className="relative w-full">
                  <div className="flex flex-row items-center gap-2 absolute left-3 top-1/2 ">
                    <BiSolidLock size={18} />
                  </div>
                  Current Password <span className="text-pink-500">*</span>{" "}
                  <br />
                  <div className="flex items-center">
                    <input
                      name="currectPassword"
                      placeholder="Current Password"
                      type={seeOldPass}
                      className="w-full py-3 rounded-[12px] bg-[rgba(32,45,72,0.41)] outline-none  focus:outline-[#640F6C] lg:!pl-[48px] mt-2 mb-4 text-white pl-10"
                      value={oldPassword}
                      onChange={(e) => {
                        setOldPassword(e.target.value);
                      }}
                    />
                    {/* Toggle password visibility */}
                    <div className="absolute right-[10px] cursor-pointer">
                      {seeOldPass === "text" ? (
                        <AiFillEye
                          size={24}
                          onClick={() => setSeeOldPass("password")}
                        />
                      ) : (
                        <AiFillEyeInvisible
                          size={24}
                          onClick={() => setSeeOldPass("text")}
                        />
                      )}
                    </div>
                  </div>
                  {oldPasswordError && (
                      <p className="!text-red-500 text-sm px-2">{oldPasswordError}</p>
                    )}
                </label>

                <label className="relative w-full">
                  <div className="flex flex-row items-center gap-2 absolute left-3 top-1/2 ">
                    <BiSolidLock size={18} />
                  </div>
                  New Password <span className="text-pink-500">*</span> <br />
                  <div className="flex items-center">
                    <input
                      name="confirmPassword"
                      placeholder="New Password"
                      type={seeNewPass}
                      className="w-full py-3 rounded-[12px] bg-[rgba(32,45,72,0.41)] outline-none  focus:outline-[#640F6C] lg:!pl-[48px] mt-2 mb-4 text-white pl-10"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        calculatePasswordStrength(e.target.value);
                      }}
                    />
                    {/* Toggle confirm password visibility */}
                    <div className="absolute right-[10px] cursor-pointer">
                      {seeNewPass === "text" ? (
                        <AiFillEye
                          size={24}
                          onClick={() => setSeeNewPass("password")}
                        />
                      ) : (
                        <AiFillEyeInvisible
                          size={24}
                          onClick={() => setSeeNewPass("text")}
                        />
                      )}
                    </div>
                  </div>
                  {newPassword !== "" && (
                    <div className="flex items-center gap-2 -mt-3">
                      <div className="">
                        <span
                          className={`${
                            passwordStrength < 0.6
                              ? "text-red-600"
                              : passwordStrength < 1
                              ? "text-yellow-600"
                              : "text-green-700"
                          } text-sm`}
                        >
                          {passwordStrength < 0.6
                            ? "Weak"
                            : passwordStrength < 1
                            ? "Good"
                            : " Stong"}
                        </span>
                      </div>
                      <div
                        className={`h-1 rounded-full ${
                          passwordStrength < 0.6
                            ? "bg-red-600"
                            : passwordStrength < 1
                            ? "bg-yellow-600"
                            : "bg-green-700"
                        }`}
                        style={{ width: `${passwordStrength * 100}%` }}
                      ></div>
                    </div>
                  )}
                  {newPasswordError && (
                    <p className="!text-red-500 text-sm px-2">{newPasswordError}</p>
                  )}
                </label>
              </div>

              <div className="flex flex-col md:flex-row-reverse gap-4 justify-between mt-8">
                <Button
                  title="Change Password"
                  btnType="submit"
                  className="!w-fit !rounded"
                />

                <button
                  className="text-white px-6 py-2 rounded hover:opacity-80 bg-red-800"
                  onClick={deleteAccount}
                >
                  Delete Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
