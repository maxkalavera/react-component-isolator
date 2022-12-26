import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';

import { useReactIsolatorContext } from 'src/providers/ReactIsolatorContext';
import { BACKGROUND_CANVAS_FRAME_WIDTH, SELECTED_ELEMENT_WRAPPER_ID } from 'src/utils/constants';
import styles from 'src/styles/grid-area.module.css';

function GridArea ({
  mousePosition,
  setMousePosition,
}: {
  mousePosition: [number, number]
  setMousePosition: React.Dispatch<React.SetStateAction<[number, number]>>
}) {
  const { 
    selectedElementID,
    reactComponentElements,
    selectedElementPosition,
    zoomFraction,
    isFrameRulersOn,
    dispatch,
  } = useReactIsolatorContext();
  const [isGrabbed, setIsGrabbed] = useState<boolean>(false);
  const container = useRef<HTMLDivElement>(null);
  const selectedParentWrapper = useRef<HTMLDivElement>(null);

  const onMouseMove: MouseEventHandler<HTMLElement> = (event) => {
    if (container.current === null || selectedElementPosition == null) {
      return;
    }

    const containerBounds = container.current.getBoundingClientRect();
    const deltaMousePosition = [
      event.clientX - mousePosition[0], 
      event.clientY - mousePosition[1]
    ];
    const position = [
      selectedElementPosition.x + deltaMousePosition[0],
      selectedElementPosition.y + deltaMousePosition[1]
    ];

    if ( position[0] > 0
      && position[0] < containerBounds.width
      && position[1] > 0
      && position[1] < containerBounds.height
    ) {
      dispatch({ type: 'SET_SELECTED_ELEMENT_POSITION', payload: { x: position[0], y: position[1] }});
    }

    setMousePosition([event.clientX, event.clientY]);
  }

  const onItemSelected: MouseEventHandler<HTMLElement> = (event) => {
    if (container.current === null || selectedElementPosition === null) {
      return;
    }

    setMousePosition([event.clientX, event.clientY]);
    setIsGrabbed(true);
    window.onmouseup = onItemSelectedRelease;
  }

  const onItemSelectedRelease = () => {
    window.onmouseup = null;
    setIsGrabbed(false);
  }

  const centerItem = () => {
    if (container.current === null)
      return;

    let containerBounds = container.current.getBoundingClientRect();
    dispatch({ type: 'SET_SELECTED_ELEMENT_POSITION', payload: {
      x: Math.floor(containerBounds.width * 0.5) - BACKGROUND_CANVAS_FRAME_WIDTH,
      y: Math.floor(containerBounds.height * 0.5) - BACKGROUND_CANVAS_FRAME_WIDTH,
    }});
  }

  useEffect(() => {
    if (selectedElementPosition === null) {
      centerItem();
    }
  }, [selectedElementPosition, container.current]);

  return (
    <div
    style={{
      position: 'absolute',
      left: BACKGROUND_CANVAS_FRAME_WIDTH,
      top: BACKGROUND_CANVAS_FRAME_WIDTH,
      width: `calc(100% - ${BACKGROUND_CANVAS_FRAME_WIDTH}px)`,
      height: `calc(100% - ${BACKGROUND_CANVAS_FRAME_WIDTH}px)`,
      overflow: isFrameRulersOn ? 'hidden' : 'visible',
    }}
    className={styles['grid-area']}
    onMouseMove={isGrabbed ? onMouseMove : undefined}
    ref={container}
  >
    { selectedElementID && selectedElementPosition !== null ? 
      <div
        className={`${styles['grid-area__item']} ${isGrabbed ? styles['grid-area__item--grabbed'] : ''}`}
        onMouseDown={onItemSelected}
        style={{
          position: 'absolute',
          left: selectedElementPosition.x,
          top:  selectedElementPosition.y,
          transform: `scale(${zoomFraction}) translate(-50%, -50%)`
        }}
      >
        <div 
          className={styles['grid-area__item-content']}
          onMouseDown={(event) => event.stopPropagation()}
          id={SELECTED_ELEMENT_WRAPPER_ID}
          ref={selectedParentWrapper}
        >
          
          {(reactComponentElements.find((item) => item.id === selectedElementID))?.jsxElement}
        </div>
      </div> : null
    }
  </div>
  );
}

export default GridArea;