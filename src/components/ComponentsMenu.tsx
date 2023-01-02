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
  const { selectedItemID, dispatch } = useReactIsolatorContext();
  return (
    <div 
      className={`${styles['components-menu__item']} ${ item.id === selectedItemID ? styles['components-menu__item--selected'] : '' }`}
      onClick={() => dispatch({ type: 'SET_SELECTED_ITEM_ID', payload: item.id })}
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
  const { isolatedItems, searchTerm, dispatch  } = useReactIsolatorContext();

  const filteredItems = searchTerm.length > 0 
    ? isolatedItems.filter((item) => item.name.includes(searchTerm))
    : isolatedItems;
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
            onChange={(value: string) => dispatch({ type: 'SET_SEARCH_TERM', payload: value })}
          />
        </div>

        <div className={styles['components-menu__content']}>
          { 
            filteredItems.map((item, index) => (
              <ComponentItem 
                key={item.id}
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