import React from 'react';

import { useReactIsolatorContext } from 'src/providers/ReactIsolatorContext';
import GridAreaItem from 'src/components/GridAreaItem';
import BackgroundCanvas from 'src/components/BackgroundCanvas';
import FileRulerFile from 'src/components/icons/FileRulerFile';
import Grid from 'src/components/icons/Grid';
import Rulers from 'src/components/icons/Rulers';
import SwitchButton from 'src/components/SwitchButton';
import ZoomSelect from 'src/components/ZoomSelect';
import ZoomBar from 'src/components/ZoomBar';
import { BACKGROUND_CANVAS_FRAME_WIDTH } from 'src/utils/constants';
import styles from 'src/styles/visualizer.module.css';

function Visualizer() {
  const { isGridOn, isFrameRulersOn, isSizeFramesOn, zoomFraction, dispatch } = useReactIsolatorContext();

  return (
    <div className={styles.visualizer}>
      <div className={styles.visualizer__header}>
        <SwitchButton
          value={isSizeFramesOn}
          onChange={() => { dispatch({ type: 'SET_IS_SIZE_FRAMES_ON', payload: !isSizeFramesOn }) }}
        >
          <FileRulerFile 
            width={18}
            height={18}
          />
        </SwitchButton>

        <SwitchButton
          value={isFrameRulersOn}
          onChange={() => { dispatch({ type: 'SET_IS_FRAME_RULERS_ON', payload: !isFrameRulersOn }) }}
        >
          <Rulers 
            width={18}
            height={18}
          />
        </SwitchButton>

        <SwitchButton
          value={isGridOn}
          onChange={() => { dispatch({ type: 'SET_IS_GRID_ON', payload: !isGridOn }) }}
        >
          <Grid 
            width={18}
            height={18}
          />
        </SwitchButton>

        <ZoomSelect />
      </div>
      <div 
        className={styles.visualizer__content}
      >
        <BackgroundCanvas />

        <ZoomBar 
          value={zoomFraction}
          onChange={(value) => dispatch({ type: 'SET_ZOOM_FRACTION', payload: value }) }
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
          className={styles['visualizer__grid-area']}
        >
          <GridAreaItem />
        </div>
      </div>
    </div>
  );
}

export default Visualizer;
