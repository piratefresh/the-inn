import * as React from "react";
import { SVGProps, Ref, forwardRef, memo } from "react";

const SvgComponent = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M13 7h4V5H7v2h4v3h2V7ZM11 19v-5h2v5h-2ZM5 13h14v-2H5v2Z"
      fill="currentColor"
    />
  </svg>
);

const ForwardRef = forwardRef(SvgComponent);
const StrikeThroughIcon = memo(ForwardRef);
export default StrikeThroughIcon;
