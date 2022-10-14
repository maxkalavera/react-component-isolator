import React, { 
  ReactElement, 
  useEffect, 
  useRef, 
  useLayoutEffect, 
  MouseEventHandler, 
  useState 
} from "react";

import { getFloatValues } from 'src/utils/string';
import { useReactIsolatorContext } from 'src/providers/ReactIsolatorContext';

import {
  BACKGROUND_CANVAS_LINE_WIDTH,
  BACKGROUND_CANVAS_THIN_LINE_WIDTH,
  BACKGROUND_CANVAS_FRAME_WIDTH,
  COLORS,
  ZOOM_FRACTIONS
} from 'src/utils/constants';

const UNIT = 10;

function drawGrid({
  canvas,
  color=COLORS['gray-400'],
  zoomFractionValue=1.0,
  lineWidth=BACKGROUND_CANVAS_THIN_LINE_WIDTH,
  frameWidth=BACKGROUND_CANVAS_FRAME_WIDTH,
  unit=UNIT
}: {
  canvas: HTMLCanvasElement,
  color?: string,
  zoomFractionValue?: number,
  lineWidth?: number,
  frameWidth?: number,
  unit?: number
}) {
  let context = canvas.getContext("2d");

  if (context === null) {
    return;
  }

  let step = Math.floor(unit * zoomFractionValue);
  let initialLinePosition = Math.floor(frameWidth / step) * -step;
  context.beginPath();
  context.lineWidth = lineWidth;
  context.strokeStyle = color;
  // Vertical lines
  for (let i = initialLinePosition; i < canvas.width; i += step) {
    context.moveTo(frameWidth + i, 0);
    context.lineTo(frameWidth + i, canvas.height);
  }
  // Horizontal lines
  for (let i = initialLinePosition; i < canvas.height; i += step) {
    context.moveTo(0, frameWidth + i);
    context.lineTo(canvas.width, frameWidth + i);
  }
  context.stroke();
}

function drawFrameRulers({
  canvas,
  color=COLORS['primary-900'],
  constrastColor=COLORS['gray-100'],
  zoomFractionValue=1.0,
  lineWidth=BACKGROUND_CANVAS_THIN_LINE_WIDTH,
  frameWidth=BACKGROUND_CANVAS_FRAME_WIDTH,
  unit=Math.floor(UNIT) ** 2,
}: {
  canvas: HTMLCanvasElement,
  color?: string,
  constrastColor?: string,
  zoomFractionValue?: number,
  lineWidth?: number,
  frameWidth?: number,
  unit?: number,
  selectedElementDOMElement?: HTMLElement | null,
  selectedElementPosition?: [number, number] | null,
}) {
  let context = canvas.getContext("2d");
  if (context === null) {
    return;
  }

  let halfframeWidthWidth = Math.floor(frameWidth * 0.5);
  let step = Math.floor(unit * zoomFractionValue);

  context.beginPath();
  context.save();
  context.lineWidth = frameWidth;
  context.strokeStyle = color;
  context.shadowBlur = 10;
  context.shadowColor = COLORS['gray-900'];

  // Vertical frame
  context.moveTo(0, halfframeWidthWidth);
  context.lineTo(canvas.width, halfframeWidthWidth);

  // Horizontal frame
  context.moveTo(halfframeWidthWidth, 0);
  context.lineTo(halfframeWidthWidth, canvas.height);

  context.stroke();
  context.restore();

  // Draw measure lines
  context.beginPath();
  context.save();
  context.lineWidth = lineWidth;
  context.strokeStyle = constrastColor;

  // Vertical ones
  for (let i = step; i < canvas.height; i += step) {
    context.moveTo(frameWidth * (3/ 4), frameWidth + i);
    context.lineTo(frameWidth, frameWidth + i);
  }

  // Horizontal ones
  for (let i = step; i < canvas.width; i += step) {
    context.moveTo(frameWidth + i, frameWidth * (3/ 4));
    context.lineTo(frameWidth + i, frameWidth);
  }

  // Corner lines
  context.moveTo(0, frameWidth);
  context.lineTo(frameWidth, frameWidth);
  context.moveTo(frameWidth, 0);
  context.lineTo(frameWidth, frameWidth);

  context.stroke();
  context.restore();

  context.beginPath();
  context.textAlign = 'center';
  context.font = '10px Roboto';
  context.textBaseline = 'middle';
  context.fillStyle = constrastColor;
  // Vertical number text in measure lines
  for (let i = 1; (i * step) < canvas.height; i += 1) {
    context.save();
    context.translate(halfframeWidthWidth, frameWidth + (i * step));
    context.rotate(270 * (Math.PI / 180));
    context.fillText(`${Math.floor(i * unit)}`, 0, 0);  
    context.restore();
  }

  // Horizontal number text in measure lines
  for (let i = 1; (i * step) < canvas.width; i += 1) {
    context.save();
    context.fillText(`${Math.floor(i * unit)}`, frameWidth + (i * step), halfframeWidthWidth);
    context.restore();
  }
}

