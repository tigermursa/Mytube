/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import searchIcon from "@iconify/icons-mdi/magnify";
import micIcon from "@iconify/icons-mdi/microphone";
import NavigationMobile from "@/components/Shared/NavigationMobile";

const layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow ">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "w-64" : "w-16"
          } bg-gray-950 p-4 transition-all duration-300 hidden sm:block`}
        >
          <div className="flex items-center justify-between mb-6">
            <Link href={"/"}>
              <div className="flex items-center gap-1">
                <Icon icon="logos:youtube-icon" width={30} height={30} />
                {isSidebarOpen && <h1 className="text-xl font-bold">MyTube</h1>}
              </div>
            </Link>

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
              <Link href={"/"}>
                <li className="flex items-center gap-4 hover:bg-gray-800 p-2 rounded cursor-pointer">
                  <Icon icon="mdi:home" width={24} />
                  {isSidebarOpen && <span>Home</span>}
                </li>
              </Link>
              <li className="flex items-center gap-4 hover:bg-gray-800 p-2 rounded cursor-pointer">
                <Icon icon="mdi:movie-outline" width={24} />
                {isSidebarOpen && <span>Shorts</span>}
              </li>
              <li className="flex items-center gap-4 hover:bg-gray-800 p-2 rounded cursor-pointer">
                <Icon icon="mdi:playlist-play" width={24} />
                {isSidebarOpen && <span>Subscriptions</span>}
              </li>
              <Link href={"/deleted"}>
                <li className="flex items-center gap-4 hover:bg-gray-800 p-2 rounded cursor-pointer">
                  <Icon icon="mdi:history" width={24} />
                  {isSidebarOpen && <span>History</span>}
                </li>
              </Link>
              <li className="flex items-center gap-4 hover:bg-gray-800 p-2 rounded cursor-pointer">
                <Icon icon="mdi:thumb-up-outline" width={24} />
                {isSidebarOpen && <span>Liked Videos</span>}
              </li>
              <Link href={"/add-video"}>
                <li className="flex items-center gap-4 hover:bg-gray-800 p-2 rounded cursor-pointer">
                  <Icon icon="mdi:add" width={24} />
                  {isSidebarOpen && <span>Add Video</span>}
                </li>
              </Link>
            </ul>
          </nav>
        </aside>

        <div className="flex-1 flex flex-col">
          <div className="hidden sm:block">
            <header className="bg-gray-950 p-4 flex items-center justify-between">
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
          </div>
          {children}
        </div>
      </div>
      {/* Sticky Bottom Navigation for Mobile */}
      <NavigationMobile />
    </div>
  );
};

export default layout;
