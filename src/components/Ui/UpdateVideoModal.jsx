/* eslint-disable @next/next/no-img-element */
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const UpdateVideoModal = ({ isOpen, onClose, video }) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      url: video?.url || "",
      title: video?.title || "",
      category: video?.category || "",
    },
  });

  const { mutate: updateVideo, isLoading } = useMutation({
    mutationFn: async (updatedData) => {
      const response = await fetch(
        `https://mytube-server.vercel.app/api/v1/update-video/${video._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update video");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["videos"]);
      toast.success("Video updated successfully!");
      onClose();
      reset();
    },
    onError: () => {
      toast.error("Failed to update video");
    },
  });

  const onSubmit = (data) => {
    updateVideo(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold text-white mb-4">Update Video</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Video URL</label>
            <input
              type="text"
              {...register("url", { required: "URL is required" })}
              className="w-full p-2 bg-gray-700 text-white rounded"
            />
            {errors.url && (
              <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full p-2 bg-gray-700 text-white rounded"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Category</label>
            <input
              type="text"
              {...register("category", { required: "Category is required" })}
              className="w-full p-2 bg-gray-700 text-white rounded"
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 bg-gray-600 text-white rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded ${
                isLoading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateVideoModal;
