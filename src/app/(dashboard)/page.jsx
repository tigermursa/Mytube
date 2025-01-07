"use client";

import React, { useState, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchVideos } from "@/lib/api";
import VideoCard from "@/components/Ui/VideoCard";

const MyTube = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [playingVideo, setPlayingVideo] = useState(null);

  const categories = useMemo(
    () => [
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
    ],
    []
  );

  // Fetching videos with react-query
  const { data, error, isLoading } = useQuery({
    queryKey: ["videos"],
    queryFn: fetchVideos,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: "always",
    refetchOnReconnect: true,
  });

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    setPlayingVideo(null);
  }, []);

  const extractVideoId = useCallback((url) => {
    try {
      const youtubeUrlPatterns = [
        "youtube.com",
        "youtu.be",
        "youtube.com/live",
      ];
      if (!youtubeUrlPatterns.some((pattern) => url.includes(pattern)))
        return null;

      if (url.includes("youtube.com")) {
        return new URL(url).searchParams.get("v");
      } else if (url.includes("youtu.be")) {
        return url.split("youtu.be/")[1]?.split("?")[0];
      } else if (url.includes("youtube.com/live")) {
        return new URL(url).pathname.split("/").pop();
      }
    } catch (err) {
      console.error("Error parsing video URL:", err);
      return null;
    }
  }, []);

  const sortedVideos = useMemo(() => {
    if (!data?.data) return [];
    return [...data.data].sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
  }, [data]);

  const filteredVideos = useMemo(() => {
    if (!sortedVideos.length) return [];
    return selectedCategory === "All"
      ? sortedVideos
      : sortedVideos.filter((video) => video.category === selectedCategory);
  }, [sortedVideos, selectedCategory]);

  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Video Grid */}
      <VideoCard
        isLoading={isLoading}
        data={data}
        filteredVideos={filteredVideos}
        playingVideo={playingVideo}
        setPlayingVideo={setPlayingVideo}
        extractVideoId={extractVideoId}
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
      />
    </div>
  );
};

export default MyTube;
