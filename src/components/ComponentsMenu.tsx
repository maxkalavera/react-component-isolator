import React, { useEffect } from 'react';

import type IsolatedItem from 'src/interfaces/IsolatedItem.interfaces';

import Searchbar from 'src/components/Searchbar';
import Box from 'src/components/icons/Box';
import { useReactIsolatorContext } from 'src/providers/ReactIsolatorContext';
import globalStyles from 'src/styles/globals.module.css';
import styles from 'src/styles/components-menu.module.css';

function ComponentItem({
  item,
}: {
  item: IsolatedItem
}) {
  const { setSelectedElement, selectedElement } = useReactIsolatorContext();
  return (
    <div 
      className={`${styles['components-menu__item']} ${item === selectedElement ? styles['components-menu__item--selected'] : ''}`}
      onClick={() => setSelectedElement(item)}
    >
      <Box width={16} height={16} className={styles['components-menu__icon']} />
      <p className={globalStyles['secondary-p']}>{ item.name }</p>
    </div>
  );
}

function ComponentsMenu({
  style={}
}: {
  style?: object
}) {
  const { items, searchTerm, setSearchTerm  } = useReactIsolatorContext();

  const filteredItems = setSearchTerm.length > 0 
    ? items.filter((item) => item.name.includes(searchTerm))
    : items;
  return (
    <div
      className={`${ styles['components-menu__wrapper']}`}
      style={style}
    >
      <div 
        className={`${ styles['components-menu']}`}
      >

        <div className={styles['components-menu__header']}>
          <h3 className={`${globalStyles['secondary-h3']}`}>Components</h3>
          <Searchbar 
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </div>

        <div className={styles['components-menu__content']}>
          { 
            filteredItems.map((item, index) => (
              <ComponentItem 
                key={index}
                item={item}
              />
            )) 
          }
        </div>
      </div>
    </div>
  );
}

export default ComponentsMenu;