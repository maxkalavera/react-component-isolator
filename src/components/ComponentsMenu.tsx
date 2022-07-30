import React from 'react';

import type IsolatedItem from 'src/interfaces/IsolatedItem.interfaces';

import Box from 'src/components/icons/Box';
import { useReactIsolatorContext } from 'src/providers/ReactIsolatorContext';
import globalStyles from 'src/styles/globals.module.css';
import styles from 'src/styles/components-menu.module.css';

function ComponentItem({
  item
}: {
  item: IsolatedItem
}) {
  const { setSelected } = useReactIsolatorContext();

  return (
    <div 
      className={styles['components-menu__item']}
      onClick={() => setSelected(item)}
    >
      <Box width={16} height={16} className={styles['components-menu__icon']} />
      <p className={globalStyles['secondary-p']}>{ item.name }</p>
    </div>
  );
}

function ComponentsMenu() {
  const { items } = useReactIsolatorContext();

  return (
    <div className={styles['components-menu']}>

      <div className={styles['components-menu__header']}>
        <h3 className={`${globalStyles['secondary-h3']}`}>Components</h3>
      </div>

      <div className={styles['components-menu__content']}>
        { 
          items.map((item, index) => (
            <ComponentItem 
              key={index}
              item={item}
            />
          )) 
        }
      </div>
    </div>
  );
}

export default ComponentsMenu;