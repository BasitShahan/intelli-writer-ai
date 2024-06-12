const AdminLogin = async (adminData: {
    email: string;
    password: string;
  }): Promise<{
    success: boolean;
    message: string;
    token: string;
    email: string;
    adminId: string;
  }> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/intelli-admin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(adminData),
        }
      );
  
      if (response.ok) {
        const data = await response.json();
  
        return {
          success: true,
          message: data.message,
          token: data.token,
          email: data.email,
          adminId: data.id,
        };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.message,
          token: "",
          email: "",
          adminId: "",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `Timeout error: ${error}`,
        token: "",
        email: "",
        adminId: "",
      };
    }
  };
  
  export default AdminLogin;
  