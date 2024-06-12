const loginUser = async (userData: {
  email: string;
  password: string;
}): Promise<{
  success: boolean;
  message: string;
  error: string;
  token: string;
  name: string;
  userId: string;
  email: string;
}> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (response.ok) {
      const data = await response.json();

      return {
        success: true,
        message: data.message,
        token: data.token,
        name: data.user.fullName,
        userId: data.user.id,
        error: "",
        email: data.user.email,
      };
    } else {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message,
        token: "",
        name: "",
        userId: "",
        email: "",
        error: errorData.error,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Timeout error`,
      token: "",
      name: "",
      userId: "",
      email: "",
      error: `${error}`,
    };
  }
};

export default loginUser;
