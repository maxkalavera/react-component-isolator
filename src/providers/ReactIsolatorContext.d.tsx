import React from "react";
import { ZOOM_FRACTIONS } from "src/utils/constants";

import type IsolatedItem from "src/components/IsolatedItem.d";

export interface ReactIsolatorContext {
  selectedItemID: string;
  selectedItemIndex: number;
  selectedItemPosition: { x: number; y: number };
  isolatedItems: IsolatedItem[];
  isolatedItemsStamp: string;
  canvasSize: { width: number; height: number };
  searchTerm: string;
  isGridOn: boolean;
  isFrameRulersOn: boolean;
  isSizeFramesOn: boolean;
  dividerWidth: number;
  zoomFraction: (typeof ZOOM_FRACTIONS)[number];
  darkMode: boolean,
  dispatch: React.Dispatch<ReactIsolatorActions>;
}

export type ReactIsolatorActions =
  | {
      type: "SET_SELECTED_ITEM_ID";
      payload: ReactIsolatorContext["selectedItemID"];
    }
  | {
      type: "SET_SELECTED_ITEM_POSITION";
      payload: ReactIsolatorContext["selectedItemPosition"];
    }
  | {
      type: "SLIDE_SELECTED_ITEM_POSITION";
      payload: { deltaX: number; deltaY: number };
    }
  | {
      type: "ADD_ITEM";
      payload: IsolatedItem;
    }
  | {
      type: "CLEAR_ITEMS";
    }
  | {
      type: "SET_CANVAS_SIZE";
      payload: ReactIsolatorContext["canvasSize"];
    }
  | {
      type: "SET_SEARCH_TERM";
      payload: ReactIsolatorContext["searchTerm"];
    }
  | {
      type: "SET_IS_GRID_ON";
      payload: ReactIsolatorContext["isGridOn"];
    }
  | {
      type: "SET_IS_FRAME_RULERS_ON";
      payload: ReactIsolatorContext["isFrameRulersOn"];
    }
  | {
      type: "SET_IS_SIZE_FRAMES_ON";
      payload: ReactIsolatorContext["isSizeFramesOn"];
    }
  | {
      type: "SLIDE_DIVIDER";
      payload: ReactIsolatorContext["dividerWidth"]; // Divider delta
    }
  | {
      type: "SET_ZOOM_FRACTION";
      payload: ReactIsolatorContext["zoomFraction"];
    }
  | {
      type: "SET_DARK_MODE";
      payload: ReactIsolatorContext["darkMode"];
    }
  | {
    type: "TOGLE_DARK_MODE";
  };
