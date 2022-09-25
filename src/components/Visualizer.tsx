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
  const [isGrabbed, setIsGrabbed] = useState<boolean>(false);
  const [zoomFraction, setZoomFraction] = useState<(typeof ZOOM_FRACTIONS)[number]>('1.00');
  const [mousePosition, setMousePosition] = useState<[number, number]>([0.0, 0.0]);
  const itemElement = useRef<HTMLDivElement>(null);  // TODO: Remove
  const container = useRef<HTMLDivElement>(null);

  const onMouseMove: MouseEventHandler<HTMLElement> = (event) => {
    if (container.current === null || selectedPosition == null) {
      return;
    }

    const containerBounds = container.current.getBoundingClientRect();
    const deltaMousePosition = [
      event.clientX - mousePosition[0], 
      event.clientY - mousePosition[1]
    ];
    const position = [
      selectedPosition[0] + deltaMousePosition[0],
      selectedPosition[1] + deltaMousePosition[1]
    ];

    if ( position[0] > 0
      && position[0] < containerBounds.width
      && position[1] > 0
      && position[1] < containerBounds.height
    ) {
      setSelectedPosition([position[0], position[1]]);
    }

    setMousePosition([event.clientX, event.clientY]);
  }

  const onItemSelected: MouseEventHandler<HTMLElement> = (event) => {
    if (container.current === null || selectedPosition === null) {
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

  /*
        onMouseMove={isGrabbed ? onMouseMove : undefined}
        ref={container}
  */

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
        className={styles.visualizer__content}
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

        <div
          style={{
            position: 'absolute',
            left: BACKGROUND_CANVAS_FRAME_WIDTH,
            top: BACKGROUND_CANVAS_FRAME_WIDTH,
            width: `calc(100% - ${BACKGROUND_CANVAS_FRAME_WIDTH}px)`,
            height: `calc(100% - ${BACKGROUND_CANVAS_FRAME_WIDTH}px)`,
          }}
          className={styles['visualizer__working-area']}
          onMouseMove={isGrabbed ? onMouseMove : undefined}
          ref={container}
        >
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
    </div>
  );
}

export default Visualizer;