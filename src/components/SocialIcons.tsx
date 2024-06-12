import React from "react";
import { SocialIcon } from "react-social-icons";

interface SocialIconsProps {
  socialLinks: string[];
  iconColor?: string;
  bgColor?: string;
}

const SocialIcons: React.FC<SocialIconsProps> = ({
  socialLinks,
}) => {
  return (
    <ul className="flex gap-3 p-2 w-[200px] justify-between">
      {socialLinks.map((link, index) => (
        <li key={index}>
          <SocialIcon
            url={link}
            className="w-5 h-5  rounded-md cursor-pointer opacity-60 hover:opacity-100 border border-slate-700"
            target="_blank"
            bgColor="black"
          />
        </li>
      ))}
    </ul>
  );
};

export default SocialIcons;
