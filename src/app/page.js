"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import searchIcon from "@iconify/icons-mdi/magnify";
import micIcon from "@iconify/icons-mdi/microphone";
import { useQuery } from "@tanstack/react-query";
import { fetchVideos } from "@/lib/api";
import Link from "next/link";

const MyTube = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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

  const categories = ["All", "Tech", "JavaScript", "React", "Next.js"];

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
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-gray-950 p-4 transition-all duration-300`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-1">
            <Icon icon="logos:youtube-icon" width={30} height={30} />
            {isSidebarOpen && <h1 className="text-xl font-bold">MyTube</h1>}
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-400 hover:text-white"
          >
            <Icon
              icon={isSidebarOpen ? "mdi:menu-open" : "mdi:menu"}
              width={24}
            />
          </button>
        </div>

        <nav>
          <ul className="space-y-4">
            <li className="flex items-center gap-4 hover:bg-gray-800 p-2 rounded cursor-pointer">
              <Icon icon="mdi:home" width={24} />
              {isSidebarOpen && <span>Home</span>}
            </li>
            <li className="flex items-center gap-4 hover:bg-gray-800 p-2 rounded cursor-pointer">
              <Icon icon="mdi:movie-outline" width={24} />
              {isSidebarOpen && <span>Shorts</span>}
            </li>
            <li className="flex items-center gap-4 hover:bg-gray-800 p-2 rounded cursor-pointer">
              <Icon icon="mdi:playlist-play" width={24} />
              {isSidebarOpen && <span>Subscriptions</span>}
            </li>
            <li className="flex items-center gap-4 hover:bg-gray-800 p-2 rounded cursor-pointer">
              <Icon icon="mdi:history" width={24} />
              {isSidebarOpen && <span>History</span>}
            </li>
            <li className="flex items-center gap-4 hover:bg-gray-800 p-2 rounded cursor-pointer">
              <Icon icon="mdi:thumb-up-outline" width={24} />
              {isSidebarOpen && <span>Liked Videos</span>}
            </li>
            <Link href={"/add-video"}>
              <li className="flex items-center gap-4 hover:bg-gray-800 p-2 rounded cursor-pointer">
                <Icon icon="mdi:thumb-up-outline" width={24} />
                {isSidebarOpen && <span>Add Video</span>}
              </li>
            </Link>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-950 p-4 flex items-center justify-between ">
          <div>
            <p className="text-black disabled">hi</p>
          </div>
          <div className="flex items-center space-x-2">
            {/* Search Bar */}
            <div className="flex items-center w-96 bg-gray-900 rounded-full border border-gray-700 px-4 py-2">
              <input
                type="text"
                placeholder="Search"
                className="flex-grow bg-transparent text-white focus:outline-none"
              />
              <Icon
                icon={searchIcon}
                className="text-gray-400 cursor-pointer"
                width={20}
                height={20}
              />
            </div>
            {/* Microphone Icon */}
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 border border-gray-700">
              <Icon
                icon={micIcon}
                className="text-gray-400 cursor-pointer"
                width={20}
                height={20}
              />
            </button>
          </div>
          <Image
            src="https://yt3.googleusercontent.com/ytc/AIdro_nal57KeBhUhRo4k8jl7fdgbOkT046_L2wfJoHmLsB0azbN=s160-c-k-c0x00ffffff-no-rj"
            alt="User Profile"
            width={40}
            height={40}
            className="rounded-full cursor-pointer"
          />
        </header>

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
