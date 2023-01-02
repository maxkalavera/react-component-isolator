import React, { useEffect } from 'react';

import { useReactIsolatorContext } from 'src/providers/ReactIsolatorContext';

function IsolatedItem({
  name='',
  element=<></>
}: {
  name: string
  element: JSX.Element
}): JSX.Element {
  const { dispatch } = useReactIsolatorContext();

  useEffect(() => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        name,
        id: '',  // ID will be asigned later by the dispatcher of the ReactIsolatorContext
        jsxElement: element,
      }
    });
  }, []);

  return (<></>);
};


export default IsolatedItem;
