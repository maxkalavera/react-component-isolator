import React, { useEffect, useState } from 'react';

import { useReactIsolatorContext } from 'src/providers/ReactIsolatorContext';
import GridArea from 'src/components/GridArea';
import BackgroundCanvas from 'src/components/BackgroundCanvas';
import FileRulerFile from 'src/components/icons/FileRulerFile';
import Grid from 'src/components/icons/Grid';
import Rulers from 'src/components/icons/Rulers';
import SwitchButton from 'src/components/SwitchButton';
import ZoomSelect from 'src/components/ZoomSelect';
import ZoomBar from 'src/components/ZoomBar';
import { ZOOM_FRACTIONS, BACKGROUND_CANVAS_FRAME_WIDTH } from 'src/utils/constants';
import styles from 'src/styles/visualizer.module.css';

function Visualizer() {
  const { 
    isGridOn, setIsGridOn, 
    isRulerOn, setIsRulerOn, 
    isSizeFramesOn, setIsSizeFramesOn,
    zoomFraction, setZoomFraction,
  } = useReactIsolatorContext();
  const [mousePosition, setMousePosition] = useState<[number, number]>([0.0, 0.0]);

  return (
    <div className={styles.visualizer}>
      <div className={styles.visualizer__header}>
        <SwitchButton
          value={isSizeFramesOn}
          onChange={() => { setIsSizeFramesOn(!isSizeFramesOn) }}
        >
          <FileRulerFile 
            width={18}
            height={18}
          />
        </SwitchButton>

        <SwitchButton
          value={isRulerOn}
          onChange={() => { setIsRulerOn(!isRulerOn) }}
        >
          <Rulers 
            width={18}
            height={18}
          />
        </SwitchButton>

        <SwitchButton
          value={isGridOn}
          onChange={() => { setIsGridOn(!isGridOn) }}
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
          onChange={(value) => setZoomFraction(value)}
          style={{
            position: 'absolute',
            left: BACKGROUND_CANVAS_FRAME_WIDTH + 12,
            top: BACKGROUND_CANVAS_FRAME_WIDTH + 12
          }}
        />

        <GridArea
          mousePosition={mousePosition}
          setMousePosition={setMousePosition}
        />
      </div>
    </div>
  );
}

export default Visualizer;
