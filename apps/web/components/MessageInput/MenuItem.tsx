import Styles from "./MenuItem.module.scss";

import React from "react";

export const MenuItem = ({ icon, title, action, isActive = null }) => (
  <button
    className={`${Styles.menuItem}${
      isActive && isActive() ? " is-active" : ""
    }`}
    onClick={action}
    title={title}
  >
    <svg className="remix">{icon}</svg>
  </button>
);
