import React from "react";

import { useReactIsolatorContext } from 'src/providers/ReactIsolatorContext'
import LogoHorizontal from "./icons/LogoHorizontal";
import SwitchButton from "./SwitchButton";
import styles from "src/styles/header.module.css";

import CircleHalf from "src/components/icons/CircleHalf";

function Header() {
  const { darkMode, dispatch } = useReactIsolatorContext();

  return (
    <div className={styles.header}>
      <LogoHorizontal className={styles['header__logo']} />
      <SwitchButton
          value={darkMode}
          onChange={() => {
            console.log('TOGGLE DARK MODE')
            dispatch({type: 'TOGLE_DARK_MODE'})
          }}
          data-testid="grid-switch-button"
        >
          <CircleHalf width={18} height={18} />
        </SwitchButton>
    </div>
  );
}

export default Header;
