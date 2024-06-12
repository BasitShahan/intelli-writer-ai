const createChat = async (chat: {
  message: string;
}): Promise<{ success: boolean; result: string }> => {
  const tokens =
    typeof window !== "undefined" ? sessionStorage.getItem("tokens") : null;
  const userId =
    typeof window !== "undefined" ? sessionStorage.getItem("userId") : null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/openai/generate-chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens}`,
        },
        body: JSON.stringify(chat),
      }
    );

    if (response.ok) {
      const res = await response.json();
      return { success: true, result: res.message };
    } else {
      const errorData = await response.json();
      return { success: false, result: errorData.message };
    }
  } catch (error) {
    return { success: false, result: `Something went wrong!` };
  }
};

export default createChat;
