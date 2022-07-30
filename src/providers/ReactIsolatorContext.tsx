import React, { useContext, useState } from 'react';

import type IsolatedItem from 'src/interfaces/IsolatedItem.interfaces';

export interface ReactIsolatorContext {
  selected: IsolatedItem | null,
  items: IsolatedItem[]
  setSelected: (item: IsolatedItem) => void
  addItem: (item: IsolatedItem) => void
  clearItems: () => void
};

const defaultState: ReactIsolatorContext = {
  selected: null,
  items: [],
  setSelected: (item: IsolatedItem) => {},
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
  const [{ selected, items }, setReactIsolatorContext] = useState<ReactIsolatorContext>(defaultState);

  const setSelected = (item: IsolatedItem) => {
    setReactIsolatorContext((prevState) => {
      return {
        ...prevState,
        selected: item
      };
    });
  }

  const addItem = (item: IsolatedItem) => {
    setReactIsolatorContext((prevState) => {
      return {
        ...prevState,
        selected: prevState.items.length === 0 ? item : prevState.selected,
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
      selected,
      items,
      setSelected,
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