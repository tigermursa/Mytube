/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { deleteVideo } from "@/lib/api";
import { Icon } from "@iconify/react";
import { formatDistanceToNow } from "date-fns";

const VideoCard = ({ props }) => {
  const {
    isLoading,
    data,
    filteredVideos,
    playingVideo,
    setPlayingVideo,
    extractVideoId,
  } = props;

  const [dropdownVisible, setDropdownVisible] = useState(null); // Tracks dropdown visibility
  const [isDeleting, setIsDeleting] = useState(false); // Tracks delete loading state

  const handleDelete = async (id) => {
    try {
      setIsDeleting(true);
      await deleteVideo(id);
      alert("Video deleted successfully!");
      // Refetch or update state to reflect deletion
    } catch (error) {
      console.error("Failed to delete video:", error);
      alert("Failed to delete video");
    } finally {
      setIsDeleting(false);
    }
  };

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
    <main className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {isLoading || !data ? (
        Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))
      ) : filteredVideos.length > 0 ? (
        filteredVideos.map((video, index) => (
          <div
            key={index}
            className="relative bg-gray-900 rounded overflow-hidden shadow hover:shadow-lg cursor-pointer"
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

            {/* Dropdown */}
            <div className="absolute top-2 right-2">
              <button
                onClick={() =>
                  setDropdownVisible((prev) => (prev === index ? null : index))
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
                    disabled={isDeleting}
                  >
                    <Icon icon="mdi:delete" className="mr-2 text-sm" />
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center text-gray-400">
          <Icon icon="bx:error-alt" className="text-6xl mb-2" />
          <p>No videos found</p>
        </div>
      )}
    </main>
  );
};

export default VideoCard;
