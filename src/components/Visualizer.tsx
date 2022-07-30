import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';

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
  const [{positionX, positionY, mousePositionX, mousePositionY}, setPosition] = useState<Position>({ 
    positionX: 0, positionY: 0, 
    mousePositionX: 0, mousePositionY: 0
  }); 
  const [isGrabbed, setIsGrabbed] = useState<boolean>(false);
  const itemElement = useRef<HTMLDivElement>(null);  
  const container = useRef<HTMLDivElement>(null);

  const onMouseMove: MouseEventHandler<HTMLElement> = (event) => {
    if (container.current === null || itemElement.current === null)
      return;

    let containerBounds = container.current.getBoundingClientRect();
    let mouseShiftX = event.clientX - containerBounds.x - mousePositionX;
    let mouseShiftY = event.clientY - containerBounds.y - mousePositionY;

    /*
    // Check the new position is inside container boundaries
    let itemBounds = itemElement.current.getBoundingClientRect();
    if (((itemBounds.x + mouseShiftX) < containerBounds.x) 
      || ((itemBounds.right + mouseShiftX) > containerBounds.right)
      || ((itemBounds.y + mouseShiftY) < containerBounds.y)
      || ((itemBounds.bottom + mouseShiftY) > containerBounds.bottom)
    ) {
      return;
    }
    */

    setPosition((prevState) => ({ 
      ...prevState, 
      positionX: positionX + mouseShiftX,
      positionY: positionY + mouseShiftY,
      mousePositionX: mousePositionX + mouseShiftX,
      mousePositionY:mousePositionY + mouseShiftY
    }));
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

  /*
  const onContainerResize = () => {
    if (container.current === null || itemElement.current === null)
      return;

    let containerBounds = container.current.getBoundingClientRect();
    let itemBounds = itemElement.current.getBoundingClientRect();

    let [shiftX, shiftY] = [0, 0];

    shiftX += itemBounds.right > containerBounds.right 
      ? containerBounds.right - itemBounds.right
      : 0;
      shiftY += itemBounds.bottom > containerBounds.bottom 
      ? containerBounds.bottom - itemBounds.bottom
      : 0;

    setPosition((prevState) => ({ 
      ...prevState, 
      positionX: positionX + shiftX, 
      positionY: positionY + shiftY
    }));
  }

  useEffect(() => {
    if (container.current === null)
      return;

    document.body.onresize = onContainerResize;
    //const resizeObserver = new ResizeObserver(onContainerResize);
    //resizeObserver.observe(container.current);
    return () => {
      //resizeObserver.disconnect();
      document.body.onresize = null;
    };
  }, [positionX, positionY]);
  */

  return (
    <div className={styles.visualizer}>
      <div className={styles.visualizer__header}>

      </div>
      <div 
        style={{
          position: 'relative',
          overflow: 'auto'
        }}
        className={styles.visualizer__content}
        onMouseMove={isGrabbed? onMouseMove : undefined}
        ref={container}
      >
        <div
          style={{
            position: 'absolute',
            left: positionX,
            top: positionY,
            transform: 'scale(1.7)'
          }}
          className={`${styles.visualizer__item} ${isGrabbed ? styles['visualizer__item--grabbed'] : ''}`}
          onMouseDown={onItemSelected}
          ref={itemElement}
        >
          <div 
            className={styles['visualizer__item-content']}
            onMouseDown={(event) => event.stopPropagation()}
          >
            { selected?.element }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Visualizer;