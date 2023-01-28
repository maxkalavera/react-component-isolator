import React from "react";

import {fireEvent, render, screen, waitFor, InspectReactIsolatorContext, testingInitialContextState} from "src/utils/test-utils";
import ComponentsMenu from "src/components/ComponentsMenu";
import {ReactIsolatorContextProvider} from 'src/providers/ReactIsolatorContext';

import type {ReactIsolatorContext} from 'src/providers/ReactIsolatorContext.d';

describe('Component ComponentsMenu', () => {
  test('Renders correctly', async () => {
    const callback = jest.fn((contextState: ReactIsolatorContext) => {
      const item = contextState.isolatedItems[contextState.selectedItemIndex];
      return item ? item.name : '';
    });
    render(
      <ReactIsolatorContextProvider
        initialState={testingInitialContextState}
      >
        <ComponentsMenu />
        <InspectReactIsolatorContext callback={callback}/>
      </ReactIsolatorContextProvider>
    );

    expect(await screen.findByText('First element')).toBeInTheDocument();
    expect(await screen.findByText('Second element')).toBeInTheDocument();
    expect(await screen.findByText('Third element')).toBeInTheDocument();

    fireEvent.click(await screen.findByText('Second element'));
    await waitFor(() => expect(callback).toHaveLastReturnedWith('Second element'));

    fireEvent.change(await screen.findByPlaceholderText(/search/i), {target: {value: 'First'}})
    expect(await screen.findByText('First element')).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText('Second element')).not.toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText('Third element')).not.toBeInTheDocument());
  });

});
