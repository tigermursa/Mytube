/* eslint-disable @next/next/no-img-element */

import { formatDistanceToNow } from "date-fns";
import { Icon } from "@iconify/react";

const VideoCard = ({ props }) => {
  const {
    isLoading,
    data,
    filteredVideos,
    playingVideo,
    setPlayingVideo,
    extractVideoId,
  } = props;

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
      {/* Skeleton cards for loading */}
      {isLoading || !data ? (
        Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))
      ) : filteredVideos.length > 0 ? (
        filteredVideos.map((video, index) => (
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
        ))
      ) : (
        // Show "No videos found" message
        <div className="col-span-full flex h-[400px] md:h-[600px] flex-col items-center justify-center text-gray-400">
          <Icon icon="bx:error-alt" className="text-6xl mb-2" />
          <p className="text-lg">No videos found</p>
        </div>
      )}
    </main>
  );
};

export default VideoCard;
