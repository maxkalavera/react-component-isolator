import React, { useContext, useEffect, useReducer } from "react";
import _ from "lodash";
import sha256 from "crypto-js/sha256";

import useComputedStyle from "src/hooks/useComputedStyle";
import localStorageWrapper from "src/utils/localStorageWrapper";
import { LOCAL_STORAGE_CONTEXT_ID, ROOT_ELEMENT_ID } from "src/utils/constants";
import type {
  ReactIsolatorContext,
  ReactIsolatorActions,
} from "src/providers/ReactIsolatorContext.d";

const LOCAL_STORAGE_STATE_ATTRIBUTES: Array<keyof ReactIsolatorContext> = [
  "selectedItemID",
  "selectedItemPosition",
  "searchTerm",
  "isGridOn",
  "isFrameRulersOn",
  "isSizeFramesOn",
  "dividerWidth",
  "zoomFraction",
  "darkMode",
];

const initialContextState: ReactIsolatorContext = {
  selectedItemID: "",
  selectedItemIndex: -1,
  selectedItemPosition: { x: 0, y: 0 },
  isolatedItems: [],
  isolatedItemsStamp: "",
  canvasSize: { width: 0, height: 0 },
  searchTerm: "",
  isGridOn: true,
  isFrameRulersOn: true,
  isSizeFramesOn: true,
  dividerWidth: 191,
  zoomFraction: "1.00",
  darkMode: false,
  dispatch: () => undefined,
};

const ReactIsolatorContext =
  React.createContext<ReactIsolatorContext>(initialContextState);

function useReactIsolatorContext(): ReactIsolatorContext {
  return useContext<ReactIsolatorContext>(ReactIsolatorContext);
}

function ReactIsolatorContextProvider({
  children = [],
  initialState = initialContextState,
}: {
  children?: JSX.Element[] | JSX.Element;
  initialState?: ReactIsolatorContext;
}): JSX.Element {
  const computedStyle = useComputedStyle();
  const [state, dispatch] = useReducer(
    (state: ReactIsolatorContext, action: ReactIsolatorActions) => {
      const clone = _.cloneDeep(state);

      const restrainSelectedItemPosition = () => {
        // Force selected item position update to be inside de canvas
        if (clone.selectedItemPosition.x < 0) {
          clone.selectedItemPosition.x = 0;
        } else if (clone.selectedItemPosition.x > clone.canvasSize.width) {
          clone.selectedItemPosition.x = clone.canvasSize.width;
        }

        if (clone.selectedItemPosition.y < 0) {
          clone.selectedItemPosition.y = 0;
        } else if (clone.selectedItemPosition.y > clone.canvasSize.height) {
          clone.selectedItemPosition.y = clone.canvasSize.height;
        }
      };

      switch (action.type) {
        case "SET_SELECTED_ITEM_ID":
          clone.selectedItemID = action.payload;
          clone.selectedItemIndex = clone.isolatedItems.findIndex(
            (item) => item.id === clone.selectedItemID
          );
          clone.selectedItemPosition = {
            x: Math.floor(clone.canvasSize.width / 2),
            y: Math.floor(clone.canvasSize.height / 2),
          };
          break;
        case "SET_SELECTED_ITEM_POSITION":
          clone.selectedItemPosition = action.payload;
          restrainSelectedItemPosition();
          break;
        case "SLIDE_SELECTED_ITEM_POSITION":
          clone.selectedItemPosition.x += action.payload.deltaX;
          clone.selectedItemPosition.y += action.payload.deltaY;
          restrainSelectedItemPosition();
          break;
        case "ADD_ITEM":
          action.payload.id = sha256(
            `${(action.payload.jsxElement.type as string).toString()}${
              state.isolatedItems.length
            }`
          ).toString();
          clone.isolatedItems = state.isolatedItems.concat(action.payload);
          clone.isolatedItemsStamp = sha256(
            state.isolatedItems.map((item) => item.id).toString()
          ).toString();
          clone.selectedItemIndex = clone.isolatedItems.findIndex(
            (item) => item.id === clone.selectedItemID
          );
          break;
        case "CLEAR_ITEMS":
          clone.isolatedItems = [];
          clone.isolatedItemsStamp = sha256(
            state.isolatedItems.map((item) => item.id).toString()
          ).toString();
          clone.selectedItemIndex = clone.isolatedItems.findIndex(
            (item) => item.id === clone.selectedItemID
          );
          break;
        case "SET_CANVAS_SIZE":
          clone.canvasSize = action.payload;
          restrainSelectedItemPosition();
          break;
        case "SET_SEARCH_TERM":
          clone.searchTerm = action.payload;
          break;
        case "SET_IS_GRID_ON":
          clone.isGridOn = action.payload;
          break;
        case "SET_IS_FRAME_RULERS_ON":
          clone.isFrameRulersOn = action.payload;
          break;
        case "SET_IS_SIZE_FRAMES_ON":
          clone.isSizeFramesOn = action.payload;
          break;
        case "SLIDE_DIVIDER":
          if (computedStyle) {
            const dividerMinWidth = parseInt(
              computedStyle.getPropertyValue("--divider-min-width")
            );
            const dividerMaxWidth = parseInt(
              computedStyle.getPropertyValue("--divider-max-width")
            );
            clone.dividerWidth += action.payload;

            if (clone.dividerWidth < dividerMinWidth) {
              clone.dividerWidth = dividerMinWidth;
            } else if (clone.dividerWidth > dividerMaxWidth) {
              clone.dividerWidth = dividerMaxWidth;
            }
          }
          break;
        case "SET_ZOOM_FRACTION":
          clone.zoomFraction = action.payload;
          break;
        case "SET_DARK_MODE":
          clone.darkMode = action.payload;
          break;
        case "TOGLE_DARK_MODE":
          clone.darkMode = !clone.darkMode;
          break;
      }
      return clone;
    },
    Object.assign(
      initialState,
      localStorageWrapper.get(
        LOCAL_STORAGE_CONTEXT_ID,
        {}
      ) as ReactIsolatorContext
    )
  );

  // Store designated attributes of state in local storage
  useEffect(
    () => {
      localStorageWrapper.set(
        LOCAL_STORAGE_CONTEXT_ID,
        Object.fromEntries(
          LOCAL_STORAGE_STATE_ATTRIBUTES.map((item) => [item, state[item]])
        )
      );
    },
    LOCAL_STORAGE_STATE_ATTRIBUTES.map((item) => state[item])
  );

  useEffect(() => {
    dispatch({
      type: 'SET_DARK_MODE',
      payload: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    });
  }, []);

  return (
    <ReactIsolatorContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </ReactIsolatorContext.Provider>
  );
}

export {
  initialContextState,
  ReactIsolatorContextProvider,
  useReactIsolatorContext,
};
