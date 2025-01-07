import axios from "axios";

const api = axios.create({
    baseURL:"https://mytube-server.vercel.app/"
})


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
