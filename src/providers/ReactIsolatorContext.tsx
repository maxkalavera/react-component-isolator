import React, { useContext, useEffect, useReducer } from 'react';
import _ from 'lodash';
import sha256 from 'crypto-js/sha256';

import localStorageWrapper from 'src/utils/localStorageWrapper';
import { ZOOM_FRACTIONS, LOCAL_STORAGE_CONTEXT_ID, DIVIDER_DEFAULT_WIDTH } from 'src/utils/constants';

import type IsolatedItem from 'src/interfaces/IsolatedItem.interfaces';

export interface ReactIsolatorContext {
  selectedItemID: string
  selectedItemIndex: number
  selectedItemPosition: { x: number, y: number }
  isolatedItems: IsolatedItem[]
  isolatedItemsStamp: string
  canvasSize: { width: number, height: number }
  searchTerm: string
  isGridOn: boolean
  isFrameRulersOn: boolean
  isSizeFramesOn: boolean
  dividerWidth: number
  zoomFraction: (typeof ZOOM_FRACTIONS)[number]
  dispatch: React.Dispatch<ReactIsolatorActions>,
};

type ReactIsolatorActions = {
  type: 'SET_SELECTED_ITEM_ID',
  payload:  ReactIsolatorContext['selectedItemID']
} | {
  type: 'SET_SELECTED_ITEM_POSITION',
  payload:  ReactIsolatorContext['selectedItemPosition']
} | {
  type: 'SLIDE_SELECTED_ITEM_POSITION',
  payload:  { deltaX: number, deltaY: number }
} | {
  type: 'ADD_ITEM',
  payload:  IsolatedItem
} | {
  type: 'CLEAR_ITEMS'
} | {
  type: 'SET_CANVAS_SIZE',
  payload: ReactIsolatorContext['canvasSize']
} | {
  type: 'SET_SEARCH_TERM',
  payload:  ReactIsolatorContext['searchTerm']
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
  'selectedItemID', 'selectedItemPosition', 'searchTerm', 'isGridOn', 'isFrameRulersOn', 
  'isSizeFramesOn', 'dividerWidth', 'zoomFraction'
];

const defaultState: ReactIsolatorContext = {
  selectedItemID: '',
  selectedItemIndex: -1,
  selectedItemPosition: {x: 0, y: 0},
  isolatedItems: [],
  isolatedItemsStamp: '',
  canvasSize: { width: 0, height: 0},
  searchTerm: '',
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

    const restrainSelectedItemPosition = () => {
        // Force selected item position update to be inside de canvas
        if (clone.selectedItemPosition.x < 0) {
          clone.selectedItemPosition.x = 0;
        } else if (clone.selectedItemPosition.x > clone.canvasSize.width) {
          clone.selectedItemPosition.x = clone.canvasSize.width;
        } else if (clone.selectedItemPosition.y < 0) {
          clone.selectedItemPosition.y = 0;
        } else if (clone.selectedItemPosition.y > clone.canvasSize.height) {
          clone.selectedItemPosition.y = clone.canvasSize.height;
        }
    }

    switch(action.type) {
      case 'SET_SELECTED_ITEM_ID':
        clone.selectedItemID = action.payload;
        clone.selectedItemIndex = clone.isolatedItems.findIndex((item) => item.id === clone.selectedItemID);
        clone.selectedItemPosition = {
          x: Math.floor(clone.canvasSize.width / 2), 
          y: Math.floor(clone.canvasSize.height / 2)
        };
        break;
      case 'SET_SELECTED_ITEM_POSITION':
        clone.selectedItemPosition = action.payload;
        restrainSelectedItemPosition();
        break;
      case 'SLIDE_SELECTED_ITEM_POSITION':
        clone.selectedItemPosition.x += action.payload.deltaX;
        clone.selectedItemPosition.y += action.payload.deltaY;
        restrainSelectedItemPosition();
        break;
      case 'ADD_ITEM': 
        const item = action.payload;
        item.id = sha256(`${item.jsxElement.type.toString()}${state.isolatedItems.length}`).toString();
        clone.isolatedItems = state.isolatedItems.concat(item);
        clone.isolatedItemsStamp = sha256(state.isolatedItems.map((item) => item.id).toString()).toString();
        clone.selectedItemIndex = clone.isolatedItems.findIndex((item) => item.id === clone.selectedItemID);
        break;
      case 'CLEAR_ITEMS': 
        clone.isolatedItems = [];
        clone.isolatedItemsStamp = sha256(state.isolatedItems.map((item) => item.id).toString()).toString();
        clone.selectedItemIndex = clone.isolatedItems.findIndex((item) => item.id === clone.selectedItemID);
        break;
      case 'SET_CANVAS_SIZE':
        clone.canvasSize = action.payload;
        restrainSelectedItemPosition();
        break;
      case 'SET_SEARCH_TERM': 
        clone.searchTerm = action.payload;
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