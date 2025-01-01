export const fetchVideos = async () => {
  const response = await fetch(
    "https://mytube-server.vercel.app/api/v1/get-all-videos"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch videos");
  }
  return response.json();
};
