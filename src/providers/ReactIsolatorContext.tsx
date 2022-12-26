import React, { useContext, useEffect, useReducer, useState } from 'react';
import _ from 'lodash';

import localStorageWrapper from 'src/utils/localStorageWrapper';
import { ZOOM_FRACTIONS, LOCAL_STORAGE_CONTEXT_ID, DIVIDER_DEFAULT_WIDTH } from 'src/utils/constants';

import type IsolatedItem from 'src/interfaces/IsolatedItem.interfaces';

export interface ReactIsolatorContext {
  selectedElementID: string
  selectedElementPosition: { x: number, y: number } | null
  reactComponentElements: IsolatedItem[]
  searchTerm: string
  isPendingBackgroundRender: boolean
  isGridOn: boolean
  isFrameRulersOn: boolean
  isSizeFramesOn: boolean
  dividerWidth: number
  zoomFraction: (typeof ZOOM_FRACTIONS)[number]
  dispatch: React.Dispatch<ReactIsolatorActions>,
};

type ReactIsolatorActions = {
  type: 'SET_SELECTED_ELEMENT',
  payload:  ReactIsolatorContext['selectedElementID']
} | {
  type: 'SET_SELECTED_ELEMENT_POSITION',
  payload:  ReactIsolatorContext['selectedElementPosition']
} | {
  type: 'ADD_ELEMENT',
  payload:  IsolatedItem
} | {
  type: 'CLEAR_ELEMENTS'
} | {
  type: 'SET_SEARCH_TERM',
  payload:  ReactIsolatorContext['searchTerm']
} | {
  type: 'SET_IS_PENDING_BACKGROUND_RENDER',
  payload:  ReactIsolatorContext['isPendingBackgroundRender']
} | {
  type: 'SET_IS_GRID_ON',
  payload:  ReactIsolatorContext['isGridOn']
} | {
  type: 'SET_IS_FRAME_RULERS_ON',
  payload:  ReactIsolatorContext['isFrameRulersOn']
} | {
  type: 'SET_IS_SIZE_FRAMES_ON',
  payload:  ReactIsolatorContext['isSizeFramesOn']
} | {
  type: 'SET_DIVIDER_WIDTH',
  payload:  ReactIsolatorContext['dividerWidth']
} | {
  type: 'SET_ZOOM_FRACTION',
  payload:  ReactIsolatorContext['zoomFraction']
};

const LOCAL_STORAGE_STATE_ATTRIBUTES: Array<keyof ReactIsolatorContext> = [
  'selectedElementID', 'selectedElementPosition', 'searchTerm', 'isPendingBackgroundRender',
  'isGridOn', 'isFrameRulersOn', 'isSizeFramesOn', 'dividerWidth', 'zoomFraction'
];

const defaultState: ReactIsolatorContext = {
  selectedElementID: '',
  selectedElementPosition: null,
  reactComponentElements: [],
  searchTerm: '',
  isPendingBackgroundRender: true,
  isGridOn: true,
  isFrameRulersOn: true,
  isSizeFramesOn: true,
  dividerWidth: DIVIDER_DEFAULT_WIDTH,
  zoomFraction: '1.00',
  dispatch: () => {},
};

let ReactIsolatorContext = React.createContext<ReactIsolatorContext>(defaultState);

function useReactIsolatorContext(): ReactIsolatorContext {
  return useContext<ReactIsolatorContext>(ReactIsolatorContext);
}

function ReactIsolatorContextProvider({
  children=[]
}: {
  children?: JSX.Element[] | JSX.Element
}): JSX.Element {
  const [state, dispatch] = useReducer((state: ReactIsolatorContext, action: ReactIsolatorActions) => {
    const clone = _.cloneDeep(state);

    switch(action.type) {
      case 'SET_SELECTED_ELEMENT': 
        clone.selectedElementID = action.payload;
        break;
      case 'SET_SELECTED_ELEMENT_POSITION': 
        clone.selectedElementPosition = action.payload;
        break;
      case 'ADD_ELEMENT': 
        clone.reactComponentElements = state.reactComponentElements.concat(action.payload);
        break;
      case 'CLEAR_ELEMENTS': 
        clone.reactComponentElements = [];
        break;
      case 'SET_SEARCH_TERM': 
        clone.searchTerm = action.payload;
        break;
      case 'SET_IS_PENDING_BACKGROUND_RENDER': 
        clone.isPendingBackgroundRender = action.payload;
        break;
      case 'SET_IS_GRID_ON': 
        clone.isGridOn = action.payload;
        break;
      case 'SET_IS_FRAME_RULERS_ON': 
        clone.isFrameRulersOn = action.payload;
        break;
      case 'SET_IS_SIZE_FRAMES_ON': 
        clone.isSizeFramesOn = action.payload;
        break;
      case 'SET_DIVIDER_WIDTH': 
        clone.dividerWidth = action.payload;
        break;
      case 'SET_ZOOM_FRACTION': 
        clone.zoomFraction = action.payload;
        break;
    }
  
    return clone;
  }, 
    Object.assign(defaultState, localStorageWrapper.get(LOCAL_STORAGE_CONTEXT_ID, {}))
  );

  // Store designated attributes of state in local storage
  useEffect(() => {
    localStorageWrapper.set(
      LOCAL_STORAGE_CONTEXT_ID,
      Object.fromEntries(LOCAL_STORAGE_STATE_ATTRIBUTES.map((item) => [item, state[item as keyof typeof state]]))
    );
  }, LOCAL_STORAGE_STATE_ATTRIBUTES.map((item) => state[item as keyof typeof state]));

  return (
    <ReactIsolatorContext.Provider value={{
      ...state,
      dispatch,
    }}>
      { children }
    </ReactIsolatorContext.Provider>
  );
};

export {
  ReactIsolatorContextProvider,
  useReactIsolatorContext
};