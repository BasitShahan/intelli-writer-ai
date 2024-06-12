import axios from "axios";

const generateImages = async (query: {
  prompt: string;
  userId: string | null;
  aspectRatio: string;
}): Promise<{ success: boolean; response: string }> => {
  const token =
    typeof window !== "undefined" ? sessionStorage.getItem("tokens") : null;

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/openai/generate-images`,
      {
        prompt: query.prompt,
        userId: query.userId,
        aspect_ratio: query.aspectRatio,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return { success: true, response: response.data };
    } else {
      const errorData = response.data;
      return { success: false, response: errorData.error };
    }
  } catch (error) {
    console.error(error);
    return { success: false, response: `Something went wrong!` };
  }
};

export default generateImages;
