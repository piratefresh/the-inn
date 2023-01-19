// 1. Import the extension
import Image from "@tiptap/extension-image";
import {
  mergeAttributes,
  NodeViewRenderer,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import { ResizeImageComponent } from "../Components/resizeImageComponent";
import { UploadFn, uploadImagePlugin } from "../upload-image";

// 2. Overwrite the keyboard shortcuts
const CustomImage = (uploadFn: UploadFn) =>
  Image.extend({
    selectable: true,
    group: "block",

    draggable: true,
    addAttributes() {
      return {
        // Inherit all the attrs of the Image extension
        ...this.parent?.(),

        // New attrs
        width: {
          default: "100%",
          // tell them to render on the img tag
          renderHTML: (attributes) => {
            return {
              width: attributes.width,
            };
          },
        },

        height: {
          default: "auto",
          renderHTML: (attributes) => {
            return {
              height: attributes.height,
            };
          },
        },

        // We'll use this to tell if we are going to drag the image
        // through the editor or if we are resizing it
        isDraggable: {
          default: true,
          // We don't want it to render on the img tag
          renderHTML: (attributes) => {
            return {};
          },
        },
      };
    },

    addNodeView() {
      return ReactNodeViewRenderer(ResizeImageComponent);
    },
    onFocus({ event }) {},

    addProseMirrorPlugins() {
      return [uploadImagePlugin(uploadFn)];
    },
  });

export default CustomImage;
