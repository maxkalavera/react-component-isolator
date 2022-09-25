import React, { ReactElement, useEffect, useRef } from "react";

import globalStyles from 'src/styles/globals.module.css';

import {
  BACKGROUND_CANVAS_LINE_WIDTH,
  BACKGROUND_CANVAS_FRAME_WIDTH,
  COLORS
} from 'src/utils/constants';

const UNIT = 10;

function drawGrid({
  canvas,
  color=COLORS['gray-400'],
  zoomFraction=1.0,
  lineWidth=BACKGROUND_CANVAS_LINE_WIDTH,
  frameWidth=BACKGROUND_CANVAS_FRAME_WIDTH,
  unit=UNIT
}: {
  canvas: HTMLCanvasElement,
  color?: string,
  zoomFraction?: number,
  lineWidth?: number,
  frameWidth?: number,
  unit?: number
}) {
  let context = canvas.getContext("2d");

  if (context === null) {
    return;
  }

  context.beginPath();
  context.lineWidth = lineWidth;
  context.strokeStyle = color;
  // Vertical thin lines
  for (let i = unit; i < canvas.width; i += unit) {
    context.moveTo(frameWidth + (i * zoomFraction), 0);
    context.lineTo(frameWidth + (i * zoomFraction), canvas.height);
  }
  // Horizontal thin lines
  for (let i = unit; i < canvas.height; i += unit) {
    context.moveTo(0, frameWidth + (i * zoomFraction));
    context.lineTo(canvas.width, frameWidth+ (i * zoomFraction));
  }
  context.stroke();
}

function drawFrame({
  canvas,
  color=COLORS['gray-700'],
  constrastColor=COLORS['gray-100'],
  zoomFraction=1.0,
  lineWidth=BACKGROUND_CANVAS_LINE_WIDTH,
  frameWidth=BACKGROUND_CANVAS_FRAME_WIDTH,
  unit=Math.floor(UNIT) ** 2
}: {
  canvas: HTMLCanvasElement,
  color?: string,
  constrastColor?: string,
  zoomFraction?: number,
  lineWidth?: number,
  frameWidth?: number,
  unit?: number
}) {
  let context = canvas.getContext("2d");

  if (context === null) {
    return;
  }
  let halfframeWidthWidth = Math.floor(frameWidth * 0.5);

  context.beginPath();
  context.lineWidth = frameWidth;
  context.strokeStyle = color;

  // Vertical frame
  context.moveTo(0, halfframeWidthWidth);
  context.lineTo(canvas.width, halfframeWidthWidth);

  // Horizontal frame
  context.moveTo(halfframeWidthWidth, 0);
  context.lineTo(halfframeWidthWidth, canvas.height);

  context.stroke();

  // Draw measure lines
  context.beginPath();
  context.lineWidth = lineWidth;
  context.strokeStyle = constrastColor;

  // Vertical ones
  for (let i = unit; i < canvas.height; i += unit) {
    context.moveTo(frameWidth * (3/ 4), frameWidth + (i * zoomFraction));
    context.lineTo(frameWidth, frameWidth + (i * zoomFraction));
  }

  // Horizontal ones
  for (let i = unit; i < canvas.height; i += unit) {
    context.moveTo(frameWidth + (i * zoomFraction), frameWidth * (3/ 4));
    context.lineTo(frameWidth + (i * zoomFraction), frameWidth);
  }

  // Corner lines
  context.moveTo(0, frameWidth);
  context.lineTo(frameWidth, frameWidth);
  context.moveTo(frameWidth, 0);
  context.lineTo(frameWidth, frameWidth);

  context.stroke();

  // Vertical number text in measure lines
  for (let i = unit; i < canvas.height; i += unit) {
    context.save();
    context.textAlign = 'center';
    context.font = '10px Roboto';
    context.textBaseline = 'middle';
    context.fillStyle = constrastColor;
    context.translate(halfframeWidthWidth, frameWidth + (i * zoomFraction));
    context.rotate(270 * (Math.PI / 180));
    context.fillText(`${i}`, 0, 0);  
    context.restore();
  }

  // Vertical number text in measure lines
  for (let i = unit; i < canvas.height; i += unit) {
    context.textAlign = 'center';
    context.font = '10px Roboto';
    context.textBaseline = 'middle';
    context.fillStyle = constrastColor;
    context.fillText(`${i}`, frameWidth + (i * zoomFraction), halfframeWidthWidth);  
  }

}


/******************************************************************************
* Component
******************************************************************************/
function BackgroundCanvasGrid({
  isGridOn=true,
  zoomFraction=1.0,
  unit=UNIT,
}: {
  isGridOn?: boolean,
  zoomFraction?: number,
  unit?: number,
}): ReactElement | null {
  if (isGridOn) {
    const canvasWrapperRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      if (canvasRef.current === null || canvasWrapperRef.current === null) {
        return;
      }

      let canvasWrapper = canvasWrapperRef.current;
      let canvas = canvasRef.current;
      // Resize canvas to have same size as container in HTML DOM
      canvas.width = canvasWrapper.offsetWidth;
      canvas.height = canvasWrapper.offsetHeight;

      // Drawn background elements
      {
        // Draw thin grid
        drawGrid({ 
          canvas, 
          color: COLORS['gray-400'], 
          unit: unit, 
          zoomFraction 
        });
        // Draw thick grid
        drawGrid({ 
          canvas, 
          color: COLORS['gray-700'], 
          unit: Math.floor(unit ** 2), 
          zoomFraction 
        });

        // Draw frame
        drawFrame({ 
          canvas, 
          color: COLORS['gray-700'], 
          constrastColor: COLORS['gray-100'], 
          unit: Math.floor(unit ** 2), 
          zoomFraction 
        });
      }

    }, [
      canvasRef.current, 
      canvasWrapperRef.current, 
      canvasWrapperRef.current?.offsetWidth, 
      canvasWrapperRef.current?.offsetHeight, 
      zoomFraction
    ]);

    return (
      <div
        style={{
          width: '100%',
          height: '100%'
        }}
        ref={canvasWrapperRef}
      >
        <canvas
          ref={canvasRef}
        />
      </div>
    );  
  } else {
    return null;
  }
}

export default BackgroundCanvasGrid;