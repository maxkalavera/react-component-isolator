// Set React Version
if (process.env.REACT_VERSION_ALIAS) {
  const version = process.env.REACT_VERSION_ALIAS.replace(/\s+/g, "").split(
    ","
  );
  jest.mock("react", () => require(version[0]) as NodeModule);
  jest.mock("react-dom", () => require(version[1]) as NodeModule);
  jest.mock("@testing-library/react", () => require(version[2]) as NodeModule);
}

import { configure } from "@testing-library/dom";

configure({
  computedStyleSupportsPseudoElements: true,
});

// Set up width so canvasBackground element could have width and height
beforeEach(() => {
  HTMLCanvasElement.prototype.getContext = jest.fn(() => null);
  class DOMRect {
    x: number;
    y: number;
    width: number;
    height: number;
    top: number;
    right: number;
    bottom: number;
    left: number;

    constructor(x: number, y: number, width: number, height: number) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.top = height > 0 ? y : y + height;
      this.right = width > 0 ? x + width : x;
      this.bottom = height > 0 ? y + height : height;
      this.left = width > 0 ? x : x + width;
      this.toJSON = () => "";
    }

    toJSON() {
      return JSON.stringify(this);
    }
  }

  const viewportSize = global.viewportSizes[0];
  Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
    configurable: true,
    value: viewportSize.width,
  });
  Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
    configurable: true,
    value: viewportSize.height,
  });
  HTMLElement.prototype.getBoundingClientRect = jest.fn(() => {
    return new DOMRect(0, 0, viewportSize.width, viewportSize.height);
  });
});
