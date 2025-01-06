"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import { addVideo } from "@/lib/api";

const AddVideo = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const addVideoMutation = useMutation({
    mutationFn: addVideo,
    onSuccess: () => {
      toast.success("Video added successfully!");
      reset();
    },
    onError: () => {
      toast.error("Failed to add video. Please try again.");
    },
  });

  const onSubmit = (data) => {
    const { ...videoData } = data;
    addVideoMutation.mutate(videoData);
  };

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

  return (
    <div className="bg-gray-950 border text-white p-8 rounded-xl w-[400px] mx-auto flex flex-col justify-center items-center shadow-lg mt-10">
      <div className="flex items-center gap-1">
        <Icon icon="logos:youtube-icon" width={30} height={30} />
        <h1 className="text-2xl font-bold">Add New Video</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title
          </label>
          <input
            id="title"
            {...register("title", { required: "Title is required" })}
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 "
            placeholder="Enter video title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-2">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="url" className="block text-sm font-medium mb-2">
            Video URL
          </label>
          <input
            id="url"
            {...register("url", {
              required: "Video URL is required",
            })}
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 "
            placeholder="Enter video URL"
          />
          {errors.url && (
            <p className="text-red-500 text-sm mt-2">{errors.url.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Category
          </label>
          <select
            id="category"
            {...register("category", { required: "Category is required" })}
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white "
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-2">
              {errors.category.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className={`w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700  transition duration-200 ${
            addVideoMutation.isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={addVideoMutation.isLoading}
        >
          {addVideoMutation.isLoading ? "Adding..." : "Add Video"}
        </button>
      </form>
    </div>
  );
};

export default AddVideo;
