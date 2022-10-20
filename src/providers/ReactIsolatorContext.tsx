import React, { useContext, useEffect, useState } from 'react';

import localStorageWrapper from 'src/utils/localStorageWrapper';
import { ZOOM_FRACTIONS, LOCAL_STORAGE_CONTEXT_ID, DIVIDER_DEFAULT_WIDTH } from 'src/utils/constants';

import type IsolatedItem from 'src/interfaces/IsolatedItem.interfaces';

export interface ReactIsolatorContext {
  selectedElement: IsolatedItem | null
  selectedElementPosition: [number, number] | null
  selectedElementDOMElement: HTMLElement | null
  items: IsolatedItem[]
  searchTerm: string
  isPendingBackgroundRender: boolean
  isGridOn: boolean
  isRulerOn: boolean
  isSizeFramesOn: boolean
  dividerWidth: number
  zoomFraction: (typeof ZOOM_FRACTIONS)[number]
  setSelectedElement: (item: IsolatedItem) => void
  setSelectedElementPosition: (position: [number, number]) => void
  setSelectedElementDOMElement: (domElement: HTMLElement) => void
  addItem: (item: IsolatedItem) => void
  clearItems: () => void
  setSearchTerm: (item: string) => void
  setIsPendingBackgroundRender: (isPendingBackgroundRender: boolean) => void
  setIsGridOn: (isGridOn: boolean) => void
  setIsRulerOn: (isRulerOn: boolean) => void
  setIsSizeFramesOn: (isSizeFramesOn: boolean) => void
  setDividerWith: (dividerWidth: number | ((prevDividerWidth: number) => number)) => void
  setZoomFraction: (zoomFraction: (typeof ZOOM_FRACTIONS)[number]) => void
};

const defaultState: ReactIsolatorContext = {
  selectedElement: null,
  selectedElementPosition: null,
  selectedElementDOMElement: null,
  items: [],
  searchTerm: '',
  isPendingBackgroundRender: true,
  isGridOn: true,
  isRulerOn: true,
  isSizeFramesOn: true,
  dividerWidth: DIVIDER_DEFAULT_WIDTH,
  zoomFraction: '1.00',
  setSelectedElement: (item) => {},
  setSelectedElementPosition: (position: [number, number]) => {},
  setSelectedElementDOMElement: (domElement: HTMLElement) => {},
  addItem: (item: IsolatedItem) => {},
  clearItems: () => {},
  setSearchTerm: (value: string) => {},
  setIsPendingBackgroundRender: (isPendingBackgroundRender: boolean) => {},
  setIsGridOn: (isGridOn: boolean) => {},
  setIsRulerOn: (isRulerOn: boolean) => {},
  setIsSizeFramesOn: (isSizeFramesOn: boolean) => {},
  setDividerWith: (dividerWidth: number | ((prevDividerWidth: number) => number)) => {},
  setZoomFraction: (zoomFraction: (typeof ZOOM_FRACTIONS)[number]) => {},
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
  const [context, setReactIsolatorContext] = useState<ReactIsolatorContext>(
    Object.assign(defaultState, localStorageWrapper.get(LOCAL_STORAGE_CONTEXT_ID, {}))
  );

  useEffect(() => {
    localStorageWrapper.set(LOCAL_STORAGE_CONTEXT_ID, {
      selectedElementPosition: context.selectedElementPosition,
      isGridOn: context.isGridOn,
      isRulerOn: context.isRulerOn,
      isSizeFramesOn: context.isSizeFramesOn,
      dividerWidth: context.dividerWidth,
      zoomFraction: context.zoomFraction,
    });
  }, Object.values(context));

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

  const setIsGridOn = (isGridOn: boolean) => {
    setReactIsolatorContext((prevState) => {
      return {
        ...prevState,
        isGridOn
      };
    });
  };

  const setIsRulerOn = (isRulerOn: boolean) => {
    setReactIsolatorContext((prevState) => {
      return {
        ...prevState,
        isRulerOn
      };
    });
  };

  const setIsSizeFramesOn = (isSizeFramesOn: boolean) => {
    setReactIsolatorContext((prevState) => {
      return {
        ...prevState,
        isSizeFramesOn
      };
    });
  };

  const setDividerWith = (dividerWidth: number | ((prevDividerWidth: number) => number)) => {
    if (typeof dividerWidth === 'number') {
      setReactIsolatorContext((prevState) => {
        return {
          ...prevState,
          dividerWidth,
        }
      });        
    } else if (typeof dividerWidth === 'function') {
      setReactIsolatorContext((prevState) => {
        return {
          ...prevState,
          dividerWidth: dividerWidth(prevState.dividerWidth),
        }
      });
    }
  };

  const setZoomFraction = (zoomFraction: (typeof ZOOM_FRACTIONS)[number]) => {
    setReactIsolatorContext((prevState) => {
      return {
        ...prevState,
        zoomFraction
      };
    });
  };

  return (
    <ReactIsolatorContext.Provider value={{
      ...context,
      setSelectedElement,
      setSelectedElementDOMElement,
      setSelectedElementPosition,
      addItem,
      clearItems,
      setSearchTerm,
      setIsPendingBackgroundRender,
      setIsGridOn,
      setIsRulerOn,
      setIsSizeFramesOn,
      setDividerWith,
      setZoomFraction,
    }}>
      { children }
    </ReactIsolatorContext.Provider>
  );
}

export {
  ReactIsolatorContextProvider,
  useReactIsolatorContext
};