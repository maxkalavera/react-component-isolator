import React, { ReactElement } from "react";

function BackgroundGrid({
  isGridOn=true,
  zoomFraction=1.0
}: {
  isGridOn?: boolean
  zoomFraction?: Number
}): ReactElement | null {
  if (isGridOn) {
    return (
      <svg
        width="200%"
        height="200%"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          opacity: isGridOn ? '1.0' : '0.0'
        }}
      >
        <defs>
          <pattern 
            id="smallGrid" 
            width={`${10 * Number(zoomFraction)}`}
            height={`${10 * Number(zoomFraction)}`}
            patternUnits="userSpaceOnUse"
          >
            <path 
              d={`M ${10 * Number(zoomFraction)} 0 L 0 0 0 ${10 * Number(zoomFraction)}`}
              fill="none" 
              stroke="#9E9E9E" 
              strokeWidth="0.5"
            />
          </pattern>
          <pattern 
            id="grid" 
            width={`${100 * Number(zoomFraction)}`}
            height={`${100 * Number(zoomFraction)}`}
            patternUnits="userSpaceOnUse"
          >
            <rect 
              width={`${100 * Number(zoomFraction)}`}
              height={`${100 * Number(zoomFraction)}`}
              fill="url(#smallGrid)"
            />
            <path 
              d={`M ${100 * Number(zoomFraction)} 0 L 0 0 0 ${100 * Number(zoomFraction)}`} 
              fill="none" 
              stroke="#9E9E9E" 
              strokeWidth="1.0"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    );  
  } else {
    return null;
  }
}

export default BackgroundGrid;