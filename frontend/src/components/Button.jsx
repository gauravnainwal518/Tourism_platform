import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg focus:outline-none transition duration-150";

  const variants = {
    primary:
      "bg-green-700 text-white hover:bg-green-800 focus:ring-2 focus:ring-green-500",
    secondary:
      "bg-white text-green-700 border border-green-700 hover:bg-green-50 focus:ring-2 focus:ring-green-500",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-2.5 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
