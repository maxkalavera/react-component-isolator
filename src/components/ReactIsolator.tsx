import React, { useEffect, useState, MouseEventHandler, useRef } from 'react';

import { DIVIDER_DEFAULT_WIDTH, DIVIDER_MIN_WIDTH, DIVIDER_MAX_WIDTH } from 'src/utils/constants';
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
  const { clearItems, setIsPendingBackgroundRender } = useReactIsolatorContext();
  const [dividerWidth, setDividerWith] = useState<number>(DIVIDER_DEFAULT_WIDTH);
  const [_, setMousePosition] = useState<[number, number]>([0.0, 0.0]);

  const onMouseMove: (
    ((this: GlobalEventHandlers, ev: MouseEvent) => any) 
    & ((this: Window, ev: MouseEvent) => any)
  ) = (event) => {

    if (dividerRef.current === null) {
      return;
    }

    setMousePosition((prevState) => {
      const deltaMousePosition = event.clientX - prevState[0];
  
      setDividerWith((prevDividerWidth) => {
        let proposedDividerWidth = prevDividerWidth + deltaMousePosition;
  
        if (proposedDividerWidth < DIVIDER_MIN_WIDTH) {
          proposedDividerWidth = DIVIDER_MIN_WIDTH
        } else if (proposedDividerWidth > DIVIDER_MAX_WIDTH) {
          proposedDividerWidth = DIVIDER_MAX_WIDTH
        }
  
        return proposedDividerWidth;
      });   

      return [event.clientX, event.clientY];
    });

    setIsPendingBackgroundRender(true);
  }

  const onDividerGrabbed: MouseEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    setMousePosition([event.clientX, event.clientY]);
    // setIsDividerGrabbed(true);
    window.onmousemove = onMouseMove;
    window.onmouseup = onDividerReleased;
    window.document.onmouseleave = onDividerReleased;
  }

  const onDividerReleased = () => {
    // setIsDividerGrabbed(false);
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
