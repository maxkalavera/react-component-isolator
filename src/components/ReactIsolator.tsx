import React, { useEffect, useState, MouseEventHandler, useRef } from 'react';

import { DIVIDER_MIN_WIDTH, DIVIDER_MAX_WIDTH } from 'src/utils/constants';
import { ReactIsolatorContextProvider, useReactIsolatorContext } from 'src/providers/ReactIsolatorContext';
import Visualizer from 'src/components/Visualizer';
import ComponentsMenu from 'src/components/ComponentsMenu';
import Header from 'src/components/Header';
import globalStyles from 'src/styles/globals.module.css';
import styles from 'src/styles/react-isolator.module.css';

function ReactIsolator({
  children=[]
}: {
  children?: JSX.Element[] | JSX.Element
}): JSX.Element {
  const dividerRef = useRef<HTMLDivElement>(null);
  const { 
    clearItems, 
    setIsPendingBackgroundRender,
    dividerWidth, setDividerWith,
  } = useReactIsolatorContext();
  const [{ mousePositionDelta }, setMousePosition] = 
    useState<{ 
      mousePositionX: number, 
      mousePositionY: number, 
      mousePositionDelta: number 
    }>({
      'mousePositionX': 0.0, 
      'mousePositionY': 0.0, 
      'mousePositionDelta': 0.0,
  });

  useEffect(() => {
    setDividerWith((prevDividerWidth) => {
      let proposedDividerWidth = prevDividerWidth + mousePositionDelta;

      if (proposedDividerWidth < DIVIDER_MIN_WIDTH) {
        proposedDividerWidth = DIVIDER_MIN_WIDTH
      } else if (proposedDividerWidth > DIVIDER_MAX_WIDTH) {
        proposedDividerWidth = DIVIDER_MAX_WIDTH
      }

      return proposedDividerWidth;
    });

    setIsPendingBackgroundRender(true);
  }, [mousePositionDelta]);

  const onMouseMove: (
    ((this: GlobalEventHandlers, ev: MouseEvent) => any) 
    & ((this: Window, ev: MouseEvent) => any)
  ) = (event) => {
    if (dividerRef.current === null) {
      return;
    }

    setMousePosition((prevState) => ({
      mousePositionX: event.clientX, 
      mousePositionY: event.clientY, 
      mousePositionDelta: event.clientX - prevState.mousePositionX,
    }));
  }

  const onDividerGrabbed: MouseEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    setMousePosition((prevState) => ({
      ...prevState,
      mousePositionX: event.clientX, 
      mousePositionY: event.clientY, 
    }));

    window.onmousemove = onMouseMove;
    window.onmouseup = onDividerReleased;
    window.document.onmouseleave = onDividerReleased;
  }

  const onDividerReleased = () => {
    window.onmousemove = null; 
    window.onmouseup = null;
  }

  useEffect(() => {
    return () => {
      clearItems();
    }
  }, [])

  return (
    <div 
      className={`${globalStyles['vars']} ${styles['react-isolator']}`}
    >
      { children }

      <Header />
      <div className={styles['react-isolator__content']}>
        <ComponentsMenu 
          style={{
            maxWidth: dividerWidth
          }}
        />
        <div className={styles['react-isolator__divider']}
          onMouseDown={onDividerGrabbed}
          ref={dividerRef}
        ></div>
        <Visualizer />
      </div>
    </div>
  );
}

function ReactIsolatorWrapper({
  children=[]
}: {
  children?: JSX.Element[] | JSX.Element
}) { 
  return (
    <ReactIsolatorContextProvider>
      <ReactIsolator>
        { children }
      </ReactIsolator>
    </ReactIsolatorContextProvider>
  );
}

export default ReactIsolatorWrapper;
