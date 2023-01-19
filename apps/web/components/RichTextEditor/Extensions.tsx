import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import FontFamily from "@tiptap/extension-font-family";
import Link from "@tiptap/extension-link";
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
import { Extensions, mergeAttributes } from "@tiptap/react";
import { BackgroundColor } from "./Extensions/backgroundColor";
import { ColumnExtension } from "./Extensions/columns";
import { SnippetExtension } from "./Extensions/snippet";
import { TableOfContents } from "./Extensions/tableOfContents";
import { Bookmark } from "./Extensions/bookmark";

export const extensions = ({ upload }): Extensions => [
  StarterKit.configure({
    heading: false,
  }),
  Heading.configure({ levels: [1, 2] }).extend({
    levels: [1, 2],
    renderHTML({ node, HTMLAttributes }) {
      const level = this.options.levels.includes(node.attrs.level)
        ? node.attrs.level
        : this.options.levels[0];
      const classes = {
        1: "text-4xl",
        2: "text-2xl",
        3: "text-xl",
        4: "text-lg",
        5: "text-sm",
      };
      return [
        `h${level}`,
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          class: `${classes[level]}`,
        }),
        0,
      ];
    },
    addAttributes() {
      return {
        ...this.parent?.(),
        class: {
          default: null,
        },
      };
    },
    addCommands() {
      return {
        ...this.parent?.(),
        setClass:
          (className) =>
          ({ commands, editor }) => {
            console.log("editor: ", editor.getAttributes("heading").class);
            if (editor?.getAttributes("heading").class.contains(className)) {
              return commands.updateAttributes("heading", { class: null });
            }
            return commands.updateAttributes("heading", { class: className });
          },
      };
    },
  }),
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
  Link,
  CustomImage(upload),
  ReactComponent,
  ColumnExtension,
  BackgroundColor,
  SnippetExtension,
  TableOfContents,
  Bookmark,
];
