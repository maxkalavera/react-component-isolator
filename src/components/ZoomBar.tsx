import React from 'react';

import { ZOOM_FRACTIONS } from 'src/utils/constants';
import ZoomOut from 'src/components/icons/ZoomOut';
import ZoomIn from 'src/components/icons/ZoomIn';
import styles from 'src/styles/zoom-bar.module.css';

function ZoomBar({
  value='1.00',
  onChange=() => {},
  style={}
}: {
  value?: (typeof ZOOM_FRACTIONS)[number]
  onChange?: (value: (typeof ZOOM_FRACTIONS)[number]) => void
  style?: {[key: string]: any}
}) {

  const increaseZoom: React.MouseEventHandler<HTMLButtonElement> = () => {
    const index = ZOOM_FRACTIONS.findIndex(item => item === value);
    if (index !== null && index < ZOOM_FRACTIONS.length - 1) {
      onChange(ZOOM_FRACTIONS[index + 1]);
    }
  }

  const decreaseZoom: React.MouseEventHandler<HTMLButtonElement> = () => {
    const index = ZOOM_FRACTIONS.findIndex(item => item === value);
    if (index !== null && index > 0) {
      onChange(ZOOM_FRACTIONS[index - 1]);
    }
  }

  return (
    <div
      className={styles['zoom-bar']}
      style={style}
    >
      <button 
        className={styles['zoom-bar__increase-button']}
        onClick={increaseZoom}
      >
        <ZoomIn 
          width={18} 
          height={18} 
        />
      </button>
      <button 
        className={styles['zoom-bar__decrease-button']}
        onClick={decreaseZoom}
      >
        <ZoomOut 
          width={18} 
          height={18} 
        />
      </button> 
    </div>
  );
}

export default ZoomBar;