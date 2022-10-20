import React, { 
  ReactElement, 
  useEffect, 
  useRef, 
  useLayoutEffect,  
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

import type { SizeValues } from 'src/interfaces/BackgroundCanvas.interfaces';

const UNIT = 10;

function drawGrid({
  canvas,
  color=COLORS['gray-400'],
  lineWidth=BACKGROUND_CANVAS_THIN_LINE_WIDTH,
  frameWidth=BACKGROUND_CANVAS_FRAME_WIDTH,
  unit=UNIT,
  step=UNIT,
}: {
  canvas: HTMLCanvasElement,
  color?: string,
  lineWidth?: number,
  frameWidth?: number,
  unit?: number,
  step?: number,
}) {
  let context = canvas.getContext("2d");
  if (context === null) {
    return;
  }

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
  lineWidth=BACKGROUND_CANVAS_THIN_LINE_WIDTH,
  frameWidth=BACKGROUND_CANVAS_FRAME_WIDTH,
  unit=Math.floor(UNIT) ** 2,
  step=Math.floor(UNIT) ** 2,
}: {
  canvas: HTMLCanvasElement,
  color?: string,
  constrastColor?: string,
  lineWidth?: number,
  frameWidth?: number,
  unit?: number,
  step?: number,
  selectedElementDOMElement?: HTMLElement | null,
  selectedElementPosition?: [number, number] | null,
}) {
  let context = canvas.getContext("2d");
  if (context === null) {
    return;
  }

  let halfframeWidthWidth = Math.floor(frameWidth * 0.5);

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
  unit=UNIT,
}: {
  unit?: number,
}): ReactElement | null {
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeoutRef = useRef<NodeJS.Timer | null>(null);
  const [sizeValues, setSizeValues] = useState<SizeValues>();
  const { 
    selectedElementDOMElement, 
    selectedElementPosition, 
    isPendingBackgroundRender,
    isGridOn,
    isRulerOn,
    zoomFraction,
    isSizeFramesOn,
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
    let step = Math.floor(zoomFractionValue * UNIT);

    // Drawn background elements
    {
      if (isGridOn) {
        // Draw thin grid
        drawGrid({ 
          canvas, 
          color: `${COLORS['gray-400']}BB`,
          unit: UNIT,
          step
        });
        // Draw thick grid
        drawGrid({ 
          canvas, 
          color: COLORS['gray-400'],
          unit: Math.floor(UNIT ** 2),
          step: Math.floor(step * UNIT)
        });
      }

      // Draw frame
      if (isRulerOn) {
        drawFrameRulers({ 
          canvas, 
          color: COLORS['primary-900'], 
          constrastColor: COLORS['gray-100'],
          unit: Math.floor(UNIT ** 2),
          step: Math.floor(step * UNIT),
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
  const render = () => {
    if (timeoutRef.current === null) {
      resizeCanvas();
      draw();
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
      }, 30);  
    }
  };

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
    sizeValues?.width,
    sizeValues?.paddingLeft,
    sizeValues?.paddingRight,
    sizeValues?.borderLeft,
    sizeValues?.borderRight,
    sizeValues?.marginLeft,
    sizeValues?.marginRight,
    sizeValues?.height,
    sizeValues?.paddingTop,
    sizeValues?.paddingBottom,
    sizeValues?.borderTop,
    sizeValues?.borderBottom,
    sizeValues?.marginTop,
    sizeValues?.marginBottom,
  ]);

  // Set listener to render if size of window changes
  useEffect(() => {
    window.onresize = () => {
      setIsPendingBackgroundRender(true);
    };
  }, []);

  useEffect(() => {
    if (selectedElementDOMElement === null)
      return;

    const computedStyle = window.getComputedStyle(selectedElementDOMElement, null);

    const timeoutRef = setInterval(() => {
      const comparisonSizeValues: SizeValues = {
        width: getFloatValues(computedStyle.getPropertyValue('width'))[0],
        paddingLeft: getFloatValues(computedStyle.getPropertyValue('padding-left'))[0],
        paddingRight: getFloatValues(computedStyle.getPropertyValue('padding-right'))[0],
        borderLeft: getFloatValues(computedStyle.getPropertyValue('border-left'))[0],
        borderRight: getFloatValues(computedStyle.getPropertyValue('border-right'))[0],
        marginLeft: getFloatValues(computedStyle.getPropertyValue('margin-left'))[0],
        marginRight: getFloatValues(computedStyle.getPropertyValue('margin-right'))[0],
        height: getFloatValues(computedStyle.getPropertyValue('height'))[0],
        paddingTop: getFloatValues(computedStyle.getPropertyValue('padding-top'))[0],
        paddingBottom: getFloatValues(computedStyle.getPropertyValue('padding-bottom'))[0],
        borderTop: getFloatValues(computedStyle.getPropertyValue('border-top'))[0],
        borderBottom: getFloatValues(computedStyle.getPropertyValue('border-bottom'))[0],
        marginTop: getFloatValues(computedStyle.getPropertyValue('margin-top'))[0],
        marginBottom: getFloatValues(computedStyle.getPropertyValue('margin-bottom'))[0],
      };

      setSizeValues((prevState) => (
        (JSON.stringify(prevState) === JSON.stringify(comparisonSizeValues)) 
        ? prevState
        : comparisonSizeValues
      ));
    }, 1000 / 24);

    return () => clearInterval(timeoutRef);
  }, [selectedElementDOMElement]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
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