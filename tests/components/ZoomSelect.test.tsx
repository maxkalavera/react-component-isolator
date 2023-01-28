import React, { useCallback } from "react";

import {render, InspectReactIsolatorContext, testingInitialContextState, screen, fireEvent, waitFor, cleanup} from "src/utils/test-utils";
import {ReactIsolatorContextProvider} from 'src/providers/ReactIsolatorContext';
import ZoomSelect from "src/components/ZoomSelect";

import type {ReactIsolatorContext} from 'src/providers/ReactIsolatorContext.d';
import { forEach } from "lodash";

describe('Component ZoomSelect', () => {
  var callback: jest.Mock
  const initialZoomFraction = '1.00'

  beforeEach(() => {
    callback = jest.fn((contextState: ReactIsolatorContext) => {
      return contextState.zoomFraction;
    })
    render(
      <ReactIsolatorContextProvider
        initialState={{
          ...testingInitialContextState,
          zoomFraction: initialZoomFraction
        }}
      >
        <ZoomSelect />
        <InspectReactIsolatorContext callback={callback}/>
      </ReactIsolatorContextProvider>
    )
  })

  afterEach(() => {
    cleanup()
  })

  test('should increase Zoom when an option with higher value is selected', async () => {
    const select = await screen.findByTestId('zoom-select') as HTMLSelectElement
    const options = Object.values(select.options)
    const higherZoomOption = options.find((item) => item.value > initialZoomFraction)
    fireEvent.change(select, {target: {value: higherZoomOption?.value}})
    expect(parseFloat(select.value)).toBeGreaterThan(parseFloat(initialZoomFraction))
  })

  test('should decrease Zoom when option with lower value is selected', async () => {
    const select = await screen.findByTestId('zoom-select') as HTMLSelectElement
    const options = Object.values(select.options)
    const higherZoomOption = options.find((item) => item.value < initialZoomFraction)
    fireEvent.change(select, {target: {value: higherZoomOption?.value}})
    expect(parseFloat(select.value)).toBeLessThan(parseFloat(initialZoomFraction))
  })

})