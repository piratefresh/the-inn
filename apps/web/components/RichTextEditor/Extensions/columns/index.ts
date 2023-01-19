import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";
import { Column } from "./Column";
import { ColumnBlock } from "./ColumnBlock";

export interface ColumnExtensionOptions {
  column?: boolean;
  columnBlock?: boolean;
}

export const ColumnExtension = Extension.create<ColumnExtensionOptions>({
  name: "columnExtension",

  addExtensions() {
    const extensions = [];

    if (this.options.column !== false) {
      extensions.push(Column);
    }

    if (this.options.columnBlock !== false) {
      extensions.push(ColumnBlock);
    }

    return extensions;
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("hover"),
        props: {
          handleDOMEvents: {
            mouseover(view, event) {
              console.log("Hover: ");
            },
          },
        },
      }),
    ];
  },
});
