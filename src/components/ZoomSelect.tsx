import React from 'react';

import { useReactIsolatorContext } from 'src/providers/ReactIsolatorContext';
import { ZOOM_FRACTIONS, ZOOM_FRACTIONS_MAP } from 'src/utils/constants';
import styles from 'src/styles/zoom-select.module.css';


function ZoomSelect() {
  const { zoomFraction, dispatch } = useReactIsolatorContext();

  const onOptionSelected: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    if (ZOOM_FRACTIONS.find(item => item === event.target.value) !== null) {
      dispatch({ 
        type: 'SET_ZOOM_FRACTION', 
        payload: event.target.value as (typeof ZOOM_FRACTIONS)[number] 
      });
    } else {
      throw `Not valid Zoom fraction select option [${event.target.value}]`;
    }
  }

  return (
    <select
      className={`select ${styles['zoom-select']}`}
      value={zoomFraction}
      onChange={onOptionSelected}
      data-testid='zoom-select'
    >
      { ZOOM_FRACTIONS.map(item => (
        <option key={item} value={item}>
          { ZOOM_FRACTIONS_MAP[item] }
        </option>
      )) }

    </select>
  );
}

export default ZoomSelect;