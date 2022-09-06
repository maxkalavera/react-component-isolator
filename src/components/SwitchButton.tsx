import React, { ReactNode } from 'react';

import styles from 'src/styles/switch-button.module.css';

function SwitchButton({
  children=[],
  value=false,
  onChange=()=>{}
}: {
  value?: boolean
  children?: ReactNode[] | ReactNode
  onChange?:() => void
}) {
  return (
    <button
      className={`${styles['switch-button']} ${value ? styles['switch-button--on'] : ''}`}
      onClick={() => onChange()}
    >
      {children}
    </button>
  );
}

export default SwitchButton;
