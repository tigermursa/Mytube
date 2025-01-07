import React from "react";
import PropTypes from "prop-types";

export const Label = ({ htmlFor, children, className = "" }) => {
  const baseClasses = "block text-sm font-medium text-gray-400 mb-1";

  return (
    <label htmlFor={htmlFor} className={`${baseClasses} ${className}`}>
      {children}
    </label>
  );
};

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
