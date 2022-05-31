import * as React from "react";
import { SVGProps, memo } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.135 9h3L10 14.607H7L9.135 9ZM14.135 9h3L15 14.607h-3L14.135 9Z"
      fill="currentColor"
    />
  </svg>
);

const QuoteIcon = memo(SvgComponent);
export default QuoteIcon;
