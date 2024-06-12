const createBlog = async (formData: {
    title: string;
    description: string;
    publishDate: string;
    image: File | null;
    slug: string;
    tags: string;
    category: string;
}): Promise<{
    success: boolean;
    message: string;
}> => {
    const adminToken =
        typeof window !== "undefined" ? sessionStorage.getItem("admintokens") : null;

    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/blog/blog-post`;
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('title', formData.title);
        formDataToSubmit.append('description', formData.description);
        formDataToSubmit.append('publishDate', formData.publishDate);
        formDataToSubmit.append('image', formData.image as File);
        formDataToSubmit.append('slug', formData.slug);
        formDataToSubmit.append('tags', formData.tags);
        formDataToSubmit.append('category', formData.category);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                // Remove Content-Type header
                Authorization: `Bearer ${adminToken}`
            },
            body: formDataToSubmit // No need to stringify the FormData
        });

        if (response.ok) {
            const data = await response.json();

            return {
                success: true,
                message: data.message,
            };
        } else {
            let errorMessage = "Failed to create blog";
            if (response.status === 401) {
                errorMessage = "Unauthorized. Please login again.";
            } else if (response.status >= 500) {
                errorMessage = "Server error. Please try again later.";
            }

            const errorData = await response.json();
            return {
                success: false,
                message: errorData.message || errorMessage,
            };
        }
    } catch (error) {
        let errorMessage = "Something went wrong!";
        if (error instanceof TypeError && error.message === "Failed to create post") {
            errorMessage = "Network error. Please check your connection.";
        }
        return {
            success: false,
            message: `${errorMessage} Error: ${error}`,
        };
    }
};

export default createBlog;
