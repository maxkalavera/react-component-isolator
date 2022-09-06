import React from 'react';

import { ZOOM_FRACTIONS, ZOOM_FRACTIONS_MAP } from 'src/utils/constants';
import styles from 'src/styles/zoom-select.module.css';


function ZoomSelect({
  value='1.00',
  onChange=() => {}
}: {
  value?: (typeof ZOOM_FRACTIONS)[number]
  onChange?: (value: (typeof ZOOM_FRACTIONS)[number]) => void
}) {

  const onOptionSelected: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    if (ZOOM_FRACTIONS.find(item => item === event.target.value) !== null) {
      onChange(event.target.value as (typeof ZOOM_FRACTIONS)[number])
    } else {
      throw `Not valid Zoom fraction select option [${event.target.value}]`;
    }
  }

  return (
    <select
      className={`select ${styles['zoom-select']}`}
      value={value}
      onChange={onOptionSelected}
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