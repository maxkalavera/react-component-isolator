import React from "react";

import {
  fireEvent,
  render,
  screen,
  waitFor,
  InspectReactIsolatorContext,
  testingInitialContextState,
  cleanup,
} from "src/utils/test-utils";
import { ReactIsolatorContextProvider } from "src/providers/ReactIsolatorContext";
import Visualizer from "src/components/Visualizer";

import type { ReactIsolatorContext } from "src/providers/ReactIsolatorContext.d";

describe("Components Visualizer", () => {
  const testContext = {
    callback: jest.fn(),
  } as {
    callback: jest.MockedFunction<
      (context: ReactIsolatorContext) =>
        | void
        | boolean
        | {
            x: number;
            y: number;
          }
    >;
  };

  beforeEach(() => {
    render(
      <ReactIsolatorContextProvider
        initialState={{
          ...testingInitialContextState,
          selectedItemPosition: { x: 0, y: 0 },
          isGridOn: false,
          isFrameRulersOn: false,
          isSizeFramesOn: false,
        }}
      >
        <Visualizer />
        <InspectReactIsolatorContext
          callback={(context) => testContext.callback(context)}
        />
      </ReactIsolatorContextProvider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  test("Element in grid area can be dragged", async () => {
    testContext.callback = jest.fn((context: ReactIsolatorContext) => {
      return context.selectedItemPosition;
    });

    const selectedItem = await screen.findByTestId("grid-area-item");
    const { left: mouseX, top: mouseY } = selectedItem.getBoundingClientRect();
    fireEvent.mouseMove(selectedItem, { clientX: mouseX, clientY: mouseY });

    // Move the mouse without been selecting the item
    const callbackCountBefore = testContext.callback.mock.calls.length;
    fireEvent.mouseMove(selectedItem, {
      clientX: mouseX + 20,
      clientY: mouseY + 20,
    });
    fireEvent.mouseMove(selectedItem, {
      clientX: mouseX + 40,
      clientY: mouseY + 40,
    });
    await waitFor(() =>
      expect(testContext.callback).toBeCalledTimes(callbackCountBefore)
    );

    // Mouse the mouse with the item selected
    fireEvent.mouseMove(selectedItem, { clientX: mouseX, clientY: mouseY });
    fireEvent.mouseDown(selectedItem);
    fireEvent.mouseMove(selectedItem, {
      clientX: mouseX + 10,
      clientY: mouseY + 10,
    });
    await waitFor(() =>
      expect(testContext.callback).toHaveLastReturnedWith({ x: 10, y: 10 })
    );

    // Mouse the mouse after releasing the item
    fireEvent.mouseUp(window.document);
    fireEvent.mouseMove(selectedItem, {
      clientX: mouseX + 10,
      clientY: mouseY + 10,
    });
    await waitFor(() =>
      expect(testContext.callback).toHaveLastReturnedWith({ x: 10, y: 10 })
    );
  });

  test("clicking show grid switch button should turn on grid option", async () => {
    testContext.callback = jest.fn((contextState: ReactIsolatorContext) => {
      return contextState.isGridOn;
    });
    // Turn on
    fireEvent.click(await screen.findByTestId("grid-switch-button"));
    await waitFor(() =>
      expect(testContext.callback).toHaveLastReturnedWith(true)
    );
    // Turn off
    fireEvent.click(await screen.findByTestId("grid-switch-button"));
    await waitFor(() =>
      expect(testContext.callback).toHaveLastReturnedWith(false)
    );
  });

  test("clicking show size frames switch button should turn on size frames option", async () => {
    testContext.callback = jest.fn((contextState: ReactIsolatorContext) => {
      return contextState.isSizeFramesOn;
    });
    // Turn on
    fireEvent.click(await screen.findByTestId("size-frames-switch-button"));
    await waitFor(() =>
      expect(testContext.callback).toHaveLastReturnedWith(true)
    );
    // Turn off
    fireEvent.click(await screen.findByTestId("size-frames-switch-button"));
    await waitFor(() =>
      expect(testContext.callback).toHaveLastReturnedWith(false)
    );
  });

  test("clicking show frame rulers switch button should turn on frame rulers option", async () => {
    testContext.callback = jest.fn((contextState: ReactIsolatorContext) => {
      return contextState.isFrameRulersOn;
    });
    // Turn on
    fireEvent.click(await screen.findByTestId("frame-rulers-switch-button"));
    await waitFor(() =>
      expect(testContext.callback).toHaveLastReturnedWith(true)
    );
    // Turn off
    fireEvent.click(await screen.findByTestId("frame-rulers-switch-button"));
    await waitFor(() =>
      expect(testContext.callback).toHaveLastReturnedWith(false)
    );
  });
});
