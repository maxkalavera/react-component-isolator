import React from 'react';

import GridAreaItem from 'src/components/GridAreaItem';
import { BACKGROUND_CANVAS_FRAME_WIDTH } from 'src/utils/constants';
import styles from 'src/styles/grid-area.module.css';

function GridArea () {
  return (
    <div
      style={{
        position: 'absolute',
        left: BACKGROUND_CANVAS_FRAME_WIDTH,
        top: BACKGROUND_CANVAS_FRAME_WIDTH,
        width: `calc(100% - ${BACKGROUND_CANVAS_FRAME_WIDTH}px)`,
        height: `calc(100% - ${BACKGROUND_CANVAS_FRAME_WIDTH}px)`,
      }}
      className={styles['grid-area']}
    >
      <GridAreaItem />
    </div>
  );
}

export default GridArea;