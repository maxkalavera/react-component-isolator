import { useEffect, useState } from 'react';
import { ROOT_ELEMENT_ID } from 'src/utils/constants';

function useComputedStyle() {
  const [computedStyle, setComputedStyle] = useState<CSSStyleDeclaration>();

  useEffect(() => {
    const reactIsolatorElement = document.getElementById(ROOT_ELEMENT_ID);
    if (reactIsolatorElement === null) return;
    setComputedStyle(window.getComputedStyle(reactIsolatorElement));  
  }, []);

  return computedStyle;
};

export default useComputedStyle;
