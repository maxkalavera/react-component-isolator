import React from "react";

import { render, screen, fireEvent } from "src/utils/test-utils";
import { ReactIsolator, IsolatedItem } from "src/main";

describe("ReactIsolator", () => {
  test("renders correctly", async () => {
    render(
      <ReactIsolator>
        <IsolatedItem
          name="Test"
          element={<h1>ab37ff9e-6674-4af2-abc7-58600410733f</h1>}
        />
      </ReactIsolator>
    );
    fireEvent.click(await screen.findByText("Test"));
    expect(
      await screen.findByText("ab37ff9e-6674-4af2-abc7-58600410733f")
    ).toBeInTheDocument();
  });
});
