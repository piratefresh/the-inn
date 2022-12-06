import React from "react";
import { Text } from "ui";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import FontFamily from "@tiptap/extension-font-family";
import { FontSize } from "@components/RichTextEditor/Extensions/font-size";
import { Float } from "@components/RichTextEditor/Extensions/float";
import { TrailingNode } from "@components/RichTextEditor/Extensions/TrailingNode";
import { styled } from "@components/Theme/Theme";
import ReadOnlyStyles from "./ReadOnly.module.scss";
import { JSONContent } from "@tiptap/react";

interface ReadOnlyProps {
  jsonString: JSONContent | string;
}

const StyledContent = styled("div", {
  "p:empty:before": {
    content: " ",
    whiteSpace: "pre",
  },
});

export const ReadOnly = ({ jsonString }: ReadOnlyProps) => {
  const description = React.useMemo(() => {
    if (jsonString) {
      // @ts-ignore
      return generateHTML(JSON.parse(jsonString), [
        StarterKit,
        Image.configure({
          inline: true,
        }),
        TextAlign.configure({
          types: ["heading", "paragraph", "image", "img"],
          defaultAlignment: "none",
        }),
        TextStyle,
        Underline,
        FontFamily,
        FontSize,
        TrailingNode,
        Float.configure({
          types: ["image", "img"],
        }),
      ]);
    }

    return "";
  }, [jsonString]);

  return (
    <Text style={{ fontFamily: "Alegreya Sans" }} size="xl" color="loContrast">
      <StyledContent
        className={ReadOnlyStyles["root"]}
        style={{ whiteSpace: "pre-wrap" }}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </Text>
  );
};
