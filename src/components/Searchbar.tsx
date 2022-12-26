import React from 'react';

import styles from 'src/styles/searchbar.module.css';

function Searchbar ({
 className='',
 value='',
 onChange=()=>{}
}: {
  className?: string
  value?: string
  onChange?: (value: string) => void
}) {
  return (
    <input 
      type="text" 
      placeholder="Search..."
      className={`${styles.searchbar} ${className}`}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
    </input>
  );
}

export default Searchbar;