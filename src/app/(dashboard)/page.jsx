"use client";

import React, { useState, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchVideos } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";

// Skeleton for loading state
const SkeletonCard = () => (
  <div className="bg-gray-900 rounded overflow-hidden shadow animate-pulse">
    <div className="w-full h-48 bg-gray-800"></div>
    <div className="p-2">
      <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-700 rounded w-1/2"></div>
    </div>
  </div>
);

const MyTube = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [playingVideo, setPlayingVideo] = useState(null); // Tracks the currently playing video

  // Fetching videos with react-query
  const { data, error, isLoading } = useQuery({
    queryKey: ["videos"],
    queryFn: fetchVideos,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
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

      {/* Video grid */}
      <main className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Skeleton cards for loading */}
        {isLoading || !data
          ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : filteredVideos.map((video, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded overflow-hidden shadow hover:shadow-lg cursor-pointer"
              >
                {playingVideo === index ? (
                  // Embed the playable video when thumbnail is clicked
                  <iframe
                    className="w-full h-48"
                    src={`https://www.youtube.com/embed/${extractVideoId(
                      video.url
                    )}`}
                    allowFullScreen
                    allow="autoplay; encrypted-media"
                  ></iframe>
                ) : (
                  // Show the thumbnail by default
                  <img
                    className="w-full h-48 object-cover"
                    src={`https://img.youtube.com/vi/${extractVideoId(
                      video.url
                    )}/hqdefault.jpg`}
                    alt={video.title}
                    onClick={() => setPlayingVideo(index)} // Play video on click
                  />
                )}

                {/* Video info */}
                <div className="p-2">
                  <h2 className="text-sm font-semibold">{video.title}</h2>
                  <div className="flex gap-2 text-xs text-gray-400 mt-1">
                    <p>{video.category}</p>
                    <p>
                      {formatDistanceToNow(new Date(video.updatedAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
      </main>
    </div>
  );
};

export default MyTube;
