const IntelliSpeechText = async (query: {
  file: File | Blob | null;
}): Promise<{
  success: boolean;
  message: string;
  transcription: string;
}> => {
  try {
    const tokens = typeof window !== "undefined" ? sessionStorage.getItem("tokens") : null;
    const userId = typeof window !== "undefined" ? sessionStorage.getItem("userId") : null;

    const formData = new FormData();
    query.file && formData.append("file", query.file); // Append file to FormData if available
    userId && formData.append("userId", userId); // Append userId to FormData if available

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/openai/generate-speech`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokens}`,
        },
        body: formData, // Use FormData as body
      }
    );

    if (response.ok) {
      const result = await response.json();
      return {
        success: true,
        message: "File generated successfully",
        transcription: result.transcription,
      };
    } else {
      const errorData = await response.json();
      return { success: false, message: errorData.error || "Unknown error", transcription: "" };
    }
  } catch (error) {
    return {
      success: false,
      message: `Something went wrong: ${error}`,
      transcription: "",
    };
  }
};

export default IntelliSpeechText;
