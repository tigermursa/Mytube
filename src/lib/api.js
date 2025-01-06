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
