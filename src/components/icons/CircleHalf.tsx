import React from "react";

function CircleHalf({
  width = 16,
  height = 16,
  className = "",
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="currentColor"
      className={`bi bi-circle-half ${className}`}
      viewBox="0 0 16 16"
    >
      <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
    </svg>
  );
}

export default CircleHalf;
