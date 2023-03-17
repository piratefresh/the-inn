import { useLayoutEffect, useState } from "react";
import bodyScrollLock from "body-scroll-lock";

export const useBodyScrollLock = (initialLocked = false, target = "html") => {
  useLayoutEffect(() => {
    if (!initialLocked) {
      return;
    }

    const targetElement = document.querySelector(target);
    const options = {
      reserveScrollBarGap: true,
      allowTouchMove: (el) => el.classList.contains("scrollable"),
    };

    bodyScrollLock.disableBodyScroll(targetElement, options);

    return () => {
      bodyScrollLock.enableBodyScroll(targetElement);
    };
  }, [initialLocked, target]);
};
