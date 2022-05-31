import { Extension } from "@tiptap/core";

export interface FloatOptions {
  types: string[];
  floats: string[];
  defaultFloat: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    float: {
      /**
       * Set the text align attribute
       */
      setFloat: (float: string) => ReturnType;
      /**
       * Unset the text align attribute
       */
      unsetFloat: () => ReturnType;
    };
  }
}

export const Float = Extension.create<FloatOptions>({
  name: "float",

  addOptions() {
    return {
      types: [],
      floats: ["left", "center", "right", "justify"],
      defaultFloat: "left",
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          float: {
            default: this.options.defaultFloat,
            parseHTML: (element) => {
              console.log("element: ", element);
              return element.style.float || this.options.defaultFloat;
            },
            renderHTML: (attributes) => {
              console.log("attrs: ", attributes);
              if (attributes.float === this.options.defaultFloat) {
                return {};
              }

              return { style: `float: ${attributes.float}` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFloat:
        (float: string) =>
        ({ commands }) => {
          if (!this.options.floats.includes(float)) {
            return false;
          }

          return this.options.types.every((type) =>
            commands.updateAttributes(type, { float: float })
          );
        },

      unsetFloat:
        () =>
        ({ commands }) => {
          return this.options.types.every((type) =>
            commands.resetAttributes(type, "float")
          );
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      "Mod-Shift-l": () => this.editor.commands.setFloat("left"),
      "Mod-Shift-e": () => this.editor.commands.setFloat("center"),
      "Mod-Shift-r": () => this.editor.commands.setFloat("right"),
      "Mod-Shift-j": () => this.editor.commands.setFloat("justify"),
    };
  },
});
