"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BiSolidLock } from "react-icons/bi";
import { FaEnvelope, FaHome, FaUser, FaUserTie, FaGlobeAsia  } from "react-icons/fa";
import { GrOrganization } from "react-icons/gr";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import Swal from "sweetalert2";
import Button from "@/components/Button";
import updateAffiliateProfile from "@/utils/updateAffiliateProfile";
import updatePasswordAffiliate from "@/utils/updatePasswordAffiliate";
import deleteAffiliate from "@/utils/deleteAffiliate";

interface ProfilePageLayoutProps {
  children: React.ReactNode;
  name?: string;
  email?: string;
  phone_number: number;
  password?: string;
  newpassword?: string;
  address: string;
  company_name: string;
  website: string;
  af_code: string;
  profile_picture: string;

}

const ProfilePage: React.FC<ProfilePageLayoutProps> = () => {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone_number, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [company_name, setCompany_name] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [profile_picture, setprofile_picture] = useState<string>("");
  const [af_code, setAf_Code] = useState<string>("");

  const [oldPassword, setOldPassword] = useState<string>("");
  const [seeOldPass, setSeeOldPass] = useState<"text" | "password">("password");
  const [newPassword, setNewPassword] = useState<string>("");
  const [seeNewPass, setSeeNewPass] = useState<"text" | "password">("password");
  const [error, setError] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [oldPasswordError, setOldPasswordError] = useState<string>("");
  const [newPasswordError, setNewPasswordError] = useState<string>("");


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
    const sessionTokens =
      typeof window !== "undefined" ? sessionStorage.getItem("tokens") : null;
    const userId =
      typeof window !== "undefined" ? sessionStorage.getItem("userId") : null;

    if (!sessionTokens || !userId) {
      router.push("/auth/login-affiliate");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/affiliate/${userId}`,
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
        setName(data.name || "");
        setEmail(data.email || "");
        setPhone(data.phone_number || "");
        setAddress(data.address || "");
        setCompany_name(data.company_name || "");
        setWebsite(data.website || "");
        setCountry(data.country || "");
        setprofile_picture(data.profile_picture || "");
        setAf_Code(data.af_code || "");
      } catch (error) {
        console.error("Error fetching user data:", (error as Error).message);
      }
    };

    fetchUserData();
  }, [router]);

  const deleteAccount = async () => {
    try {
      const response = await deleteAffiliate();
  
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.message,
        });
  
        router.push("/auth/register-affiliate");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
  
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage || "Failed to delete account",
      });
    }
  };
  

 
  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const sessionTokens =
      typeof window !== "undefined" ? sessionStorage.getItem("tokens") : null;
    const userId =
      typeof window !== "undefined" ? sessionStorage.getItem("userId") : null;

    if (!sessionTokens || !userId) {
      router.push("/auth/login-affiliate");
      return;
    }

    const userdata = {
      userId,
      updatedUserData: "profile update",
      name,
      phone_number,
      address,
      company_name,
      website,
      country,
      profile_picture,
      af_code,
    };
    
    try {
      const response = await updateAffiliateProfile(userdata);

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
      router.push("/auth/login-affiliate");
      return;
    }

    try {
      const response = await updatePasswordAffiliate(passwordData);

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
    <div className="md:px-20 md:py-5 p-6 w-full mx-auto lg:w-[80%] text-white">
      <h2 className="text-2xl lg:text-start text-center font-semibold pb-5">
        Profile
      </h2>

      <div className="rounded-[12px] py-6 bg-[rgba(32,45,72,0.41)] p-6 ">
        {/* Profile */}
        <>
          {/* General input form */}
          <div className="md:p-5 ">
            <form onSubmit={handleProfileUpdate}>
              <div className="py-5 text-xl font-medium">General</div>
              <div className="border-t py-5">
                <div className="w-full flex flex-col lg:flex-row justify-between lg:gap-16">
                  <label className="relative w-full">
                    <div className="flex flex-row items-center gap-2 absolute left-3 top-1/2">
                      <FaUser size={16} />
                    </div>
                    Full Name <span className="text-pink-500">*</span> <br />
                    <input
                      autoComplete="off"
                      name="name"
                      placeholder="Full Name"
                      type="text"
                      className="w-full py-3 rounded-[12px] bg-[rgba(32,45,72,0.41)] outline-none focus:outline-[#640F6C] lg:!pl-[48px] mt-2 mb-4 text-white pl-10"
                      value={name}
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>

                  <label className="relative w-full">
                    <div className="flex flex-row items-center gap-2 absolute left-3 top-1/2">
                      <FaEnvelope size={16} />
                    </div>
                    Email <span className="text-pink-500">*</span> <br />
                    <input
                      autoComplete="off"
                      readOnly
                      name="email"
                      placeholder="Email"
                      type="email"
                      className="w-full py-3 rounded-[12px] bg-[rgba(32,45,72,0.41)] outline-none focus:outline-[#640F6C] lg:!pl-[48px] mt-2 mb-4 text-white pl-10"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <label className="relative w-full">
                  <div className="flex flex-row items-center gap-2 absolute left-3 top-1/2">
                    <MdOutlinePhoneAndroid size={18} />
                  </div>
                  Phone Number <span className="text-pink-500">*</span> <br />
                  <input
                    autoComplete="off"
                    name="phone_number"
                    placeholder="Phone Number"
                    type="tel"
                    className="w-full py-3 rounded-[12px] bg-[rgba(32,45,72,0.41)] outline-none focus:outline-[#640F6C] lg:!pl-[48px] mt-2 mb-4 text-white pl-10"
                    value={phone_number}
                    required
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </label>

                <label className="relative w-full">
                  <div className="flex flex-row items-center gap-2 absolute left-3 top-1/2">
                    <FaHome size={16} />
                  </div>
                  Address <span className="text-pink-500">*</span> <br />
                  <input
                    autoComplete="off"
                    name="address"
                    placeholder="Enter your Address"
                    type="text"
                    className="w-full py-3 rounded-[12px] bg-[rgba(32,45,72,0.41)] outline-none focus:outline-[#640F6C] lg:!pl-[48px] mt-2 mb-4 text-white pl-10"
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </label>

                <label className="relative w-full">
                  <div className="flex flex-row items-center gap-2 absolute left-3 top-1/2">
                    <FaGlobeAsia  size={16} className="text-white" />
                  </div>
                  Country <span className="text-pink-500">*</span> <br />
                  <input
                    autoComplete="off"
                    name="country"
                    placeholder="Enter your Country"
                    type="text"
                    className="w-full py-3 rounded-[12px] bg-[rgba(32,45,72,0.41)] outline-none focus:outline-[#640F6C] lg:!pl-[48px] mt-2 mb-4 text-white pl-10"
                    value={country}
                    required
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </label>
              </div>

              <div className="py-5">
                <div className="flex flex-col justify-between">
                  <label className="relative w-full">
                    <div className="flex flex-row items-center gap-2 absolute left-3 top-1/2">
                      <GrOrganization size={14} />
                    </div>
                    Company Name <br />
                    <input
                      autoComplete="off"
                      name="company_name"
                      placeholder="Company Name"
                      type="text"
                      className="w-full py-3 rounded-[12px] bg-[rgba(32,45,72,0.41)] outline-none focus:outline-[#640F6C] lg:!pl-[48px] mt-2 mb-4 text-white pl-10"
                      value={company_name}
                      onChange={(e) => setCompany_name(e.target.value)}
                    />
                  </label>

                  <label className="relative w-full">
                    <div className="flex flex-row items-center gap-2 absolute left-3 top-1/2">
                      <FaUserTie size={16} />
                    </div>
                    Website <br />
                    <input
                      autoComplete="off"
                      name="website"
                      placeholder="Type your website URL"
                      type="text"
                      className="w-full py-3 rounded-[12px] bg-[rgba(32,45,72,0.41)] outline-none focus:outline-[#640F6C] lg:!pl-[48px] mt-2 mb-4 text-white pl-10"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </label>
                </div>
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
    className="!w-full md:!w-fit !rounded" 
  />

  <button
    className="text-white px-6 py-2 rounded hover:opacity-80 bg-red-800 w-full md:!w-fit" 
    onClick={deleteAccount}
  >
    Delete Account
  </button>
</div>

            </form>
          </div>
        </div>
        </>
      </div>
    </div>
  );
};

export default ProfilePage;
