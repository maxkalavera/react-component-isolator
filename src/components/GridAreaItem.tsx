import React, { MouseEventHandler, useEffect, useState, useRef, useCallback } from 'react';

import { useReactIsolatorContext } from 'src/providers/ReactIsolatorContext';
import { SELECTED_ELEMENT_WRAPPER_ID } from 'src/utils/constants';
import styles from 'src/styles/grid-area-item.module.css';

import type IsolatedItem from 'src/interfaces/IsolatedItem.interfaces';

function GridAreaItem() {
    const { 
        selectedItemID,
        isolatedItems,
        isolatedItemsStamp,
        selectedItemPosition,
        zoomFraction,
        dispatch,
    } = useReactIsolatorContext();
    const mousePosRef = useRef<[number, number]>([0.0, 0.0]);
    const [isGrabbed, setIsGrabbed] = useState<boolean>(false);
    const [isolatedItem, setIsolatedItem] = useState<IsolatedItem>();

    const onMouseMove = useCallback((event: globalThis.MouseEvent) => {
      console.log('selectedItemPosition =>', selectedItemPosition);
      const deltaMousePosition = [
        event.clientX - mousePosRef.current[0],
        event.clientY - mousePosRef.current[1]
      ];
      dispatch({
        type: 'SET_SELECTED_ITEM_POSITION',
        payload: { 
          x: selectedItemPosition.x + deltaMousePosition[0], 
          y: selectedItemPosition.y + deltaMousePosition[1] 
        }
      });
      mousePosRef.current = [event.clientX, event.clientY]
    }, [selectedItemPosition.x, selectedItemPosition.y, mousePosRef.current, dispatch]);
  
    const onItemSelected: MouseEventHandler<HTMLElement> = useCallback((event) => {
      if (!isGrabbed) {
        mousePosRef.current = [event.clientX, event.clientY]
        document.onmouseup = () => {
          document.onmouseup = null;
          document.onmousemove = null;
          setIsGrabbed(false);
        };
        setIsGrabbed(true);
      }
    }, [isGrabbed, setIsGrabbed]);

    useEffect(() => {
      // When is grabbed flag is on update onmousemove event listener
      if (isGrabbed) {
        document.onmousemove = onMouseMove;
      }
    }, [isGrabbed, selectedItemPosition.x, selectedItemPosition.y, mousePosRef.current, dispatch]);

    useEffect(() => {
        setIsolatedItem((isolatedItems.find((item) => item.id === selectedItemID)));
    }, [selectedItemID, isolatedItems, isolatedItemsStamp]);

    return (
        <div
        className={`${styles['grid-area-item']} ${isGrabbed ? styles['grid-area-item--grabbed'] : ''}`}
        onMouseDown={onItemSelected}
        style={{
          position: 'absolute',
          left: selectedItemPosition?.x,
          top:  selectedItemPosition?.y,
          transform: `scale(${zoomFraction}) translate(-50%, -50%)`
        }}
      >
        <div 
          className={styles['grid-area-item__content']}
          onMouseDown={(event) => event.stopPropagation()}
          id={SELECTED_ELEMENT_WRAPPER_ID}
        >
          { isolatedItem?.jsxElement }
        </div>
      </div>
    );
};

export default GridAreaItem;