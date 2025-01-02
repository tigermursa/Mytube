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
    // Exclude isDeleted field
    const { isDeleted, ...videoData } = data;
    addVideoMutation.mutate(videoData);
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg max-w-md mx-auto mt-10">
      <h2 className="text-center text-xl font-semibold mb-4">Add New Video</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            {...register("title", { required: "Title is required" })}
            className="w-full p-2 mt-1 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-500"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="url" className="block text-sm font-medium">
            Video URL
          </label>
          <input
            id="url"
            {...register("url", {
              required: "Video URL is required",
            })}
            className="w-full p-2 mt-1 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-500"
          />
          {errors.url && (
            <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium">
            Category
          </label>
          <select
            id="category"
            {...register("category", { required: "Category is required" })}
            className="w-full p-2 mt-1 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            <option value="React">React</option>
            <option value="JavaScript">JavaScript</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Interview Important">Interview Important</option>
            <option value="Gem">Gem</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500 ${
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
