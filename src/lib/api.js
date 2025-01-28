const baseURL = "https://mytube-server.vercel.app/api/v1";

// Centralized API request handler
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${baseURL}${endpoint}`, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "API request failed");
    }
    return await response.json();
  } catch (error) {
    console.error(`Error in API request to ${endpoint}:`, error);
    throw error;
  }
};

// Fetch all videos
export const fetchVideos = () => apiRequest("/get-all-videos");

// Fetch all deleted videos
export const fetchDeletedVideos = () => apiRequest("/videos/deleted");

// Toggle delete video
export const deleteVideo = (id) =>
  apiRequest(`/video/${id}/toggle-delete`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });

// Create a new video
export const addVideo = (newVideo) =>
  apiRequest("/create-video", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newVideo),
  });

// Update an existing video
export const updateVideoData = (videoId, updatedData) =>
  apiRequest(`/update-video/${videoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
