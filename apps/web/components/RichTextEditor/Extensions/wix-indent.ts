import type { Transaction } from "prosemirror-state";
import { TextSelection, AllSelection } from "prosemirror-state";
import type { Command } from "@tiptap/core";
import { isTextSelection } from "@tiptap/core";
import {
  CommandProps,
  Extension,
  isList,
  KeyboardShortcutCommand,
} from "@tiptap/react";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    indentation: {
      /**
       * Increase text indent
       */
      indent: () => ReturnType;
      /**
       * Decrease text indent
       */
      outdent: () => ReturnType;
    };
  }
}

type IndentOptions = {
  names: Array<string>;
  minLevel: number;
  maxLevel: number;
};

const INDENT_SIZE = 24;

export const Indent = Extension.create<IndentOptions, never>({
  type: "extension" as const,
  name: "indent",
  addOptions() {
    return {
      names: ["heading", "paragraph"],
      indentRange: 24,
      minIndentLevel: 0,
      maxIndentLevel: Number.POSITIVE_INFINITY,
      defaultIndentLevel: 0,
      HTMLAttributes: {},
      minLevel: 0,
      maxLevel: Number.POSITIVE_INFINITY,
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.names,
        attributes: {
          indentation: {
            renderHTML: (attributes) => {
              if (attributes.indentation === 0) {
                return {};
              }

              return {
                style: `margin-left: ${attributes.indentation * INDENT_SIZE}px`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands(this) {
    const setNodeIndentMarkup = (
      tr: Transaction,
      pos: number,
      delta: number,
      minLevel: number,
      maxLevel: number
    ): Transaction => {
      const node = tr?.doc?.nodeAt(pos);

      if (node) {
        const nextLevel = (node.attrs.indentation || 0) + delta;
        const indent =
          nextLevel < minLevel
            ? minLevel
            : nextLevel > maxLevel
            ? maxLevel
            : nextLevel;

        if (indent !== node.attrs.indentation) {
          const { indentation: oldIndent, ...currentAttrs } = node.attrs;
          const nodeAttrs =
            indent > minLevel
              ? { ...currentAttrs, indentation: indent }
              : currentAttrs;
          return tr.setNodeMarkup(pos, node.type, nodeAttrs, node.marks);
        }
      }
      return tr;
    };

    const updateIndentationLevel = (
      tr: Transaction,
      options: IndentOptions,
      delta: number
    ): Transaction => {
      const { doc, selection } = tr;

      if (
        doc &&
        selection &&
        (isTextSelection(selection) || selection instanceof AllSelection)
      ) {
        const { from, to } = selection;
        doc.nodesBetween(from, to, (node, pos) => {
          if (options.names.includes) {
            tr = setNodeIndentMarkup(
              tr,
              pos,
              delta,
              options.minLevel,
              options.maxLevel
            );
            return false;
          }

          return true;
        });
      }

      return tr;
    };

    const applyIndentation: (direction: number) => () => Command =
      (direction) =>
      () =>
      ({ tr, state, dispatch }) => {
        const { selection } = state;
        tr = tr.setSelection(selection);
        tr = updateIndentationLevel(tr, this.options, direction);

        if (tr.docChanged) {
          dispatch?.(tr);
          return true;
        }

        return false;
      };
    return {
      indent: applyIndentation(1),
      outdent: applyIndentation(-1),
    };
  },
  addKeyboardShortcuts() {
    return {
      Tab: indent(),
      "Shift-Tab": outdent(false),
    };
  },
});

const indent: () => KeyboardShortcutCommand =
  () =>
  ({ editor }) => {
    return editor.commands.indent();
  };
const outdent: (outdentOnlyAtHead: boolean) => KeyboardShortcutCommand =
  (outdentOnlyAtHead) =>
  ({ editor }) => {
    return editor.commands.outdent();
  };
