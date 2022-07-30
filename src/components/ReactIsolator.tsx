import React, { useEffect } from 'react';

import { ReactIsolatorContextProvider, useReactIsolatorContext } from 'src/providers/ReactIsolatorContext';
import Visualizer from 'src/components/Visualizer';
import ComponentsMenu from 'src/components/ComponentsMenu';
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
        <ComponentsMenu />
        <Visualizer />
      </div>
    </div>
  );
}

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
