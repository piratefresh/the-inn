import { useRef } from "react";
import { useDateSegment } from "@react-aria/datepicker";
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

export function DateSegment({ segment, state }) {
  let ref = useRef();
  let { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <Flex
      {...segmentProps}
      ref={ref}
      style={{
        ...segmentProps.style,
        minWidth:
          segment.maxValue != null && String(segment.maxValue).length + "ch",
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
