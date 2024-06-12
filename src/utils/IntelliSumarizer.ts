const IntelliSummarizer = async (
  prompt: string
): Promise<{ success: boolean; response: string }> => {
  const tokens =
    typeof window !== "undefined" ? sessionStorage.getItem("tokens") : null;
    
  try {
    const response = await fetch(
      `https://apiapiapi.dev/image_generator/summary?url=${prompt}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `${process.env.NEXT_PUBLIC_YOUTUBE_SUMMARIZER_API}`,        
        },
      }
    );

    if (response.ok) {
      const res = await response.json();
      if (res.error === "Subtitles are disabled for this video.") {
        return { success: false, response: res.error };
      } else {
        return { success: true, response: res.text };
      }
    } else {
      const errorData = await response.json();
      return { success: false, response: errorData.error };
    }
  } catch (error) {
    return { success: false, response: `This video is without subtitles!` };
  }
};

export default IntelliSummarizer;
