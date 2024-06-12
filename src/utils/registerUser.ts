const registerUser = async (userData: {
  fullName: string;
  email: string;
  password: string;
  referral: string;
}): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (response.status === 201) {
      const data = await response.json();
      if (data && data.id) {
        const planResponse = await createPlanForUser(data.id);
        if (planResponse.success) {
          return { success: true, message: data.message };
        } else {
          return { success: false, message: planResponse.message };
        }
      } else {
        return {
          success: false,
          message: "User ID not found in the response.",
        };
      }
    } else {
      const errorData = await response.json();
      return { success: false, message: errorData.error };
    }
  } catch (error) {
    return { success: false, message: `Timeout error: ${error}` };
  }
};

// Function to create a plan for the user
async function createPlanForUser(
  userId: string
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/current-plan/create-plan/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_count: 10,
          words_left: 2000,
          image_count: 0,
          plan_name: "Basic Plan",
          voice_count: "Unlimited",
        }),
      }
    );

    if (response.status === 201) {
      const data = await response.json();
      return { success: true, message: "Plan created successfully." };
    } else {
      const errorData = await response.json();
      return { success: false, message: errorData.message };
    }
  } catch (error) {
    return { success: false, message: `Timeout error: ${error}` };
  }
}

export default registerUser;
