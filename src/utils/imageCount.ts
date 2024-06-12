const updateImageCount = async (): Promise<{
  success: boolean;
  message: string;
  images_left: number | null;
}> => {
  const tokens =
    typeof window !== "undefined" ? sessionStorage.getItem("tokens") : null;

  // Get userId from sessionStorage
  const userId =
    typeof window !== "undefined" ? sessionStorage.getItem("userId") : null;

  const imageDecrement = {
    imageCount: 1,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/update-image-count`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens}`,
        },
        body: JSON.stringify(imageDecrement),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return { success: true, message: "", images_left: data.images_left };
    } else {
      // Handle error response
      const errorData = await response.json();
      return { success: false, message: errorData.message, images_left: null };
    }
  } catch (error) {
    // Handle network or other errors
    return {
      success: false,
      message: `Something went wrong!`,
      images_left: null,
    };
  }
};

const imageCount = async (): Promise<{
  success: boolean;
  message: string;
  imageCount: number | null;
}> => {
  const tokens =
    typeof window !== "undefined" ? sessionStorage.getItem("tokens") : null;

  // Get userId from sessionStorage
  const userId =
    typeof window !== "undefined" ? sessionStorage.getItem("userId") : null;

  try {
    // Make a GET request to the "get-words-left" API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/current-plan/get-plan/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return { success: true, message: "", imageCount: data.imageCount };
    } else {
      // Handle error response
      const errorData = await response.json();
      return { success: false, message: errorData.message, imageCount: null };
    }
  } catch (error) {
    // Handle network or other errors
    return {
      success: false,
      message: `Something went wrong!`,
      imageCount: null,
    };
  }
};

export { updateImageCount, imageCount };
