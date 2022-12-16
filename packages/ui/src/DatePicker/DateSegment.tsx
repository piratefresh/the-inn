import { useRef } from "react";
import { useDateSegment } from "@react-aria/datepicker";
import { DateFieldState, DateSegment as DST } from "@react-stately/datepicker";
import { styled } from "../theme";

const Flex = styled("div", {
  paddingLeft: "0.125rem" /* 2px */,
  paddingRight: "0.125rem" /* 2px */,
  boxSizing: "content-box",
});
const StyledWrapper = styled("div", {
  display: "block",
  width: "100%",
  textAlign: "center",
});

interface DateSegmentProps {
  segment: DST;
  state: DateFieldState;
}

export function DateSegment({ segment, state }: DateSegmentProps) {
  let ref = useRef(null);
  let { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <Flex
      {...segmentProps}
      ref={ref}
      style={{
        ...segmentProps.style,
        minWidth:
          segment.maxValue != null
            ? String(segment.maxValue).length + "ch"
            : undefined,
      }}
      className={`px-0.5 box-content tabular-nums text-right outline-none rounded-sm focus:bg-violet-600 focus:text-white group ${
        !segment.isEditable ? "text-gray-500" : "text-gray-800"
      }`}
    >
      {/* Always reserve space for the placeholder, to prevent layout shift when editing. */}
      <StyledWrapper
        aria-hidden="true"
        className="block w-full text-center italic text-gray-500 group-focus:text-white"
        css={{
          visibility: segment.isPlaceholder ? "" : "hidden",
          height: segment.isPlaceholder ? "" : 0,
          pointerEvents: "none",
        }}
      >
        {segment.placeholder}
      </StyledWrapper>
      {segment.isPlaceholder ? "" : segment.text}
    </Flex>
  );
}
