import React, { ReactElement, useEffect } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { cleanup as reactTestingLibraryCleanUp } from "@testing-library/react";

import {
  useReactIsolatorContext,
  initialContextState,
} from "src/providers/ReactIsolatorContext";

import type { ReactIsolatorContext } from "src/providers/ReactIsolatorContext.d";

const GlobalWrapper = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: GlobalWrapper, ...options });

export function InspectReactIsolatorContext({
  callback,
}: {
  callback: (contextState: ReactIsolatorContext) => any;
}) {
  const contextState = useReactIsolatorContext();

  useEffect(() => {
    callback(contextState);
  });

  return null;
}

export const testingInitialContextState: typeof initialContextState = {
  ...initialContextState,
  isolatedItems: ["First element", "Second element", "Third element"].map(
    (item, index) => ({
      name: item,
      id: `${index}`,
      jsxElement: <h1>{item}</h1>,
    })
  ),
  canvasSize: { width: 0, height: 0 },
  selectedItemID: "0",
  selectedItemIndex: 0,
  selectedItemPosition: { x: 0, y: 0 },
  zoomFraction: "1.00",
  isGridOn: false,
  isFrameRulersOn: false,
  isSizeFramesOn: false,
  darkMode: false,
};

export function cleanup() {
  reactTestingLibraryCleanUp();
  window.localStorage.clear();
}

export * from "@testing-library/react";
export { customRender as render };
