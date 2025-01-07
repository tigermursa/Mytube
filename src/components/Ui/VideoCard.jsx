/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { deleteVideo } from "@/lib/api";
import { Icon } from "@iconify/react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

const VideoCard = ({
  isLoading,
  data,
  filteredVideos,
  playingVideo,
  setPlayingVideo,
  extractVideoId,
  categories,
  selectedCategory,
  handleCategoryChange,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(null); // Tracks dropdown visibility
  const dropdownRef = useRef(null);
  const queryClient = useQueryClient();

  // Mutation for delete API
  const { mutate: softDeleteVideo, isPending } = useMutation({
    mutationFn: deleteVideo,
    onSuccess: () => {
      // Invalidate or refetch the video list
      queryClient.invalidateQueries(["videos"]);
      toast.success("Video deleted successfully!");
      setDropdownVisible(null);
    },
    onError: (error) => {
      console.error("Failed to delete video:", error);
      toast.error("Failed to delete video");
    },
  });

  const handleDelete = (id) => {
    // Trigger the mutation
    softDeleteVideo(id);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  return (
    <>
      {/* Category Selector */}
      <div className="flex space-x-4 p-4  overflow-x-auto max-w-[400px] sm:max-w-full mb-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ease-in-out ${
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
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6 sm:p-4">
        {isLoading || !data ? (
          Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : filteredVideos.length > 0 ? (
          filteredVideos.map((video, index) => (
            <div
              key={index}
              className="relative bg-gray-900 rounded overflow-hidden shadow hover:shadow-lg cursor-pointer "
            >
              {playingVideo === index ? (
                <iframe
                  className="w-full h-48"
                  src={`https://www.youtube.com/embed/${extractVideoId(
                    video.url
                  )}`}
                  allowFullScreen
                  allow="autoplay; encrypted-media"
                ></iframe>
              ) : (
                <img
                  className="w-full h-48 object-cover"
                  src={`https://img.youtube.com/vi/${extractVideoId(
                    video.url
                  )}/hqdefault.jpg`}
                  alt={video.title}
                  onClick={() => setPlayingVideo(index)}
                />
              )}

              <div className="p-4">
                <h2 className="text-sm font-semibold truncate">
                  {video.title.length > 45
                    ? video.title.slice(0, 45) + "..."
                    : video.title}
                </h2>
                <div className="flex gap-2 text-xs text-gray-400 mt-1">
                  <p>{video.category}</p>
                  <p>
                    {formatDistanceToNow(new Date(video.updatedAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>

              {/* Dropdown */}
              <div className="absolute top-2 right-2">
                <button
                  onClick={() =>
                    setDropdownVisible((prev) =>
                      prev === index ? null : index
                    )
                  }
                  className="text-white"
                >
                  <Icon icon="mdi:dots-vertical" className="text-lg" />
                </button>
                {dropdownVisible === index && (
                  <div className="absolute right-0 bg-gray-800 text-gray-200 rounded shadow-lg p-2 mt-2 w-40 transition-opacity duration-300 ease-in-out">
                    <button
                      className="flex items-center w-full text-left px-2 py-1 hover:bg-gray-700"
                      onClick={() => alert("Update functionality coming soon!")}
                    >
                      <Icon icon="mdi:lead-pencil" className="mr-2 text-sm" />
                      Update
                    </button>
                    <button
                      className="flex items-center w-full text-left px-2 py-1 text-red-500 hover:bg-gray-700"
                      onClick={() => handleDelete(video._id)}
                      disabled={isPending}
                    >
                      <Icon icon="mdi:delete" className="mr-2 text-sm" />
                      {isPending || isLoading ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center h-screen text-gray-400">
            <Icon icon="bx:error-alt" className="text-6xl mb-2" />
            <p>No videos found</p>
          </div>
        )}
      </main>

      {/* Sticky Bottom Navigation for Mobile */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-gray-950 p-4 flex justify-around items-center z-[555]">
        <Link href={"/"} className="flex flex-col items-center">
          <Icon icon="mdi:home" width={24} height={24} />
          <span className="text-sm">Home</span>
        </Link>
        <Link href={"/deleted"} className="flex flex-col items-center">
          <Icon icon="mdi:history" width={24} height={24} />
          <span className="text-sm">History</span>
        </Link>
        <Link href={"/add-video"} className="flex flex-col items-center">
          <Icon icon="mdi:add" width={24} height={24} />
          <span className="text-sm">Add</span>
        </Link>
      </div>
    </>
  );
};

export default VideoCard;
