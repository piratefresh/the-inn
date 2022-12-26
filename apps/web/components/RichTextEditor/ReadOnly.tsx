import React from "react";
import { Text } from "ui";
import { styled } from "@components/Theme/Theme";
import ReadOnlyStyles from "./ReadOnly.module.scss";

interface ReadOnlyProps {
  textString: string;
}

const StyledContent = styled("div", {
  "p:empty:before": {
    whiteSpace: "pre",
  },
});

export const ReadOnly = ({ textString }: ReadOnlyProps) => {
  return (
    <Text style={{ fontFamily: "Alegreya Sans" }} size="xl" color="loContrast">
      <StyledContent
        className={ReadOnlyStyles["root"]}
        style={{ whiteSpace: "pre-wrap" }}
        dangerouslySetInnerHTML={{ __html: textString }}
      />
    </Text>
  );
};
