import React from 'react';

import logo from 'src/assets/logo.svg';
import globalStyles from 'src/styles/globals.module.css';
import styles from 'src/styles/header.module.css';

function Header() {
  return (
    <div
      className={styles.header}
    >
      <img src={logo} alt="Logo" />
    </div>
  );
}

export default Header;