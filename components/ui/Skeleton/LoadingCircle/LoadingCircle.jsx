import React from "react";
import cn from "classnames";

function LoadingCircle({
  className = "text-primary",
  size = 5,
  backgroundClassName = "text-white",
}) {
  let svgSize = size * 10;
  return (
    <svg
      className={cn("animate-spin fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      style={{ height: `${svgSize}px`, width: `${svgSize}px` }}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="6"
        stroke="currentColor"
        strokeWidth="4"
        className={backgroundClassName}
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}

export default LoadingCircle;
