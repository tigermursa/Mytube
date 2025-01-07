import React from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";

export const Button = ({
  children,
  className = "",
  icon = null,
  iconPosition = "left",
  isLoading = false,
  disabled = false,
  onClick,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
  const disabledClasses = "opacity-50 cursor-not-allowed";
  const enabledClasses =
    "bg-red-600 text-white border-transparent hover:bg-red-700 focus:ring-red-500";

  return (
    <button
      className={`${baseClasses} ${
        disabled || isLoading ? disabledClasses : enabledClasses
      } ${className}`}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading && (
        <Icon icon="eos-icons:loading" className="animate-spin mr-2" />
      )}
      {icon && iconPosition === "left" && <Icon icon={icon} className="mr-2" />}
      {children}
      {icon && iconPosition === "right" && (
        <Icon icon={icon} className="ml-2" />
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  icon: PropTypes.string,
  iconPosition: PropTypes.oneOf(["left", "right"]),
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  className: "",
  icon: null,
  iconPosition: "left",
  isLoading: false,
  disabled: false,
  onClick: null,
};
