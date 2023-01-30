import React from "react";

import {
  render,
  waitFor,
  InspectReactIsolatorContext,
  testingInitialContextState,
  cleanup,
  act,
} from "src/utils/test-utils";
import { ReactIsolatorContextProvider } from "src/providers/ReactIsolatorContext";

import type { Dispatch } from "react";
import type { ReactIsolatorContext } from "src/providers/ReactIsolatorContext.d";
import type { ReactIsolatorActions } from "src/providers/ReactIsolatorContext.d";

describe("Provider ReactIsolatorContext", () => {
  const testContext: {
    initialContextState: typeof testingInitialContextState;
    dispatch?: Dispatch<ReactIsolatorActions>;
    callback?: jest.MockedFunction<(context: ReactIsolatorContext) => void | {
      x: number;
      y: number;
    }>;
  } = {
    initialContextState: {
      ...testingInitialContextState,
      isolatedItems: ["First element", "Second element", "Third element"].map(
        (item, index) => ({
          name: item,
          id: `${index}`,
          jsxElement: <h1>{item}</h1>,
        })
      ),
      canvasSize: { width: 800, height: 600 },
      selectedItemID: "0",
      selectedItemIndex: 0,
      selectedItemPosition: { x: 0, y: 0 },
    },
  };

  beforeEach(() => {
    render(
      <ReactIsolatorContextProvider
        initialState={testContext.initialContextState}
      >
        <InspectReactIsolatorContext
          callback={(context: ReactIsolatorContext) => {
            testContext.callback && testContext.callback(context);
            testContext.dispatch = context.dispatch;
          }}
        />
      </ReactIsolatorContextProvider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  test("When selected an item should be centered in the canvas", async () => {
    if (testContext.dispatch === undefined) throw "Dispatcher undefined";
    const selectedItemIDCallback = jest.fn();
    const selectedItemPositionCallback = jest.fn();
    testContext.callback = jest.fn((context: ReactIsolatorContext) => {
      selectedItemIDCallback(context.selectedItemID);
      selectedItemPositionCallback(context.selectedItemPosition);
    });
    const centeredPosition = {
      x: Math.floor(testContext.initialContextState.canvasSize.width / 2),
      y: Math.floor(testContext.initialContextState.canvasSize.height / 2),
    };

    await waitFor(() => expect(testContext.dispatch).toBeDefined());
    expect(testContext.dispatch).toBeDefined();

    act(() => {
      testContext.dispatch &&
        testContext.dispatch({ type: "SET_SELECTED_ITEM_ID", payload: "1" });
    });

    // Test if the value is around the expected plus/minus 1.0
    await waitFor(() =>
      expect(selectedItemIDCallback).toHaveBeenLastCalledWith("1")
    );
    const lastPosition = (selectedItemPositionCallback.mock.lastCall as {x: number; y: number;}[])[0];
    expect(Math.abs(centeredPosition.x - lastPosition.x)).toBeLessThanOrEqual(
      1.0
    );
    expect(Math.abs(centeredPosition.y - lastPosition.y)).toBeLessThanOrEqual(
      1.0
    );
  });

  test("Selected item could never be outside the canvas cords", async () => {
    testContext.callback = jest.fn(
      (context: ReactIsolatorContext) => context.selectedItemPosition
    );
    const canvasSize = testContext.initialContextState.canvasSize;
    const centeredPosition = {
      x: Math.floor(canvasSize.width / 2),
      y: Math.floor(canvasSize.height / 2),
    };
    act(() => {
      testContext.dispatch &&
        testContext.dispatch({
          type: "SET_SELECTED_ITEM_POSITION",
          payload: centeredPosition,
        });
    });
    await waitFor(() =>
      expect(testContext.callback).toHaveLastReturnedWith(centeredPosition)
    );
    act(() => {
      testContext.dispatch &&
        testContext.dispatch({
          type: "SET_SELECTED_ITEM_POSITION",
          payload: { x: -1, y: -1 },
        });
    });
    await waitFor(() =>
      expect(testContext.callback).toHaveLastReturnedWith({ x: 0, y: 0 })
    );
    act(() => {
      testContext.dispatch &&
        testContext.dispatch({
          type: "SET_SELECTED_ITEM_POSITION",
          payload: {
            x: Math.floor(canvasSize.width + 1),
            y: Math.floor(canvasSize.height + 1),
          },
        });
    });
    await waitFor(() =>
      expect(testContext.callback).toHaveLastReturnedWith({
        x: canvasSize.width,
        y: canvasSize.height,
      })
    );
  });
});
