import React, { useContext, useEffect, useState } from 'react';

import type IsolatedItem from 'src/interfaces/IsolatedItem.interfaces';

export interface ReactIsolatorContext {
  selectedElement: IsolatedItem | null
  selectedElementPosition: [number, number] | null
  selectedElementDOMElement: HTMLElement | null
  items: IsolatedItem[]
  searchTerm: string
  isPendingBackgroundRender: boolean
  setSelectedElement: (item: IsolatedItem) => void
  setSelectedElementPosition: (position: [number, number]) => void
  setSelectedElementDOMElement: (domElement: HTMLElement) => void
  addItem: (item: IsolatedItem) => void
  clearItems: () => void
  setSearchTerm: (item: string) => void
  setIsPendingBackgroundRender: (isPendingBackgroundRender: boolean) => void
};

const defaultState: ReactIsolatorContext = {
  selectedElement: null,
  selectedElementPosition: null,
  selectedElementDOMElement: null,
  items: [],
  searchTerm: '',
  isPendingBackgroundRender: true,
  setSelectedElement: (item: IsolatedItem) => {},
  setSelectedElementPosition: (position: [number, number]) => {},
  setSelectedElementDOMElement: (domElement: HTMLElement) => {},
  addItem: (item: IsolatedItem) => {},
  clearItems: () => {},
  setSearchTerm: (value: string) => {},
  setIsPendingBackgroundRender: (isPendingBackgroundRender: boolean) => {}
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
  const [{ 
    selectedElement,
    selectedElementPosition,
    selectedElementDOMElement,
    items, 
    searchTerm, 
    isPendingBackgroundRender,
  }, setReactIsolatorContext] = useState<ReactIsolatorContext>(defaultState);

  const setSelectedElement = (item: IsolatedItem) => {
    setReactIsolatorContext((prevState) => {
      return {
        ...prevState,
        selectedElement: item
      };
    });
  }

  const setSelectedElementDOMElement = (domElement: HTMLElement) => {
    setReactIsolatorContext((prevState) => {
      return {
        ...prevState,
        selectedElementDOMElement: domElement,
      };
    });
  };

  const setSelectedElementPosition = (position: [number, number]) => {
    setReactIsolatorContext((prevState) => {
      return {
        ...prevState,
        selectedElementPosition: position,
      };
    });
  }

  const addItem = (item: IsolatedItem) => {
    setReactIsolatorContext((prevState) => {
      return {
        ...prevState,
        selectedElement: prevState.items.length === 0 ? item : prevState.selectedElement,
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

  const setIsPendingBackgroundRender = (isPendingBackgroundRender: boolean) => {
    setReactIsolatorContext((prevState) => {
      return {
        ...prevState,
        isPendingBackgroundRender
      };
    });

  }

  return (
    <ReactIsolatorContext.Provider value={{
      selectedElement,
      selectedElementPosition,
      selectedElementDOMElement,
      items,
      searchTerm,
      isPendingBackgroundRender,
      setSelectedElement,
      setSelectedElementDOMElement,
      setSelectedElementPosition,
      addItem,
      clearItems,
      setSearchTerm,
      setIsPendingBackgroundRender,
    }}>
      { children }
    </ReactIsolatorContext.Provider>
  );
}

export {
  ReactIsolatorContextProvider,
  useReactIsolatorContext
};