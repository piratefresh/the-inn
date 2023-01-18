import StarterKit from "@tiptap/starter-kit";
import FontFamily from "@tiptap/extension-font-family";
// import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
// import { ColumnExtension } from "@gocapsule/column-extension";
import { TrailingNode } from "./Extensions/TrailingNode";
import CustomImage from "./Extensions/custom-image";
import { Float } from "./Extensions/float";
import { FontSize } from "./Extensions/font-size";
import { Indent } from "./Extensions/wix-indent";
import ReactComponent from "./Extensions/react-component";
import { Extensions } from "@tiptap/react";
import { BackgroundColor } from "./Extensions/backgroundColor";
import { ColumnExtension } from "./Extensions/columns";

export const extensions = ({ upload }): Extensions => [
  StarterKit,
  TextStyle,
  Underline,
  FontFamily,
  FontSize,
  TrailingNode,
  TextAlign.configure({
    types: ["heading", "paragraph", "image", "img"],
    defaultAlignment: "none",
  }),
  Float.configure({
    types: ["image", "img"],
  }),
  Indent,
  CustomImage(upload),
  ReactComponent,
  ColumnExtension,
  BackgroundColor,
];
