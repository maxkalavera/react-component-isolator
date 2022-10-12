import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';

import { useReactIsolatorContext } from 'src/providers/ReactIsolatorContext';
import { BACKGROUND_CANVAS_FRAME_WIDTH, ZOOM_FRACTIONS } from 'src/utils/constants';
import styles from 'src/styles/grid-area.module.css';

function GridArea ({
  mousePosition,
  setMousePosition,
  zoomFraction,
  isRulerOn=true,
}: {
  mousePosition: [number, number]
  setMousePosition: React.Dispatch<React.SetStateAction<[number, number]>>
  zoomFraction: (typeof ZOOM_FRACTIONS)[number]
  isRulerOn?: boolean,
}) {
  const { 
    selectedElement, 
    setSelectedElementPosition, 
    selectedElementPosition, 
    setSelectedElementDOMElement 
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
      selectedElementPosition[0] + deltaMousePosition[0],
      selectedElementPosition[1] + deltaMousePosition[1]
    ];

    if ( position[0] > 0
      && position[0] < containerBounds.width
      && position[1] > 0
      && position[1] < containerBounds.height
    ) {
      setSelectedElementPosition([position[0], position[1]]);
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
    setSelectedElementPosition([
      Math.floor(containerBounds.width * 0.5) - BACKGROUND_CANVAS_FRAME_WIDTH,
      Math.floor(containerBounds.height * 0.5) - BACKGROUND_CANVAS_FRAME_WIDTH
    ]);
  }

  useEffect(() => {
    if (selectedElementPosition === null) {
      centerItem();
    }
  }, [selectedElementPosition, container.current]);

  // Update selected bounding rect
  useEffect(() => {
    if (selectedParentWrapper.current === null) {
      return;
    }

    setSelectedElementDOMElement(selectedParentWrapper.current.firstChild as HTMLElement);

  }, [selectedElement, selectedParentWrapper.current]);

  return (
    <div
    style={{
      position: 'absolute',
      left: BACKGROUND_CANVAS_FRAME_WIDTH,
      top: BACKGROUND_CANVAS_FRAME_WIDTH,
      width: `calc(100% - ${BACKGROUND_CANVAS_FRAME_WIDTH}px)`,
      height: `calc(100% - ${BACKGROUND_CANVAS_FRAME_WIDTH}px)`,
      overflow: isRulerOn ? 'hidden' : 'visible',
    }}
    className={styles['grid-area']}
    onMouseMove={isGrabbed ? onMouseMove : undefined}
    ref={container}
  >
    { selectedElement !== null && selectedElementPosition !== null ? 
      <div
        className={`${styles['grid-area__item']} ${isGrabbed ? styles['grid-area__item--grabbed'] : ''}`}
        onMouseDown={onItemSelected}
        style={{
          position: 'absolute',
          left: selectedElementPosition[0],
          top:  selectedElementPosition[1],
          transform: `scale(${zoomFraction}) translate(-50%, -50%)`
        }}
      >
        <div 
          className={styles['grid-area__item-content']}
          onMouseDown={(event) => event.stopPropagation()}
          ref={selectedParentWrapper}
        >
          
          {selectedElement.jsxElement}
        </div>
      </div> : null
    }
  </div>
  );
}

export default GridArea;