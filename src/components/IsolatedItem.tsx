import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

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
      type: 'ADD_ELEMENT',
      payload: {
        name,
        id: uuidv4(),
        jsxElement: element,
      }
    });
  }, []);

  return (<></>);
};


export default IsolatedItem;
