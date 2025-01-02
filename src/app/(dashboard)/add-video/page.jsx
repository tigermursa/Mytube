"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

const AddVideo = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const addVideoMutation = useMutation({
    mutationFn: async (newVideo) => {
      const response = await fetch(
        "https://mytube-server.vercel.app/api/v1/create-video",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newVideo),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add video");
      }

      return response.json();
    },
    onSuccess: () => {
      alert("Video added successfully!");
      reset();
    },
    onError: () => {
      alert("Failed to add video. Please try again.");
    },
  });

  const onSubmit = (data) => {
    const { isDeleted, ...videoData } = data;
    addVideoMutation.mutate(videoData);
  };

  return (
    <div className="bg-gray-900 text-white p-8 rounded-xl w-[400px] mx-auto flex flex-col justify-center items-center shadow-lg mt-10">
      <h2 className="text-center text-2xl font-bold mb-6">Add New Video</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title
          </label>
          <input
            id="title"
            {...register("title", { required: "Title is required" })}
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="React">React</option>
            <option value="JavaScript">JavaScript</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Interview Important">Interview Important</option>
            <option value="Gem">Gem</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-2">
              {errors.category.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className={`w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
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
