import * as React from "react";
import { SVGProps, memo } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={160}
    height={160}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="#F8B700" d="M0 0h160v160H0z" />
    <rect x={32} y={27} width={75} height={105} rx={4} fill="#fff" />
    <circle cx={111} cy={80} r={28} fill="#fff" />
    <circle cx={113.5} cy={79.5} r={14.5} fill="#F8B700" />
    <g filter="url(#a)">
      <path
        d="M32 50h75v78a4 4 0 0 1-4 4H36a4 4 0 0 1-4-4V50Z"
        fill="#FFD166"
      />
    </g>
    <defs>
      <filter
        id="a"
        x={31}
        y={49}
        width={77}
        height={84}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation={0.5}
          result="effect1_foregroundBlur_1172_978"
        />
      </filter>
    </defs>
  </svg>
);

export const AppIcon = memo(SvgComponent);
