"use client";

import React, { useState, useMemo, useCallback } from "react";

import { useQuery } from "@tanstack/react-query";
import { fetchVideos } from "@/lib/api";

const MyTube = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data, error, isLoading } = useQuery({
    queryKey: ["videos"],
    queryFn: fetchVideos,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
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

  const extractEmbedUrl = useCallback((url) => {
    try {
      if (url.includes("youtube.com")) {
        const urlParams = new URL(url).searchParams;
        const videoId = urlParams.get("v");
        return `https://www.youtube.com/embed/${videoId}`;
      } else if (url.includes("youtu.be")) {
        const videoId = url.split("youtu.be/")[1].split("?")[0];
        return `https://www.youtube.com/embed/${videoId}`;
      } else if (url.includes("youtube.com/live")) {
        const liveId = new URL(url).pathname.split("/").pop();
        return `https://www.youtube.com/embed/${liveId}`;
      }
    } catch (err) {
      console.error("Error parsing video URL:", err);
      return null;
    }
  }, []);

  const filteredVideos = useMemo(() => {
    return data?.data.filter(
      (video) =>
        selectedCategory === "All" || video.category === selectedCategory
    );
  }, [data, selectedCategory]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.data) return <div>No data</div>;

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {/* Main Content */}
      <div>
        <div className="flex space-x-4 p-4">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedCategory === category
                  ? "bg-gray-200 text-black"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <main className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredVideos.map((video, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded overflow-hidden shadow hover:shadow-lg cursor-pointer"
            >
              <iframe
                className="w-full h-48"
                src={extractEmbedUrl(video.url)}
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                allowFullScreen
              ></iframe>

              <div className="p-2">
                <h2 className="text-sm font-semibold">{video.title}</h2>
                <p className="text-xs text-gray-400">{video.category}</p>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default MyTube;
