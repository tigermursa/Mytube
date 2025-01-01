"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";

const MyTube = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const videoData = [
    {
      url: "https://youtu.be/ZxOLXImWvHU?si=VFe645VA6aWGRpxP",
      title: "Title 1",
      category: "Tech",
    },
    {
      url: "https://youtu.be/azj_VtnOV4Q?si=lL215nF8_z53CxNv",
      title: "Title 2",
      category: "JavaScript",
    },
    {
      url: "https://youtu.be/azj_VtnOV4Q?si=lL215nF8_z53CxNv",
      title: "Title 3",
      category: "React",
    },
    {
      url: "https://youtu.be/azj_VtnOV4Q?si=lL215nF8_z53CxNv",
      title: "Title 4",
      category: "Next.js",
    },
    {
      url: "https://youtu.be/-Zdp_0rZIcg?si=uSw4PpP4upIUDFPs",
      title: "Title 5",
      category: "Tech",
    },
    {
      url: "https://youtu.be/gA-6-5sxN0s?si=9kpsnCOqSavmGnBh",
      title: "Title 6",
      category: "JavaScript",
    },
    {
      url: "https://youtu.be/SVoBLsp1cjY?si=LiB4mWK2Z3eJ9Uw4",
      title: "Title 7",
      category: "React",
    },
    {
      url: "https://youtu.be/066XnNRfjiE?si=cUJksjJtC38J1zmB",
      title: "Title 8",
      category: "Next.js",
    },
    {
      url: "https://youtu.be/CLWGuNkQLAc?si=wt9lmLUhtgeznpPP",
      title: "Title 9",
      category: "Tech",
    },
    {
      url: "https://youtu.be/Thhh9Om17I0?si=NJoJ8divXrePvCrO",
      title: "Title 10",
      category: "JavaScript",
    },
    {
      url: "https://youtu.be/SycSR-NuDF0?si=5FHefo3o26Un1zjB",
      title: "Title 11",
      category: "React",
    },
  ];

  const categories = ["All", "Tech", "JavaScript", "React", "Next.js"];

  const extractEmbedUrl = (url) => {
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
    return null;
  };

  const filteredVideos = videoData.filter(
    (video) => selectedCategory === "All" || video.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-gray-900 p-4 transition-all duration-300`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Icon icon="mdi:youtube" color="red" width={30} height={30} />
            {isSidebarOpen && <h1 className="text-xl font-bold">MyTube</h1>}
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-400 hover:text-white focus:outline-none"
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
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-gray-900 p-4 flex items-center justify-between">
          <input
            type="text"
            placeholder="Search..."
            className="w-1/2 p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring"
          />
          <img
            src="https://yt3.googleusercontent.com/ytc/AIdro_nal57KeBhUhRo4k8jl7fdgbOkT046_L2wfJoHmLsB0azbN=s160-c-k-c0x00ffffff-no-rj"
            alt="User Profile"
            width={40}
            height={40}
            className="rounded-full cursor-pointer"
          />
        </header>

        {/* Categories */}
        <div className="flex space-x-4 p-4 bg-gray-800">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium focus:outline-none ${
                selectedCategory === category
                  ? "bg-red-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <main className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredVideos.map((video, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded overflow-hidden shadow hover:shadow-lg cursor-pointer"
            >
              <iframe
                className="w-full h-48 object-cover"
                src={extractEmbedUrl(video.url)}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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
