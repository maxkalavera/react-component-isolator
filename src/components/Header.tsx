import React from 'react';

import LogoHorizontal from './icons/LogoHorizontal';
import styles from 'src/styles/header.module.css';

function Header() {
  return (
    <div
      className={styles.header}
    >
      <LogoHorizontal className={styles.header__logo}  />
    </div>
  );
}

export default Header;