function drawSizeFrames({
  canvas,
  lineWidth=BACKGROUND_CANVAS_LINE_WIDTH,
  frameWidth=BACKGROUND_CANVAS_FRAME_WIDTH,
  selectedElementDOMElement=null,
  selectedElementPosition=null,
  zoomFractionValue=1.0,
}: {
  canvas: HTMLCanvasElement,
  lineWidth?: number,
  frameWidth?: number,
  selectedElementDOMElement?: HTMLElement | null,
  selectedElementPosition?: [number, number] | null,
  zoomFractionValue?: number,
}) {
  let context = canvas.getContext("2d");
  if ( 
    context === null
    || selectedElementDOMElement === null 
    || selectedElementPosition === null
  ) {
    return;
  }
  const canvasPosition = selectedElementPosition.map((item) => item + frameWidth);

  context.beginPath();
  context.save();
  context.lineWidth = Math.floor(lineWidth * zoomFractionValue);
  context.strokeStyle = COLORS['size-frame-position-line'];

  context.moveTo(canvasPosition[0], 0);
  context.lineTo(canvasPosition[0], canvas.height);

  context.moveTo(0, canvasPosition[1]);
  context.lineTo(canvas.width, canvasPosition[1]);

  context.stroke();
  context.restore();

  // Width, border, padding and margin rules
  const computedStyle = window.getComputedStyle(selectedElementDOMElement, null);
  const drawFrame = (
    rect: [number, number, number, number], 
    color: string
  ) => {
    if (context === null)
      return;

    context.beginPath();
    context.save();
    context.fillStyle = color;
    context.rect(...rect);
    context.fill();
    context.restore();
  };

  let width = getFloatValues(computedStyle.getPropertyValue('width'))[0];
  let paddingLeft = getFloatValues(computedStyle.getPropertyValue('padding-left'))[0];
  let paddingRight = getFloatValues(computedStyle.getPropertyValue('padding-right'))[0];
  let borderLeft = getFloatValues(computedStyle.getPropertyValue('border-left'))[0];
  let borderRight = getFloatValues(computedStyle.getPropertyValue('border-right'))[0];
  let marginLeft = getFloatValues(computedStyle.getPropertyValue('margin-left'))[0];
  let marginRight = getFloatValues(computedStyle.getPropertyValue('margin-right'))[0];
  let contentWidth = width - paddingLeft - paddingRight - borderLeft - borderRight;
  
  const horizontalFrames = [
    {
      value: marginLeft,
      color: COLORS['size-frame-margin'],
      rect: Array(4).fill(0)
    },
    {
      value: borderLeft,
      color: COLORS['size-frame-border'],
      rect: Array(4).fill(0)
    },
    {
      value: paddingLeft,
      color: COLORS['size-frame-padding'],
      rect: Array(4).fill(0)
    },
    {
      value: contentWidth,
      color: COLORS['size-frame-content'],
      rect: Array(4).fill(0)
    },
    {
      value: paddingRight,
      color: COLORS['size-frame-padding'],
      rect: Array(4).fill(0)
    },
    {
      value: borderRight,
      color: COLORS['size-frame-border'],
      rect: Array(4).fill(0)
    },
    {
      value: marginRight,
      color: COLORS['size-frame-margin'],
      rect: Array(4).fill(0)
    }
  ];

  horizontalFrames.map((item) => item.value).reduce((prev, current, index) => {
    let currentWithZoom = Math.floor(current * zoomFractionValue);
    horizontalFrames[index].rect = [prev, 0, currentWithZoom, canvas.height];  // frameWidth
    return Math.floor(prev + currentWithZoom);
  }, 
    canvasPosition[0]
    - Math.floor(
      (marginLeft + borderLeft + paddingLeft + (contentWidth * 0.5)) 
      * zoomFractionValue
    )
  );  

  horizontalFrames.forEach((item) => {
    drawFrame(
      item.rect as [number, number, number, number], 
      item.color
    );
  });

  let height = getFloatValues(computedStyle.getPropertyValue('height'))[0];
  let paddingTop = getFloatValues(computedStyle.getPropertyValue('padding-top'))[0];
  let paddingBottom = getFloatValues(computedStyle.getPropertyValue('padding-bottom'))[0];
  let borderTop = getFloatValues(computedStyle.getPropertyValue('border-top'))[0];
  let borderBottom = getFloatValues(computedStyle.getPropertyValue('border-bottom'))[0];
  let marginTop = getFloatValues(computedStyle.getPropertyValue('margin-top'))[0];
  let marginBottom = getFloatValues(computedStyle.getPropertyValue('margin-bottom'))[0];
  let contentHeight = height - paddingTop - paddingBottom - borderTop - borderBottom;

  const verticalFrames = [
    {
      value: marginTop,
      color: COLORS['size-frame-margin'],
      rect: Array(4).fill(0)
    },
    {
      value: borderTop,
      color: COLORS['size-frame-border'],
      rect: Array(4).fill(0)
    },
    {
      value: paddingTop,
      color: COLORS['size-frame-padding'],
      rect: Array(4).fill(0)
    },
    {
      value: contentHeight,
      color: COLORS['size-frame-content'],
      rect: Array(4).fill(0)
    },
    {
      value: paddingBottom,
      color: COLORS['size-frame-padding'],
      rect: Array(4).fill(0)
    },
    {
      value: borderBottom,
      color: COLORS['size-frame-border'],
      rect: Array(4).fill(0)
    },
    {
      value: marginBottom,
      color: COLORS['size-frame-margin'],
      rect: Array(4).fill(0)
    }
  ];

  verticalFrames.map((item) => item.value).reduce((prev, current, index) => {
    let currentWithZoom = Math.floor(current * zoomFractionValue);
    verticalFrames[index].rect = [0, prev, canvas.width, currentWithZoom];
    return Math.floor(prev + currentWithZoom);
  }, 
    canvasPosition[1] 
    - Math.floor(
      (marginTop + borderTop + paddingTop + (contentHeight * 0.5))
      * zoomFractionValue
    )
  );  

  verticalFrames.forEach((item) => {
    drawFrame(
      item.rect as [number, number, number, number], 
      item.color
    );
  });
}

