import React, { useEffect } from 'react';

import { useReactIsolatorContext } from 'src/providers/ReactIsolatorContext';

function IsolatedItem({
  name='',
  element=<></>
}: {
  name: string
  element: JSX.Element
}): JSX.Element {
  const { addItem } = useReactIsolatorContext();

  useEffect(() => {
    addItem({
      name,
      jsxElement: element,
    });
  }, []);

  return (<></>);
};

export default IsolatedItem;
