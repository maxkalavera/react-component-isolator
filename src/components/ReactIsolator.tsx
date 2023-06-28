import React, { useEffect, useState, MouseEventHandler, useRef } from "react";

import { ROOT_ELEMENT_ID } from "src/utils/constants";
import {
  ReactIsolatorContextProvider,
  useReactIsolatorContext,
} from "src/providers/ReactIsolatorContext";
import Visualizer from "src/components/Visualizer";
import ComponentsMenu from "src/components/ComponentsMenu";
import Header from "src/components/Header";
import globalStyles from "src/styles/globals.module.css";
import styles from "src/styles/react-isolator.module.css";
import useComputedStyle from "src/hooks/useComputedStyle";

function ReactIsolator({
  children = [],
}: {
  children?: JSX.Element[] | JSX.Element;
}): JSX.Element {
  const computedStyle = useComputedStyle();
  const { dividerWidth, darkMode, dispatch } = useReactIsolatorContext();
  const dividerRef = useRef<HTMLDivElement>(null);
  const [{ mousePositionDelta }, setMousePosition] = useState<{
    mousePositionX: number;
    mousePositionY: number;
    mousePositionDelta: number;
  }>({
    mousePositionX: 0.0,
    mousePositionY: 0.0,
    mousePositionDelta: 0.0,
  });

  useEffect(() => {
    dispatch({
      type: "SLIDE_DIVIDER",
      payload: mousePositionDelta,
    });
  }, [mousePositionDelta, computedStyle]);

  const onMouseMove = (event: MouseEvent) => {
    if (dividerRef.current === null) return;
    setMousePosition((prevState) => ({
      mousePositionX: event.clientX,
      mousePositionY: event.clientY,
      mousePositionDelta: event.clientX - prevState.mousePositionX,
    }));
  };

  const onDividerGrabbed: MouseEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    setMousePosition((prevState) => ({
      ...prevState,
      mousePositionX: event.clientX,
      mousePositionY: event.clientY,
    }));

    document.onmousemove = onMouseMove;
    document.onmouseup = document.onmouseleave = onDividerReleased;
  };

  const onDividerReleased = () => {
    document.onmousemove = null;
    document.onmouseup = null;
  };

  useEffect(() => {
    return () => {
      dispatch({ type: "CLEAR_ITEMS" });
    };
  }, []);

  return (
    <div
      id={ROOT_ELEMENT_ID}
      className={`${globalStyles["vars"]}  ${
        darkMode ? globalStyles["theme--dark"] : ""
      } ${styles["react-isolator"]}`}
    >
      {children}

      <Header />
      <div className={styles["react-isolator__content"]}>
        <ComponentsMenu
          style={{
            maxWidth: dividerWidth,
          }}
        />
        <div
          className={styles["react-isolator__divider"]}
          onMouseDown={onDividerGrabbed}
          ref={dividerRef}
        ></div>
        <Visualizer />
      </div>
    </div>
  );
}

function ReactIsolatorWrapper({
  children = [],
}: {
  children?: JSX.Element[] | JSX.Element;
}) {
  return (
    <ReactIsolatorContextProvider>
      <ReactIsolator>{children}</ReactIsolator>
    </ReactIsolatorContextProvider>
  );
}

export default ReactIsolatorWrapper;
