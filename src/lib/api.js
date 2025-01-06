export const fetchVideos = async () => {
  const response = await fetch(
    "https://mytube-server.vercel.app/api/v1/get-all-videos"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch videos");
  }
  return response.json();
};

export const deleteVideo = async (id) => {
  const response = await fetch(
    `https://mytube-server.vercel.app/video/${id}/toggle-delete`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete video");
  }

  return response.json();
};
