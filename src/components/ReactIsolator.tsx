import React, { useEffect } from 'react';

import { ReactIsolatorContextProvider, useReactIsolatorContext } from 'src/providers/ReactIsolatorContext';
import ComponentsList from 'src/components/ComponentsList';
import Header from 'src/components/Header';
import globalStyles from 'src/styles/globals.module.css';
import styles from 'src/styles/react-isolator.module.css';

function ReactIsolator({
  children=[]
}: {
  children?: JSX.Element[] | JSX.Element
}): JSX.Element {
  const { items, clearItems } = useReactIsolatorContext();

  useEffect(() => {
    return () => {
      clearItems()
    }
  }, [])

  return (
    <div 
      className={`${globalStyles['vars']} ${styles['react-isolator']}`}
    >
      { children }

      <Header />
      <div className={styles['react-isolator__content']}>
        <ComponentsList />
      </div>
    </div>
  );
}

/*
      <h1>This is a header</h1>
      { items.map((item, index) => (
        <div key={index}>
          <h4>{ item.name }</h4>
          { item.element }
        </div>
      )) }
*/

function ReactIsolatorWrapper({
  children=[]
}: {
  children?: JSX.Element[] | JSX.Element
}) { 
  return (
    <ReactIsolatorContextProvider>
      <ReactIsolator>
        { children }
      </ReactIsolator>
    </ReactIsolatorContextProvider>
  );
}

export default ReactIsolatorWrapper;