/******************************************************************************
* Component
******************************************************************************/
function BackgroundCanvas({
  isGridOn=true,
  isRulerOn=true,
  isSizeFramesOn=true,
  zoomFraction='1.00',
  unit=UNIT,
}: {
  isGridOn?: boolean,
  isRulerOn?: boolean,
  isSizeFramesOn?: boolean,
  zoomFraction?: (typeof ZOOM_FRACTIONS)[number],
  unit?: number,
}): ReactElement | null {
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { 
    selectedElementDOMElement, 
    selectedElementPosition, 
    isPendingBackgroundRender, 
    setIsPendingBackgroundRender 
  } = useReactIsolatorContext();

  const resizeCanvas = () => {
    if (canvasRef.current === null || canvasWrapperRef.current === null) {
      return;
    }
    let canvasWrapper = canvasWrapperRef.current;
    let canvas = canvasRef.current;
    canvas.width = canvasWrapper.offsetWidth;
    canvas.height = canvasWrapper.offsetHeight;
  }

  const draw = () => {
    if (canvasRef.current === null) {
      return;
    }
    let canvas = canvasRef.current;
    let zoomFractionValue = Number(zoomFraction);

    // Drawn background elements
    {
      if (isGridOn) {
        // Draw thin grid
        drawGrid({ 
          canvas, 
          color: `${COLORS['gray-400']}BB`,
          unit: unit, 
          zoomFractionValue 
        });
        // Draw thick grid
        drawGrid({ 
          canvas, 
          color: COLORS['gray-400'], 
          unit: Math.floor(unit ** 2), 
          zoomFractionValue 
        });
      }

      // Draw frame
      if (isRulerOn) {
        drawFrameRulers({ 
          canvas, 
          color: COLORS['primary-900'], 
          constrastColor: COLORS['gray-100'], 
          unit: Math.floor(unit ** 2), 
          zoomFractionValue,
          selectedElementDOMElement,
          selectedElementPosition,
        });
      }

      if (isSizeFramesOn) {
        // Draw Size rules
        drawSizeFrames({
          canvas,
          selectedElementDOMElement,
          selectedElementPosition,
          zoomFractionValue
        });
      }
    }
  };

  // To avoid rendering too many times per second
  var lastRender: null | NodeJS.Timeout = null;
  const render = () => {
    if (lastRender === null) {
      resizeCanvas();
      draw();
      lastRender = setTimeout(() => {
        lastRender = null;
      }, 30);  
    }
  }

  // Translate from React strate to vanilla JS calls
  useLayoutEffect(() => {
    render();
    setIsPendingBackgroundRender(false);
  }, [
    isPendingBackgroundRender,
    isGridOn,
    isRulerOn,
    isSizeFramesOn,
    canvasRef.current, 
    canvasWrapperRef.current,
    selectedElementDOMElement,
    selectedElementPosition,
    zoomFraction,
  ]);

  // Set listener to render if size of window changes
  useEffect(() => {
    window.onresize = () => {
      setIsPendingBackgroundRender(true);
    };
  }, []);

  // Set listener to render if size of the selected element changes
  useEffect(()=> {
    if (selectedElementDOMElement === null)
      return;

    const resizeObserver = new ResizeObserver(() => {
      console.log('SIZE CHANGED');
      setIsPendingBackgroundRender(true);
    });
    resizeObserver.observe(selectedElementDOMElement);

    return () => {
      resizeObserver.unobserve(selectedElementDOMElement);
    }

  }, [selectedElementDOMElement])

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        cursor: 'crosshair'
      }}
      ref={canvasWrapperRef}
    >
      <canvas
        ref={canvasRef}
      />
    </div>
  );  
}

export default BackgroundCanvas;