import React from "react";
import FontFamily from "@tiptap/extension-font-family";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCreateImageSignatureMutation } from "generated/graphql";
import { ControllerRenderProps } from "react-hook-form";
import { TrailingNode } from "./Extensions/TrailingNode";
import CustomImage from "./Extensions/custom-image";
import { Float } from "./Extensions/float";
import { FontSize } from "./Extensions/font-size";
import RichTextEditorStyles from "./RichTextEditor.module.css";
import Toolbar from "./Toolbar";
import { useAppDispatch, useAppSelector } from "@store/store";
import { setFontSize } from "@features/richTextEditorSlice/richTextEditorSlice";

interface GetSelectedNodesProps {
  editor: Editor;
}

interface RichTextEditorProps extends ControllerRenderProps<any> {
  content?: string;
}

export const getSelectedNodes = ({ editor }: GetSelectedNodesProps) => {
  const selection = editor.state.selection;

  const nodes: Node[] = [];
  editor.state.doc.nodesBetween(selection.from, selection.to, (node) => {
    nodes.push(node as unknown as Node);
  });

  return nodes;
};

export const RichTextEditor = React.forwardRef(
  (props: RichTextEditorProps, ref) => {
    const { onChange, value, onBlur } = props;
    const dispatch = useAppDispatch();
    const fontSize = useAppSelector((state) => state.richTextEditor.fontSize);

    let classes = [
      RichTextEditorStyles["wrapper"],
      "goldenBorder",
      "rounded-md",
    ];

    const [, createImageSignature] = useCreateImageSignatureMutation();
    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          blockquote: {
            HTMLAttributes: {
              class: RichTextEditorStyles["editorBlockQuote"],
            },
          },
          heading: {
            levels: [1, 2, 3],
          },
        }),
        Link.configure({
          HTMLAttributes: {
            class: RichTextEditorStyles["editorLink"],
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
        CustomImage(upload),
      ],
      content: value ? value : " ",
      onBlur() {
        onBlur();
      },
      onUpdate: ({ editor }) => {
        onChange(editor.getJSON());
      },
    });

    React.useEffect(() => {
      if (editor) {
        editor.view.dom.classList.add("w-full", "p-2");
      }
    }, [editor]);
    const editorRef: React.MutableRefObject<Editor | null> = React.useRef(null);
    React.useImperativeHandle(ref, () => ({
      clearContent: () => {
        editorRef.current?.commands.clearContent();
      },
      getText: () => {
        const text = editorRef.current?.getText();

        return text;
      },
      getJSON: () => {
        const json = editorRef.current?.getJSON();
        return json;
      },
    }));

    async function upload(file: File) {
      const url = `https://api.cloudinary.com/v1_1/da91pbpmj/upload`;
      const { data: signatureData } = await createImageSignature();

      if (signatureData) {
        const { signature, timestamp } = signatureData.createImageSignature;
        let formData = new FormData();
        formData.append("file", file);

        formData.append("signature", signature);
        formData.append("timestamp", timestamp.toString());
        formData.append("api_key", "446621691525293");
        const response = await fetch(url, {
          method: "post",
          body: formData,
        });
        const data = await response.json();

        return data.secure_url;
      }
      //   return response.data.src;
    }

    const handleOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (editor) {
        // Less intensive way to check what font size is on selected node
        const currentFontSize = editor.getAttributes("textStyle").fontSize;
        if (currentFontSize) {
          const sizeValue = currentFontSize.replace(/^\D+/g, "");
          dispatch(
            setFontSize({
              font: {
                value: sizeValue,
                label: currentFontSize,
                id: sizeValue,
              },
            })
          );
        } else {
          dispatch(
            setFontSize({
              font: {
                value: "12",
                label: "12px",
                id: "12",
              },
            })
          );
        }
      }
    };

    const editorToolbar = editor ? <Toolbar editor={editor} /> : null;

    if (!editor) return null;
    editorRef.current = editor;

    return (
      <>
        <div className={classes.join(" ")}>
          {editorToolbar}

          <EditorContent
            className={RichTextEditorStyles["root"]}
            editor={editor}
            onClick={handleOnClick}
          />
        </div>
      </>
    );
  }
);

RichTextEditor.displayName = "RichTextEditor";
