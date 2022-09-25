import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';

import BackgroundGrid from 'src/components/BackgroundCanvasGrid';
import { ZOOM_FRACTIONS, BACKGROUND_CANVAS_FRAME_WIDTH } from 'src/utils/constants';
import Grid from 'src/components/icons/Grid';
import SwitchButton from 'src/components/SwitchButton';
import ZoomSelect from 'src/components/ZoomSelect';
import ZoomBar from 'src/components/ZoomBar';
import { useReactIsolatorContext } from 'src/providers/ReactIsolatorContext';
import styles from 'src/styles/visualizer.module.css';

function Visualizer() {
  const { selected, setSelectedPosition, selectedPosition } = useReactIsolatorContext();
  const [isGridOn, setIsGridOn] = useState<boolean>(true);
  // const [mousePosition, setMousePosition] = useState<[number, number]>([0, 0]);
  /*const [{positionX, positionY, mousePositionX, mousePositionY}, setPosition] = useState<Position>({ 
    positionX: 0, positionY: 0, 
    mousePositionX: 0, mousePositionY: 0
  });*/ 
  const [isGrabbed, setIsGrabbed] = useState<boolean>(false);
  const [zoomFraction, setZoomFraction] = useState<(typeof ZOOM_FRACTIONS)[number]>('1.00');
  const itemElement = useRef<HTMLDivElement>(null);  // TODO: Remove
  const container = useRef<HTMLDivElement>(null);

  const onMouseMove: MouseEventHandler<HTMLElement> = (event) => {
    if (container.current === null) {
      return;
    }

    let containerBounds = container.current.getBoundingClientRect();
    let currentMousePosition = [
      event.clientX - (containerBounds.x + BACKGROUND_CANVAS_FRAME_WIDTH), 
      event.clientY - (containerBounds.y + BACKGROUND_CANVAS_FRAME_WIDTH)
    ];

    if ( currentMousePosition[0] > 0
      && currentMousePosition[0] < containerBounds.width
      && currentMousePosition[1] > 0
      && currentMousePosition[1] < containerBounds.height
    ) {
      console.log('currentMousePosition', currentMousePosition)
      setSelectedPosition([currentMousePosition[0], currentMousePosition[1]]);
    }
  }

  const onItemSelected: MouseEventHandler<HTMLElement> = (event) => {
    if (container.current === null)
      return;

    window.onmouseup = onItemSelectedRelease;
    setIsGrabbed(true);
  }

  const onItemSelectedRelease = () => {
    window.onmouseup = null;
    setIsGrabbed(false);
  }

  const onZoomFractionChange = (value: (typeof ZOOM_FRACTIONS)[number]) => {
    setZoomFraction(value);
  }

  const centerItem = () => {
    if (container.current === null)
      return;

    let containerBounds = container.current.getBoundingClientRect();
    setSelectedPosition([
      Math.floor(containerBounds.width * 0.5) - BACKGROUND_CANVAS_FRAME_WIDTH,
      Math.floor(containerBounds.height * 0.5) - BACKGROUND_CANVAS_FRAME_WIDTH
    ]);
  }

  useEffect(() => {
    if (selectedPosition === null) {
      centerItem();
    }
  }, [selectedPosition, container.current]);

  return (
    <div className={styles.visualizer}>
      <div className={styles.visualizer__header}>
        <SwitchButton
          value={isGridOn}
          onChange={() => { setIsGridOn((prevState) => !prevState) }}
        >
          <Grid 
            width={18}
            height={18}
          />
        </SwitchButton>

        <ZoomSelect 
          value={zoomFraction}
          onChange={setZoomFraction}
        />
      </div>
      <div 
        style={{
          position: 'relative',
          overflow: 'clip'
        }}
        className={styles.visualizer__content}
        onMouseMove={isGrabbed ? onMouseMove : undefined}
        ref={container}
      >
        <BackgroundGrid
          isGridOn={isGridOn}
          zoomFraction={Number(zoomFraction)}
        />

        <ZoomBar 
          value={zoomFraction}
          onChange={onZoomFractionChange}
          style={{
            position: 'absolute',
            left: BACKGROUND_CANVAS_FRAME_WIDTH + 12,
            top: BACKGROUND_CANVAS_FRAME_WIDTH + 12
          }}
        />  

        { selected !== null && selectedPosition !== null ? 
          <div
            className={`${styles.visualizer__item} ${isGrabbed ? styles['visualizer__item--grabbed'] : ''}`}
            onMouseDown={onItemSelected}
            ref={itemElement}
            style={{
              position: 'absolute',
              left: BACKGROUND_CANVAS_FRAME_WIDTH + selectedPosition[0],
              top: BACKGROUND_CANVAS_FRAME_WIDTH + selectedPosition[1],
              transform: `scale(${zoomFraction}) translate(-50%, -50%)`
            }}
          >
            <div 
              className={styles['visualizer__item-content']}
              onMouseDown={(event) => event.stopPropagation()}
            >
              
              {selected.element}
            </div>
          </div> : null
        }

      </div>
    </div>
  );
}

export default Visualizer;