"use client";

import VideoCard from "@/components/Ui/VideoCard";
import { fetchDeletedVideos } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";

const Deleted = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [playingVideo, setPlayingVideo] = useState(null); // Tracks the currently playing video

  // Fetching videos with react-query
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["videos"],
    queryFn: fetchDeletedVideos,
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Cache is retained for 10 minutes
    refetchOnWindowFocus: false, // Prevent refetch on window focus
    refetchOnMount: "always", // Always refetch when the component is mounted
    refetchOnReconnect: true, // Refetch when the connection is restored
  });

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    setPlayingVideo(null); // Reset playing video when changing category
  }, []);

  const categories = [
    "All",
    "Tech News",
    "JavaScript",
    "React",
    "Next.js",
    "Python",
    "React Native",
    "English",
    "Projects",
    "Shopify",
    "Interview",
    "DSA",
    "Out Knowledge",
    "Field Related",
    "Gem",
  ];

  // Extract video ID from URL
  const extractVideoId = useCallback((url) => {
    try {
      if (url.includes("youtube.com")) {
        const urlParams = new URL(url).searchParams;
        return urlParams.get("v");
      } else if (url.includes("youtu.be")) {
        return url.split("youtu.be/")[1].split("?")[0];
      } else if (url.includes("youtube.com/live")) {
        return new URL(url).pathname.split("/").pop();
      }
    } catch (err) {
      console.error("Error parsing video URL:", err);
      return null;
    }
  }, []);

  // Sort videos by `updatedAt` (latest first)
  const sortedVideos = useMemo(() => {
    if (!data?.data) return [];
    return [...data.data].sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
  }, [data]);

  // Filter videos based on the selected category
  const filteredVideos = useMemo(() => {
    return sortedVideos.filter(
      (video) =>
        selectedCategory === "All" || video.category === selectedCategory
    );
  }, [sortedVideos, selectedCategory]);

  if (error) return <div>Error: {error.message}</div>;

  const VideoCardProps = {
    isLoading,
    data,
    filteredVideos,
    playingVideo,
    setPlayingVideo,
    extractVideoId,
    refetch,
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Category buttons */}
      <div className="flex space-x-4 p-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedCategory === category
                ? "bg-gray-200 text-black"
                : "bg-gray-800 bg-opacity-90 text-gray-300 font-semibold hover:bg-gray-600"
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Video grid card */}
      <VideoCard props={VideoCardProps} />
    </div>
  );
};

export default Deleted;
