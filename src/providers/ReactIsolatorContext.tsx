import React, { useContext, useState } from 'react';

import type IsolatedItem from 'src/interfaces/IsolatedItem.interfaces';

export interface ReactIsolatorContext {
  items: IsolatedItem[]
  addItem: (item: IsolatedItem) => void
  clearItems: () => void
};

const defaultState: ReactIsolatorContext = {
  items: [],
  addItem: (item: IsolatedItem) => {},
  clearItems: () => {}
};

const ReactIsolatorContext = React.createContext<ReactIsolatorContext>(defaultState);

function useReactIsolatorContext(): ReactIsolatorContext {
  return useContext<ReactIsolatorContext>(ReactIsolatorContext);;
}

function ReactIsolatorContextProvider({
  children=[]
}: {
  children?: JSX.Element[] | JSX.Element
}): JSX.Element {
  const [{ items }, setReactIsolatorContext] = useState<ReactIsolatorContext>(defaultState);

  const addItem = (item: IsolatedItem) => {
    setReactIsolatorContext((prevState) => {
      return {
        ...prevState,
        items: [...prevState.items, item],
      };
    });
  }

  const clearItems = () => {
    setReactIsolatorContext((prevState) => {
      return {
        ...prevState,
        items: [],
      };
    });
  }

  return (
    <ReactIsolatorContext.Provider value={{
      items,
      addItem,
      clearItems
    }}>
      { children }
    </ReactIsolatorContext.Provider>
  );
}

export {
  ReactIsolatorContextProvider,
  useReactIsolatorContext
};