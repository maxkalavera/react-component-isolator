import React, { useEffect, useState } from 'react';

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
  const [isGridOn, setIsGridOn] = useState<boolean>(true);
  const [isRulerOn, setIsRulerOn] = useState<boolean>(true);
  const [isSizeFramesOn, setIsSizeFramesOn] = useState<boolean>(true);
  const [mousePosition, setMousePosition] = useState<[number, number]>([0.0, 0.0]);
  const [zoomFraction, setZoomFraction] = useState<(typeof ZOOM_FRACTIONS)[number]>('1.00');

  const onZoomFractionChange = (value: (typeof ZOOM_FRACTIONS)[number]) => {
    setZoomFraction(value);
  }

  return (
    <div className={styles.visualizer}>
      <div className={styles.visualizer__header}>
        <SwitchButton
          value={isSizeFramesOn}
          onChange={() => { setIsSizeFramesOn((prevState) => !prevState) }}
        >
          <FileRulerFile 
            width={18}
            height={18}
          />
        </SwitchButton>

        <SwitchButton
          value={isRulerOn}
          onChange={() => { setIsRulerOn((prevState) => !prevState) }}
        >
          <Rulers 
            width={18}
            height={18}
          />
        </SwitchButton>

        <SwitchButton
          value={isGridOn}
          onChange={() => { setIsGridOn((prevState) => !prevState) }}
        >
          <Grid 
            width={18}
            height={18}
          />
        </SwitchButton>

        <ZoomSelect 
          value={zoomFraction}
          onChange={setZoomFraction}
        />
      </div>
      <div 
        className={styles.visualizer__content}
      >
        <BackgroundCanvas
          isGridOn={isGridOn}
          isRulerOn={isRulerOn}
          isSizeFramesOn={isSizeFramesOn}
          zoomFraction={zoomFraction}
        />

        <ZoomBar 
          value={zoomFraction}
          onChange={onZoomFractionChange}
          style={{
            position: 'absolute',
            left: BACKGROUND_CANVAS_FRAME_WIDTH + 12,
            top: BACKGROUND_CANVAS_FRAME_WIDTH + 12
          }}
        />

        <GridArea
          mousePosition={mousePosition}
          setMousePosition={setMousePosition}
          zoomFraction={zoomFraction}
          isRulerOn={isRulerOn}
        />
      </div>
    </div>
  );
}

export default Visualizer;
