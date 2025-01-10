import { Icon } from "@iconify/react";

const CategorySelector = ({
  categories,
  selectedCategory,
  handleCategoryChange,
}) => {
  return (
    <div className="flex flex-wrap gap-2 p-4 overflow-x-auto max-w-full mb-4">
      {/* Compass icon for mobile only */}
      <div className="sm:hidden flex items-center gap-2 mb-2">
        <Icon
          icon="mdi:compass"
          width={24}
          height={24}
          className="text-white"
        />
      </div>

      {/* Category buttons */}
      {categories?.map((category) => (
        <button
          key={category}
          className={`px-4 py-2 rounded-md text-xs sm:text-sm md:text-base text-nowrap font-medium transition-all duration-150 ease-in-out ${
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
  );
};

export default CategorySelector;
