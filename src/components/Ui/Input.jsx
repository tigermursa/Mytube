import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

export const Input = React.forwardRef(
  ({ id, type = "text", placeholder, error, className, ...rest }, ref) => {
    const baseClasses =
      "appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm";
    const errorClasses = error
      ? "border-red-500 focus:ring-red-500"
      : "border-gray-700 focus:ring-blue-500";
    const combinedClasses = clsx(baseClasses, errorClasses, className);

    return (
      <div>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          ref={ref}
          className={combinedClasses}
          {...rest}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
};

Input.displayName = "Input";
