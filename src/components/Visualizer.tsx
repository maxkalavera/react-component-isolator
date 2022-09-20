import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';

import BackgroundGrid from 'src/components/BackgroundGrid';
import { ZOOM_FRACTIONS } from 'src/utils/constants';
import Grid from 'src/components/icons/Grid';
import SwitchButton from 'src/components/SwitchButton';
import ZoomSelect from 'src/components/ZoomSelect';
import ZoomBar from 'src/components/ZoomBar';
import { useReactIsolatorContext } from 'src/providers/ReactIsolatorContext';
import styles from 'src/styles/visualizer.module.css';

interface Position {
  positionX: number 
  positionY: number
  mousePositionX: number
  mousePositionY: number
}

function Visualizer() {
  const { selected } = useReactIsolatorContext();
  const [isGridOn, setIsGridOn] = useState<boolean>(true);
  const [{positionX, positionY, mousePositionX, mousePositionY}, setPosition] = useState<Position>({ 
    positionX: 0, positionY: 0, 
    mousePositionX: 0, mousePositionY: 0
  }); 
  const [isGrabbed, setIsGrabbed] = useState<boolean>(false);
  const [zoomFraction, setZoomFraction] = useState<(typeof ZOOM_FRACTIONS)[number]>('1.00');
  const itemElement = useRef<HTMLDivElement>(null);  // TODO: Remove
  const container = useRef<HTMLDivElement>(null);

  const onMouseMove: MouseEventHandler<HTMLElement> = (event) => {
    setPosition((prevState) => {
      if (container.current === null || itemElement.current === null)
      return prevState;

      let containerBounds = container.current.getBoundingClientRect();
      let mouseShiftX = event.clientX - containerBounds.x - mousePositionX;
      let mouseShiftY = event.clientY - containerBounds.y - mousePositionY;
  
      if (
        positionX + mouseShiftX > containerBounds.width 
        || positionX + mouseShiftX < 0
        || positionY + mouseShiftY > containerBounds.height
        || positionY + mouseShiftY < 0
      ) {
        return prevState;
      }
  
      return {
      ...prevState, 
      positionX: positionX + mouseShiftX,
      positionY: positionY + mouseShiftY,
      mousePositionX: mousePositionX + mouseShiftX,
      mousePositionY:mousePositionY + mouseShiftY
      }
    });
  }

  const onItemSelected: MouseEventHandler<HTMLElement> = (event) => {
    if (container.current === null)
      return;

    const bounds = container.current.getBoundingClientRect();
    setPosition((prevState) => ({ 
      ...prevState, 
      mousePositionX: (event.clientX - bounds.x), 
      mousePositionY: (event.clientY - bounds.y)
    }));
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
    if (container.current === null || itemElement.current === null)
      return;

    let containerBounds = container.current.getBoundingClientRect();
    let itemBounds = itemElement.current.getBoundingClientRect();
    setPosition((prevState) => ({
      ...prevState, 
      positionX: (containerBounds.width * 0.5) - (itemBounds.width * 0.5),
      positionY: (containerBounds.height * 0.5) - (itemBounds.height * 0.5)
    }));
  };

  useEffect(() => {
    centerItem();
  }, [selected?.element]);

  let itemBounds = itemElement.current ? itemElement.current.getBoundingClientRect() : new DOMRect();
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
        onMouseMove={isGrabbed? onMouseMove : undefined}
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
            left: 12,
            top: 12
          }}
        />  

        <div
          className={`${styles.visualizer__item} ${isGrabbed ? styles['visualizer__item--grabbed'] : ''}`}
          onMouseDown={onItemSelected}
          ref={itemElement}
          style={{
            position: 'absolute',
            left: positionX,
            top: positionY,
            transform: `scale(${zoomFraction})`
          }}
        >
          <div 
            className={styles['visualizer__item-content']}
            onMouseDown={(event) => event.stopPropagation()}
          >
            
            { selected 
                ? selected.element 
                : null 
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Visualizer;