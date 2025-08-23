import React from "react";
import PropTypes from "prop-types";

const Loader = ({ size = "lg", color = "green" }) => {
  const sizeClasses = {
    sm: "h-6 w-6 border-2",
    md: "h-10 w-10 border-4",
    lg: "h-16 w-16 border-4",
  };

  const colorClasses = {
    green: "border-green-600 border-t-transparent",
    white: "border-white border-t-transparent",
    blue: "border-blue-600 border-t-transparent",
  };

  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div
        className={`rounded-full animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
      />
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  color: PropTypes.oneOf(["green", "white", "blue"]),
};

export default Loader;
