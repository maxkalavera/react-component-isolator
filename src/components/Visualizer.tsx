import React from "react";

import { useReactIsolatorContext } from "src/providers/ReactIsolatorContext";
import GridAreaItem from "src/components/GridAreaItem";
import BackgroundCanvas from "src/components/BackgroundCanvas";
import FileRulerFile from "src/components/icons/FileRulerFile";
import Grid from "src/components/icons/Grid";
import Rulers from "src/components/icons/Rulers";
import SwitchButton from "src/components/SwitchButton";
import ZoomSelect from "src/components/ZoomSelect";
import ZoomBar from "src/components/ZoomBar";
import styles from "src/styles/visualizer.module.css";

const BACKGROUND_CANVAS_FRAME_WIDTH = 24;

function Visualizer() {
  const { isGridOn, isFrameRulersOn, isSizeFramesOn, dispatch } =
    useReactIsolatorContext();

  return (
    <div className={styles.visualizer}>
      <div className={styles.visualizer__header}>
        <SwitchButton
          value={isSizeFramesOn}
          onChange={() => {
            dispatch({
              type: "SET_IS_SIZE_FRAMES_ON",
              payload: !isSizeFramesOn,
            });
          }}
          data-testid="size-frames-switch-button"
        >
          <FileRulerFile width={18} height={18} />
        </SwitchButton>

        <SwitchButton
          value={isFrameRulersOn}
          onChange={() => {
            dispatch({
              type: "SET_IS_FRAME_RULERS_ON",
              payload: !isFrameRulersOn,
            });
          }}
          data-testid="frame-rulers-switch-button"
        >
          <Rulers width={18} height={18} />
        </SwitchButton>

        <SwitchButton
          value={isGridOn}
          onChange={() => {
            dispatch({ type: "SET_IS_GRID_ON", payload: !isGridOn });
          }}
          data-testid="grid-switch-button"
        >
          <Grid width={18} height={18} />
        </SwitchButton>

        <ZoomSelect />
      </div>
      <div className={styles.visualizer__content}>
        <BackgroundCanvas />

        <ZoomBar
          style={{
            position: "absolute",
            left: `${BACKGROUND_CANVAS_FRAME_WIDTH + 24}px`,
            top: `${BACKGROUND_CANVAS_FRAME_WIDTH + 24}px`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: BACKGROUND_CANVAS_FRAME_WIDTH,
            top: BACKGROUND_CANVAS_FRAME_WIDTH,
            width: `calc(100% - ${BACKGROUND_CANVAS_FRAME_WIDTH}px)`,
            height: `calc(100% - ${BACKGROUND_CANVAS_FRAME_WIDTH}px)`,
          }}
          className={styles["visualizer__grid-area"]}
        >
          <GridAreaItem />
        </div>
      </div>
    </div>
  );
}

export default Visualizer;
