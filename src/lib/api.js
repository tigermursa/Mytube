export const fetchVideos = async () => {
  const response = await fetch(
    "https://mytube-server.vercel.app/api/v1/get-all-videos"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch videos");
  }
  return response.json();
};

export const fetchDeletedVideos = async () => {
  const response = await fetch(
    "https://mytube-server.vercel.app/api/v1/videos/deleted"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch videos");
  }
  return response.json();
};

export const deleteVideo = async (id) => {
  try {
    const response = await fetch(
      `https://mytube-server.vercel.app/api/v1/video/${id}/toggle-delete`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      // Throw an error if the response is not OK
      throw new Error("Failed to delete video");
    }

    // Return the JSON response if successful
    return await response.json();
  } catch (error) {
    // Log the error for debugging
    console.error("Error in deleteVideo:", error);
    throw error; // Re-throw the error for the calling function to handle
  }
};

export const addVideo = async (newVideo) => {
  const response = await fetch(
    "https://mytube-server.vercel.app/api/v1/create-video",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVideo),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add video");
  }

  return response.json();
};
