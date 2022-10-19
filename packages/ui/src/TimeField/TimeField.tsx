import { styled } from "../theme";
import { useRef } from "react";
import { useLocale } from "@react-aria/i18n";
import { useTimeFieldState } from "@react-stately/datepicker";
import { useTimeField } from "@react-aria/datepicker";
import { DateSegment } from "../DatePicker";

const StyledTimeField = styled("div", {});
const Flex = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
});
const StyledWrapper = styled("div", {
  display: "flex",
  backgroundColor: "$loContrast",
  padding: "$4",

  variants: {
    gold: {
      true: {
        borderRadius: "$radii$md",
        border: "3px solid transparent",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        backgroundImage:
          "linear-gradient($whiteBrand, $whiteBrand),linear-gradient($yellowBrand, $orangeBrand)",
      },
    },
  },
});

export const TimeField = (props) => {
  let { locale } = useLocale();
  let state = useTimeFieldState({
    ...props,
    locale,
  });

  let ref = useRef();
  let { labelProps, fieldProps } = useTimeField(props, state, ref);
  return (
    <Flex>
      <StyledWrapper
        gold
        {...fieldProps}
        ref={ref}
        className="flex bg-white border border-gray-300 hover:border-gray-400 transition-colors rounded-md pr-8 focus-within:border-violet-600 focus-within:hover:border-violet-600 p-1"
      >
        {state.segments.map((segment, i) => (
          <DateSegment key={i} segment={segment} state={state} />
        ))}
      </StyledWrapper>
    </Flex>
  );
};
