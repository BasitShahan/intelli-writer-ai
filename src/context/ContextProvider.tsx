"use client";

import IntelliAI from "@/utils/IntelliAI";
import blogList from "@/utils/blogList";
import FreeTools from "@/utils/FreeTools";
import { ReactNode, createContext, useEffect, useContext, useRef, useState } from "react";

interface ContextProviderProps {
  children: ReactNode;
}

interface ContextProviderValue {
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
  getResponse: (prompt: string) => void;
  getRespond: (prompt: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  response: any;
  setResponse: React.Dispatch<React.SetStateAction<any>>;
  emptyResponse: () => void;
  error: string | null;
  setCourseContentInfo: (
    subject: string,
    duration: string,
    level: string
  ) => void;
  courseContent: {
    subject: string;
    duration: string;
    level: string | undefined;
  };
  setError: (error: string | null) => void;
  apiSidebartoggle: boolean;
  setApiSidebartoggle: (apiSidebartoggle: boolean) => void;
  aboutRef: React.RefObject<HTMLDivElement> | null;
  pricingRef: React.RefObject<HTMLDivElement> | null;
  blogs:BlogProps[]
}

interface BlogProps {
  id: number;
  title: string;
  description: string;
  publishDate: string;
  image: string;
  slug: string;
  tags: string;
  category: string;
}

const AppContext = createContext<ContextProviderValue | undefined>(undefined);

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<BlogProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [courseContent, setCourseContent] = useState({
    subject: "",
    duration: "",
    level: "",
  });

  const aboutRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const [apiSidebartoggle, setApiSidebartoggle] = useState<boolean>(false);

  const getResponse = async (prompt: string) => {
    const userId =
      typeof window !== "undefined" ? sessionStorage.getItem("userId") : null;
    try {
      setLoading(true);
      const query = { prompt, userId };
      const result = await IntelliAI(query);
      if (result.success) {
        setResponse(result.response);
        setLoading(false);
        setError(null);
      } else {
        setError(result.response);
        setLoading(false);
      }
    } catch (error) {
      setError(`${error}`);
      setLoading(false);
    }
  };

  const getRespond = async (prompt: string) => {
    try {
      setResponse(null);
      clearResponse();
      setLoading(true);
      const result = await FreeTools(prompt);
      if (result.success) {
        setResponse(result.data);
        setError(null);
      } else {
        setError(result.data);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  const clearResponse = () => {
    setResponse(null);
  };
  

  const setCourseContentInfo = (
    subject: string,
    duration: string,
    level: string
  ) => {
    setCourseContent({
      subject,
      duration,
      level,
    });
  };

  const emptyResponse = () => {
    setResponse(null);
  };

  const value: ContextProviderValue = {
    toggle,
    setToggle,
    loading,
    setLoading,
    response,
    setResponse,
    getResponse,
    getRespond,
    emptyResponse,
    error,
    setCourseContentInfo,
    courseContent,
    setError,
    apiSidebartoggle,
    setApiSidebartoggle,
    aboutRef,
    pricingRef,
    blogs,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogsData = await blogList();
        setBlogs(blogsData.blogs);

      } catch (error) {
        console.error("Failed to fetch blog data:", error);
      }
    };

    fetchData();
  }, []); // 

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useWebContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useWebContext must be used within an AppContext");
  }

  return context;
};
