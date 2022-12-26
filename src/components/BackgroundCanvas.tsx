import React, { 
  ReactElement, 
  useEffect, 
  useRef,
  useState, 
  useCallback
} from "react";

import { getFloatValues } from 'src/utils/string';
import { useReactIsolatorContext } from 'src/providers/ReactIsolatorContext';

import {
  BACKGROUND_CANVAS_LINE_WIDTH,
  BACKGROUND_CANVAS_THIN_LINE_WIDTH,
  BACKGROUND_CANVAS_FRAME_WIDTH,
  COLORS,
  SELECTED_ELEMENT_WRAPPER_ID,
  SIZE_VALUES_DEFAULT,
} from 'src/utils/constants';

import type { SizeValues } from 'src/interfaces/BackgroundCanvas.interfaces';

const UNIT = 10;

function drawGrid({
  canvas,
  color=COLORS['gray-400'],
  lineWidth=BACKGROUND_CANVAS_THIN_LINE_WIDTH,
  frameWidth=BACKGROUND_CANVAS_FRAME_WIDTH,
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

  let initialLinePosition = Math.floor(frameWidth / step) * - step;
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
  canvas: HTMLCanvasElement
  color?: string
  constrastColor?: string
  lineWidth?: number
  frameWidth?: number
  unit?: number
  step?: number
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
  selectedElementPosition=null,
  zoomFractionValue=1.0,
  sizeValues=SIZE_VALUES_DEFAULT,
}: {
  canvas: HTMLCanvasElement,
  lineWidth?: number,
  frameWidth?: number,
  selectedElementPosition?: { x: number, y: number } | null,
  zoomFractionValue?: number,
  sizeValues?: SizeValues,
}) {
  let context = canvas.getContext("2d");
  if ( 
    context === null
    || selectedElementPosition === null
  ) {
    return;
  }
  const canvasPosition = [selectedElementPosition.x + frameWidth,  selectedElementPosition.y + frameWidth];

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

  const drawFrame = (  // Width, border, padding and margin rules
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
  
  const contentWidth = (
    sizeValues.width 
    - sizeValues.paddingLeft 
    - sizeValues.paddingRight 
    - sizeValues.borderLeft 
    - sizeValues.borderRight
  );
  const horizontalFrames = [
    {
      value: sizeValues.marginLeft,
      color: COLORS['size-frame-margin'],
      rect: Array(4).fill(0)
    },
    {
      value: sizeValues.borderLeft,
      color: COLORS['size-frame-border'],
      rect: Array(4).fill(0)
    },
    {
      value: sizeValues.paddingLeft,
      color: COLORS['size-frame-padding'],
      rect: Array(4).fill(0)
    },
    {
      value: contentWidth,
      color: COLORS['size-frame-content'],
      rect: Array(4).fill(0)
    },
    {
      value: sizeValues.paddingRight,
      color: COLORS['size-frame-padding'],
      rect: Array(4).fill(0)
    },
    {
      value: sizeValues.borderRight,
      color: COLORS['size-frame-border'],
      rect: Array(4).fill(0)
    },
    {
      value: sizeValues.marginRight,
      color: COLORS['size-frame-margin'],
      rect: Array(4).fill(0)
    }
  ];

  horizontalFrames.map((item) => item.value).reduce((prev, current, index) => {
    // Order of code matters in this function
    let currentWithZoom = Math.floor(current * zoomFractionValue);
    horizontalFrames[index].rect = [prev, 0, currentWithZoom, canvas.height];
    return Math.floor(prev + currentWithZoom);
  }, 
    canvasPosition[0]
    - Math.floor(
      (sizeValues.marginLeft + sizeValues.borderLeft + sizeValues.paddingLeft + (contentWidth * 0.5)) 
      * zoomFractionValue
    )
  );  

  horizontalFrames.forEach((item) => {
    drawFrame(
      item.rect as [number, number, number, number], 
      item.color
    );
  });

  let contentHeight = (
    sizeValues.height 
    - sizeValues.paddingTop 
    - sizeValues.paddingBottom 
    - sizeValues.borderTop 
    - sizeValues.borderBottom
  );
  const verticalFrames = [
    {
      value: sizeValues.marginTop,
      color: COLORS['size-frame-margin'],
      rect: Array(4).fill(0)
    },
    {
      value: sizeValues.borderTop,
      color: COLORS['size-frame-border'],
      rect: Array(4).fill(0)
    },
    {
      value: sizeValues.paddingTop,
      color: COLORS['size-frame-padding'],
      rect: Array(4).fill(0)
    },
    {
      value: contentHeight,
      color: COLORS['size-frame-content'],
      rect: Array(4).fill(0)
    },
    {
      value: sizeValues.paddingBottom,
      color: COLORS['size-frame-padding'],
      rect: Array(4).fill(0)
    },
    {
      value: sizeValues.borderBottom,
      color: COLORS['size-frame-border'],
      rect: Array(4).fill(0)
    },
    {
      value: sizeValues.marginBottom,
      color: COLORS['size-frame-margin'],
      rect: Array(4).fill(0)
    }
  ];

  verticalFrames.map((item) => item.value).reduce((prev, current, index) => {
    // Order of code matters in this function
    let currentWithZoom = Math.floor(current * zoomFractionValue);
    verticalFrames[index].rect = [0, prev, canvas.width, currentWithZoom];
    return Math.floor(prev + currentWithZoom);
  }, 
    canvasPosition[1] 
    - Math.floor(
      (sizeValues.marginTop + sizeValues.borderTop + sizeValues.paddingTop + (contentHeight * 0.5))
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
  const canvasGridRef = useRef<HTMLCanvasElement>(null);
  const canvasFrameRulersRef = useRef<HTMLCanvasElement>(null);
  const canvasSizeFramesRef = useRef<HTMLCanvasElement>(null);
  const [count, setCount] = useState<number>(0);
  const [sizeValues, setSizeValues] = useState<SizeValues>();
  const [[canvasWidth, canvasHeight], setCanvasSize] = useState<[number, number]>([0, 0]);
  const {
    selectedElementPosition, 
    isPendingBackgroundRender,
    isGridOn,
    isFrameRulersOn,
    zoomFraction,
    isSizeFramesOn,
    dispatch,
  } = useReactIsolatorContext();

  const monitorSizeValues = useCallback(() => {
    const wrapper = document.getElementById(SELECTED_ELEMENT_WRAPPER_ID);
    if (wrapper === null || wrapper.firstChild === null)
      return;

    const computedStyle = window.getComputedStyle(wrapper.firstChild as Element, null);

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
  }, []);

  useEffect(() => {
    const timeoutRef = setInterval(monitorSizeValues, 1000 / 12);
    return () => clearInterval(timeoutRef);
  }, []);

  const renderGrid = () => {
    if (canvasRef.current === null)
      return;

    const canvas = canvasRef.current;
    const zoomFractionValue = Number(zoomFraction);
    const step = Math.floor(zoomFractionValue * UNIT);
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
  };

  const renderFrameRulers = () => {
    if (isFrameRulersOn === false || canvasFrameRulersRef.current === null)
      return;

    const canvas = canvasFrameRulersRef.current;
    const zoomFractionValue = Number(zoomFraction);
    const step = Math.floor(zoomFractionValue * UNIT);
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    drawFrameRulers({ 
      canvas, 
      color: COLORS['primary-900'], 
      constrastColor: COLORS['gray-100'],
      unit: Math.floor(UNIT ** 2),
      step: Math.floor(step * UNIT)
    });
  };

  useEffect(() => {
    if (isFrameRulersOn) {
      renderFrameRulers();
    }
  }, [
    isFrameRulersOn,
    zoomFraction,
    canvasWidth,
    canvasHeight,
  ])

  const renderSizeFrames = () => {
    if (isSizeFramesOn === false || canvasSizeFramesRef.current === null)
      return;

    const canvas = canvasSizeFramesRef.current;
    const zoomFractionValue = Number(zoomFraction);
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    drawSizeFrames({
      canvas,
      selectedElementPosition,
      zoomFractionValue,
      sizeValues,
    });
  };

  useEffect(() => {
    if (isSizeFramesOn) {
      monitorSizeValues();
      renderSizeFrames();
    }
  }, [selectedElementPosition?.x, selectedElementPosition?.y, isSizeFramesOn]);

  useEffect(() => {
    renderSizeFrames();
  }, [
    zoomFraction,
    isSizeFramesOn,
    canvasWidth,
    canvasHeight,
    selectedElementPosition?.x, 
    selectedElementPosition?.y,
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

  const resizeCanvas = () => {
    if (canvasWrapperRef.current === null) return;
    setCanvasSize([canvasWrapperRef.current.offsetWidth, canvasWrapperRef.current.offsetHeight]);
  };

  useEffect(() => {
    window.onresize = () => {
      resizeCanvas();
    };
    resizeCanvas();
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
      ref={canvasWrapperRef}
    >
      <canvas 
        width="100" height="100"
        style={{position: 'absolute', left: 0, top: 0, zIndex: 0}}
        ref={canvasGridRef}
      ></canvas>
      <canvas 
        width="100" height="100"
        style={{position: 'absolute', left: 0, top: 0, zIndex: 1}}
        ref={canvasFrameRulersRef}
      ></canvas>
      <canvas 
        width="100" height="100"
        style={{position: 'absolute', left: 0, top: 0, zIndex: 2}}
        ref={canvasSizeFramesRef}
      ></canvas>

    </div>
  );  
}

export default BackgroundCanvas;