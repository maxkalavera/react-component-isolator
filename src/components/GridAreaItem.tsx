import React, { MouseEventHandler, useEffect, useState, useRef, useCallback } from 'react';

import { useThrottling } from 'src/hooks/useThrottling';
import { useReactIsolatorContext } from 'src/providers/ReactIsolatorContext';
import { SELECTED_ELEMENT_WRAPPER_ID } from 'src/utils/constants';
import styles from 'src/styles/grid-area-item.module.css';

function GridAreaItem() {
    const { 
        isolatedItems,
        selectedItemPosition,
        selectedItemIndex,
        zoomFraction,
        dispatch,
    } = useReactIsolatorContext();
    const mousePosRef = useRef<[number, number]>([0.0, 0.0]);
    const [isGrabbed, setIsGrabbed] = useState<boolean>(false);

    const onMouseMove = useCallback(useThrottling((event: globalThis.MouseEvent) => {
      dispatch({
        type: 'SLIDE_SELECTED_ITEM_POSITION',
        payload: { 
          deltaX: event.clientX - mousePosRef.current[0], 
          deltaY: event.clientY - mousePosRef.current[1] 
        }
      });
      mousePosRef.current = [event.clientX, event.clientY]
    }, 1000/32), [
      selectedItemPosition.x, 
      selectedItemPosition.y, 
      mousePosRef.current, 
      dispatch
    ]);
  
    const onItemSelected: MouseEventHandler<HTMLElement> = useCallback((event) => {
      mousePosRef.current = [event.clientX, event.clientY];
      setIsGrabbed(true);
    }, [setIsGrabbed]);

    useEffect(() => {
      // When is grabbed flag is on update onmousemove event listener
      if (isGrabbed) {
        addEventListener('mousemove', onMouseMove);
      } else {
        removeEventListener('mousemove', onMouseMove); 
      }

      return () => {
        removeEventListener('mousemove', onMouseMove);
      }
    }, [isGrabbed, onMouseMove]);

    useEffect(() => {
      const listener = () => {
        setIsGrabbed(false);
      };
      addEventListener('mouseleave', listener);
      addEventListener('mouseup', listener);

      return () => {
        removeEventListener('mouseleave', listener);
        removeEventListener('mouseup', listener);  
      };
    }, [setIsGrabbed]);

    if(selectedItemIndex === -1) {
      return null;      
    }

    return (
        <div
        className={`${styles['grid-area-item']} ${isGrabbed ? styles['grid-area-item--grabbed'] : ''}`}
        onMouseDown={onItemSelected}
        data-testid='grid-area-item'
        style={{
          position: 'absolute',
          left: selectedItemPosition?.x,
          top:  selectedItemPosition?.y,
          transform: `scale(${zoomFraction}) translate(-50%, -50%)`
        }}
      >
        <div 
          className={styles['grid-area-item__content']}
          id={SELECTED_ELEMENT_WRAPPER_ID}
          onMouseDown={(event) => event.stopPropagation()}
        >
          {isolatedItems[selectedItemIndex].jsxElement}
        </div>
      </div>
    );
};

export default GridAreaItem;