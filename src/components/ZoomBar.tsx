import React from "react";

import { useReactIsolatorContext } from "src/providers/ReactIsolatorContext";
import { ZOOM_FRACTIONS } from "src/utils/constants";
import ZoomOut from "src/components/icons/ZoomOut";
import ZoomIn from "src/components/icons/ZoomIn";
import styles from "src/styles/zoom-bar.module.css";

function ZoomBar({ style = {} }: { style?: { [key: string]: string } }) {
  const { zoomFraction, dispatch } = useReactIsolatorContext();

  const increaseZoom: React.MouseEventHandler<HTMLButtonElement> = () => {
    const index = ZOOM_FRACTIONS.findIndex((item) => item === zoomFraction);
    if (index !== null && index < ZOOM_FRACTIONS.length - 1) {
      dispatch({
        type: "SET_ZOOM_FRACTION",
        payload: ZOOM_FRACTIONS[index + 1],
      });
    }
  };

  const decreaseZoom: React.MouseEventHandler<HTMLButtonElement> = () => {
    const index = ZOOM_FRACTIONS.findIndex((item) => item === zoomFraction);
    if (index !== null && index > 0) {
      dispatch({
        type: "SET_ZOOM_FRACTION",
        payload: ZOOM_FRACTIONS[index - 1],
      });
    }
  };

  return (
    <div className={styles["zoom-bar"]} style={style}>
      <button
        className={styles["zoom-bar__increase-button"]}
        onClick={increaseZoom}
        data-testid="zoombar-up"
      >
        <ZoomIn width={18} height={18} />
      </button>
      <button
        className={styles["zoom-bar__decrease-button"]}
        onClick={decreaseZoom}
        data-testid="zoombar-down"
      >
        <ZoomOut width={18} height={18} />
      </button>
    </div>
  );
}

export default ZoomBar;
