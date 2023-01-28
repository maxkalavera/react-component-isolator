import React, { 
  ReactElement, 
  useEffect, 
  useRef,
  useState, 
  useCallback
} from "react";

import { getFloatValues } from 'src/utils/string';
import { useReactIsolatorContext } from 'src/providers/ReactIsolatorContext';
import { SELECTED_ELEMENT_WRAPPER_ID, SIZE_VALUES_DEFAULT} from 'src/utils/constants';
import useComputedStyle from "src/hooks/useComputedStyle";
import { BACKGROUND_CANVAS_GRID_STEP_UNIT } from "src/utils/constants";

import type { SizeValues } from 'src/components/BackgroundCanvas.d';

function drawGrid({
  canvas,
  color,
  lineWidth,
  frameWidth,
  step=BACKGROUND_CANVAS_GRID_STEP_UNIT,
}: {
  canvas: HTMLCanvasElement,
  color: string,
  lineWidth: number,
  frameWidth: number,
  unit?: number,
  step?: number,
}) {
  const context = canvas.getContext("2d");
  if (context === null) {
    return;
  }

  const initialLinePosition = Math.floor(frameWidth / step) * - step;
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
  computedStyle,
  unit,
  step,
}: {
  canvas: HTMLCanvasElement
  computedStyle: CSSStyleDeclaration,
  unit: number
  step: number
}) {
  const context = canvas.getContext("2d");
  if (context === null) {
    return;
  }

  const frameWidth = parseInt(computedStyle.getPropertyValue('--background-canvas-frame-ruler-width'));
  const lineWidth = parseInt(computedStyle.getPropertyValue('--background-canvas-frame-ruler-line-width'));
  const halfframeWidthWidth = Math.floor(frameWidth * 0.5);

  context.beginPath();
  context.save();
  context.lineWidth = frameWidth;
  context.strokeStyle = computedStyle.getPropertyValue('--background-canvas-frame-ruler');
  context.shadowBlur = 10;
  context.shadowColor = computedStyle.getPropertyValue('--gray-900');

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
  context.strokeStyle = computedStyle.getPropertyValue('--background-canvas-frame-contrast');

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

  context.stroke();
  context.restore();

  // Corner lines
  context.beginPath();
  context.save();
  context.lineWidth = 1;
  context.strokeStyle = computedStyle.getPropertyValue('--background-canvas-frame-contrast');

  context.moveTo(0, frameWidth);
  context.lineTo(frameWidth, frameWidth);
  context.moveTo(frameWidth, 0);
  context.lineTo(frameWidth, frameWidth);

  context.stroke();
  context.restore();

  // Measure lines and text
  context.beginPath();
  context.textAlign = 'center';
  context.font = '10px Roboto';
  context.textBaseline = 'middle';
  context.fillStyle = computedStyle.getPropertyValue('--background-canvas-frame-contrast');
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
  computedStyle,
  selectedItemPosition=null,
  zoomFractionValue=1.0,
  sizeValues=SIZE_VALUES_DEFAULT,
}: {
  canvas: HTMLCanvasElement,
  computedStyle: CSSStyleDeclaration,
  selectedItemPosition?: { x: number, y: number } | null,
  zoomFractionValue?: number,
  sizeValues?: SizeValues,
}) {
  const context = canvas.getContext("2d");
  if ( 
    context === null
    || selectedItemPosition === null
  ) {
    return;
  }
  const lineWidth = parseInt(computedStyle.getPropertyValue('--background-canvas-size-frames-line-width'));
  const frameWidth = parseInt(computedStyle.getPropertyValue('--background-canvas-frame-ruler-width'));
  const canvasPosition = [selectedItemPosition.x + frameWidth,  selectedItemPosition.y + frameWidth];

  context.beginPath();
  context.save();
  context.lineWidth = Math.floor(lineWidth * zoomFractionValue);
  context.strokeStyle = computedStyle.getPropertyValue('--background-canvas-size-frame-position-line');

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
      color: computedStyle.getPropertyValue('--background-canvas-size-frame-margin'),
      rect: Array(4).fill(0)
    },
    {
      value: sizeValues.borderLeft,
      color: computedStyle.getPropertyValue('--background-canvas-size-frame-border'),
      rect: Array(4).fill(0)
    },
    {
      value: sizeValues.paddingLeft,
      color: computedStyle.getPropertyValue('--background-canvas-size-frame-padding'),
      rect: Array(4).fill(0)
    },
    {
      value: contentWidth,
      color: computedStyle.getPropertyValue('--background-canvas-size-frame-content'),
      rect: Array(4).fill(0)
    },
    {
      value: sizeValues.paddingRight,
      color: computedStyle.getPropertyValue('--background-canvas-size-frame-padding'),
      rect: Array(4).fill(0)
    },
    {
      value: sizeValues.borderRight,
      color: computedStyle.getPropertyValue('--background-canvas-size-frame-border'),
      rect: Array(4).fill(0)
    },
    {
      value: sizeValues.marginRight,
      color: computedStyle.getPropertyValue('--background-canvas-size-frame-margin'),
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
      color: computedStyle.getPropertyValue('--background-canvas-size-frame-margin'),
      rect: Array(4).fill(0)
    },
    {
      value: sizeValues.borderTop,
      color: computedStyle.getPropertyValue('--background-canvas-size-frame-border'),
      rect: Array(4).fill(0)
    },
    {
      value: sizeValues.paddingTop,
      color: computedStyle.getPropertyValue('--background-canvas-size-frame-padding'),
      rect: Array(4).fill(0)
    },
    {
      value: contentHeight,
      color: computedStyle.getPropertyValue('--background-canvas-size-frame-content'),
      rect: Array(4).fill(0)
    },
    {
      value: sizeValues.paddingBottom,
      color: computedStyle.getPropertyValue('--background-canvas-size-frame-padding'),
      rect: Array(4).fill(0)
    },
    {
      value: sizeValues.borderBottom,
      color: computedStyle.getPropertyValue('--background-canvas-size-frame-border'),
      rect: Array(4).fill(0)
    },
    {
      value: sizeValues.marginBottom,
      color: computedStyle.getPropertyValue('--background-canvas-size-frame-margin'),
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
function BackgroundCanvas(): ReactElement | null {
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasGridRef = useRef<HTMLCanvasElement>(null);
  const canvasFrameRulersRef = useRef<HTMLCanvasElement>(null);
  const canvasSizeFramesRef = useRef<HTMLCanvasElement>(null);
  const [sizeValues, setSizeValues] = useState<SizeValues>();
  const {
    selectedItemPosition,
    selectedItemIndex,
    isGridOn,
    isFrameRulersOn,
    zoomFraction,
    isSizeFramesOn,
    canvasSize,
    dividerWidth,
    dispatch,
  } = useReactIsolatorContext();
  const computedStyle = useComputedStyle();

  const clearCanvas = (canvas: HTMLCanvasElement) => {
    let context = canvas.getContext("2d");
    if (context === null) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const renderGrid = () => {
    if (canvasGridRef.current === null || computedStyle === undefined)
      return;

    clearCanvas(canvasGridRef.current);
    if (isGridOn === false)
      return;

    const canvas = canvasGridRef.current;
    const zoomFractionValue = Number(zoomFraction);
    const step = Math.floor(zoomFractionValue * BACKGROUND_CANVAS_GRID_STEP_UNIT);
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
    // Draw thin grid
    drawGrid({ 
      canvas,
      color: computedStyle.getPropertyValue('--background-canvas-grid-thin-lines'),
      lineWidth: parseInt(computedStyle.getPropertyValue('--background-canvas-thin-lines-width')),
      frameWidth: parseInt(computedStyle.getPropertyValue('--background-canvas-frame-ruler-width')),
      unit: BACKGROUND_CANVAS_GRID_STEP_UNIT,
      step
    });
    // Draw thick grid
    drawGrid({ 
      canvas, 
      color: computedStyle.getPropertyValue('--background-canvas-grid-thick-lines'),
      lineWidth: parseInt(computedStyle.getPropertyValue('--background-canvas-thick-lines-width')),
      frameWidth: parseInt(computedStyle.getPropertyValue('--background-canvas-frame-ruler-width')),
      unit: Math.floor(BACKGROUND_CANVAS_GRID_STEP_UNIT ** 2),
      step: Math.floor(step * BACKGROUND_CANVAS_GRID_STEP_UNIT)
    });
  };

  useEffect(() => {
    renderGrid();
  }, [
    isGridOn,
    zoomFraction,
    canvasSize.width,
    canvasSize.height,
    computedStyle,
  ]);

  const renderFrameRulers = () => {
    if (canvasFrameRulersRef.current === null || computedStyle === undefined)
      return;

    clearCanvas(canvasFrameRulersRef.current);
    if(isFrameRulersOn === false)
      return;

    const canvas = canvasFrameRulersRef.current;
    const zoomFractionValue = Number(zoomFraction);
    const step = Math.floor(zoomFractionValue * BACKGROUND_CANVAS_GRID_STEP_UNIT);
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
    drawFrameRulers({ 
      canvas, 
      computedStyle,
      unit: Math.floor(BACKGROUND_CANVAS_GRID_STEP_UNIT ** 2),
      step: Math.floor(step * BACKGROUND_CANVAS_GRID_STEP_UNIT)
    });
  };

  useEffect(() => {
    renderFrameRulers();
  }, [
    isFrameRulersOn,
    zoomFraction,
    canvasSize.width,
    canvasSize.height,
    computedStyle,
  ]);

  const renderSizeFrames = () => {
    if (canvasSizeFramesRef.current === null || computedStyle === undefined)
      return;

    clearCanvas(canvasSizeFramesRef.current);
    if(isSizeFramesOn === false)
      return;

    const canvas = canvasSizeFramesRef.current;
    const zoomFractionValue = Number(zoomFraction);
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
    drawSizeFrames({
      canvas,
      computedStyle,
      selectedItemPosition,
      zoomFractionValue,
      sizeValues,
    });
  };

  useEffect(() => {
    if (selectedItemIndex === -1 || computedStyle === undefined) return;
    monitorSizeValues();
    renderSizeFrames();
  }, [
    selectedItemPosition?.x, 
    selectedItemPosition?.y, 
    isSizeFramesOn, 
    selectedItemIndex,
    computedStyle
  ]);

  useEffect(() => {
    if (selectedItemIndex === -1 || computedStyle === undefined) return;
    renderSizeFrames();
  }, [
    zoomFraction,
    isSizeFramesOn,
    canvasSize.width,
    canvasSize.height,
    selectedItemPosition?.x, 
    selectedItemPosition?.y,
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
    selectedItemIndex,
    computedStyle,
  ]);

  const resizeCanvas = () => {
    if (canvasWrapperRef.current === null) return;
    dispatch({ 
      type: 'SET_CANVAS_SIZE', 
      payload: {
        width: canvasWrapperRef.current.offsetWidth, 
        height: canvasWrapperRef.current.offsetHeight
      }
    });
  };

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
    if (selectedItemIndex === -1) return;
    const timeoutRef = setInterval(monitorSizeValues, 1000 / 12);
    return () => clearInterval(timeoutRef);
  }, [selectedItemIndex]);

  useEffect(() => {
    addEventListener("resize", () => {
      resizeCanvas();
    });
  }, []);

  useEffect(() => {
    resizeCanvas();
  }, [dividerWidth]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
      data-testid='background-canvas-wrapper'
      ref={canvasWrapperRef}
    >
      <canvas 
        width="100" height="100"
        style={{position: 'absolute', left: 0, top: 0, zIndex: 0}}
        data-testid='background-grid-canvas'
        ref={canvasGridRef}
      ></canvas>
      <canvas 
        width="100" height="100"
        style={{position: 'absolute', left: 0, top: 0, zIndex: 1}}
        data-testid='background-frame-rulers-canvas'
        ref={canvasFrameRulersRef}
      ></canvas>
      <canvas 
        width="100" height="100"
        style={{position: 'absolute', left: 0, top: 0, zIndex: 2}}
        data-testid='background-size-frames-canvas'
        ref={canvasSizeFramesRef}
      ></canvas>

    </div>
  );  
}

export default BackgroundCanvas;