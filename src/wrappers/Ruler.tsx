import React, { ReactElement } from "react";


function Ruler({
  children=null
}: {
  children?: ReactElement[] | ReactElement | null
}) {
  return (
    <>
      {children}
    </>
  );
}

export default Ruler;