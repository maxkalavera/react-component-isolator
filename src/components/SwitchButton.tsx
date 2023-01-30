import React, { ReactNode } from "react";

import styles from "src/styles/switch-button.module.css";

function SwitchButton({
  children = [],
  value = false,
  onChange = () => undefined,
  ...extraProps
}: {
  value?: boolean;
  children?: ReactNode[] | ReactNode;
  onChange?: () => void;
  "data-testid"?: string;
}) {
  return (
    <button
      className={`${styles["switch-button"]} ${
        value ? styles["switch-button--on"] : ""
      }`}
      onClick={() => onChange()}
      data-testid={extraProps["data-testid"] ? extraProps["data-testid"] : ""}
    >
      {children}
    </button>
  );
}

export default SwitchButton;
