import React from "react";

import {
  render,
  InspectReactIsolatorContext,
  testingInitialContextState,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "src/utils/test-utils";
import { ReactIsolatorContextProvider } from "src/providers/ReactIsolatorContext";
import ZoomBar from "src/components/ZoomBar";

import type { ReactIsolatorContext } from "src/providers/ReactIsolatorContext.d";

describe("Component ZoomBar", () => {
  let callback = jest.fn();
  beforeEach(() => {
    callback = jest.fn((contextState: ReactIsolatorContext) => {
      return contextState.zoomFraction;
    });
    render(
      <ReactIsolatorContextProvider initialState={testingInitialContextState}>
        <ZoomBar />
        <InspectReactIsolatorContext callback={callback} />
      </ReactIsolatorContextProvider>
    );
  });

  afterEach(() => {
    cleanup();
    window.localStorage.clear();
  });

  test("should increase Zoom when up button is pressed", async () => {
    fireEvent.click(await screen.findByTestId("zoombar-up"));
    await waitFor(() =>
      expect(
        parseFloat(
          callback.mock.results[callback.mock.results.length - 1].value as string
        )
      ).toBeGreaterThan(1.0)
    );
  });

  test("should decrease Zoom when down button is pressed", async () => {
    fireEvent.click(await screen.findByTestId("zoombar-down"));
    await waitFor(() =>
      expect(
        parseFloat(
          callback.mock.results[callback.mock.results.length - 1].value as string
        )
      ).toBeLessThan(1.0)
    );
  });
});
