import React from "react";

export const ImageComponent = () => {
  const imageRef = React.useRef<HTMLImageElement>();

  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={imageRef} alt="image" />;
};
