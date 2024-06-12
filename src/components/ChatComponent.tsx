import React, { useState, useEffect } from "react";
import cogoToast from "cogo-toast";
import axios from "axios";

interface Message {
  text: string;
  sender: string;
  isAI?: boolean;
}

interface Props {
  userMessages: Message[];
}

const ChatComponent: React.FC<Props> = ({ userMessages }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  // console.log(messages);
  const token = sessionStorage.getItem("tokens");
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAIResponses = async () => {
      setLoading(true);
      const newMessages = [...messages];

      for (const userMessage of userMessages) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/openai/generate-chat`,
            {
              message: userMessage.text,
              userId: sessionStorage.getItem("userId"),
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          const aiResponse: Message = {
            text: response.data.chat,
            sender: "AI",
            isAI: true,
          };

          newMessages.push(userMessage, aiResponse);
        } catch (error) {
          cogoToast.error("Please upgrade your plan to genrate chat.");
          console.error("Error fetching AI response:", error);
        }
      }

      setMessages(newMessages);
      setLoading(false);
    };

    fetchAIResponses();
  }, [userMessages]);

  return (
    <div className="flex flex-col w-full bl-black rounded-lg relative">
      <div className="flex-1 overflow-y-auto p-4 last:mb-[42px]">
        {isLoading && (
          <div className="fixed inset-0 bg-black opacity-75 flex items-center justify-center z-50">
            <svg
              version="1.1"
              id="L9"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              enable-background="new 0 0 0 0"
              xmlSpace="preserve"
              style={{ width: "100px", height: "100px" }}
            >
              <path
                fill="#fff"
                d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
              >
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  dur="1s"
                  from="0 50 50"
                  to="360 50 50"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>
        )}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex mb-6 ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="flex items-start w-full ">
              {message.isAI ? (
                <img
                  src="/logo-min.png"
                  alt="AI"
                  className="w-10 h-10 mr-2 mt-1"
                />
              ) : (
                <img
                  src="/dashboard/user.png"
                  alt="Product Logo"
                  className="w-10 h-10 mr-2 mt-1 rounded-full"
                />
              )}
              <div
                className={`rounded-lg w-full p-2 overflow-hidden ${
                  message.sender === "user"
                    ? "bg-[#0f1021] text-white self-end"
                    : "bg-[#0f1021] text-white self-start"
                }`}
              >
                {message.text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatComponent;
