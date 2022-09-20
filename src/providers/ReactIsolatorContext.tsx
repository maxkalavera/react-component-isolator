import React, { useContext, useEffect, useState } from 'react';

import type IsolatedItem from 'src/interfaces/IsolatedItem.interfaces';

export interface ReactIsolatorContext {
  selected: IsolatedItem | null
  items: IsolatedItem[]
  searchTerm: string
  setSelected: (item: IsolatedItem) => void
  addItem: (item: IsolatedItem) => void
  clearItems: () => void
  setSearchTerm: (item: string) => void
};

const defaultState: ReactIsolatorContext = {
  selected: null,
  items: [],
  searchTerm: '',
  setSelected: (item: IsolatedItem) => {},
  addItem: (item: IsolatedItem) => {},
  clearItems: () => {},
  setSearchTerm: (value: string) => {},
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
  const [{ selected, items, searchTerm }, setReactIsolatorContext] = useState<ReactIsolatorContext>(defaultState);

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

  const setSearchTerm = (value: string) => {
    setReactIsolatorContext((prevState) => {
      return {
        ...prevState,
        searchTerm: value
      };
    });
  }

  return (
    <ReactIsolatorContext.Provider value={{
      selected,
      items,
      searchTerm,
      setSelected,
      addItem,
      clearItems,
      setSearchTerm,
    }}>
      { children }
    </ReactIsolatorContext.Provider>
  );
}

export {
  ReactIsolatorContextProvider,
  useReactIsolatorContext
};