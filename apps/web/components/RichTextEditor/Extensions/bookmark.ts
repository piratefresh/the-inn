import {
  Mark,
  markInputRule,
  markPasteRule,
  mergeAttributes,
} from "@tiptap/core";

export interface BoldOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    bookmark: {
      /**
       * Set a bold mark
       */
      setBookmark: () => ReturnType;
      /**
       * Toggle a bold mark
       */
      toggleBookmark: () => ReturnType;
      /**
       * Unset a bold mark
       */
      unsetBookmark: () => ReturnType;
    };
  }
}

export const Bookmark = Mark.create<BoldOptions>({
  name: "bookmark",

  addOptions() {
    return {
      HTMLAttributes: {
        class: "bookmark",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div",
        class: "bookmark",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setBookmark:
        () =>
        ({ commands }) => {
          return commands.setMark(this.name);
        },
      toggleBookmark:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
      unsetBookmark:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});
