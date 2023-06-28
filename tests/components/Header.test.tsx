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
import Header from "src/components/Header";

import type { ReactIsolatorContext } from "src/providers/ReactIsolatorContext.d";

describe("Header", () => {
  const testContext = {
    callback: jest.fn(),
  } as {
    callback: jest.MockedFunction<
      (context: ReactIsolatorContext) =>
        | void
        | boolean
        | null
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
          darkMode: false,
        }}
      >
        <Header />
        <InspectReactIsolatorContext
          callback={(context) => testContext.callback(context)}
        />
      </ReactIsolatorContextProvider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  test("clicking show frame rulers switch button should turn on frame rulers option", async () => {
    testContext.callback = jest.fn((contextState: ReactIsolatorContext) => {
      return contextState.darkMode;
    });
    // Turn on
    fireEvent.click(await screen.findByTestId("dark-mode--switch-button"));
    await waitFor(() =>
      expect(testContext.callback).toHaveLastReturnedWith(true)
    );
    // Turn off
    fireEvent.click(await screen.findByTestId("dark-mode--switch-button"));
    await waitFor(() =>
      expect(testContext.callback).toHaveLastReturnedWith(false)
    );
  });
});
