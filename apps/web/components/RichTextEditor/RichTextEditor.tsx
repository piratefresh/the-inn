import React from "react";
import FontFamily from "@tiptap/extension-font-family";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { Content, Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCreateImageSignatureMutation } from "generated/graphql";
import { ControllerRenderProps } from "react-hook-form";
import { TrailingNode } from "./Extensions/TrailingNode";
import CustomImage from "./Extensions/custom-image";
import { Float } from "./Extensions/float";
import { FontSize } from "./Extensions/font-size";
import RichTextEditorStyles from "./RichTextEditor.module.scss";
import Toolbar from "./Toolbar";
import { useAppDispatch, useAppSelector } from "@store/store";
import { setFontSize } from "@features/richTextEditorSlice/richTextEditorSlice";
import { ParseOptions } from "prosemirror-model";
import { Indent } from "./Extensions/wix-indent";
import ReactComponent from "./Extensions/react-component";
import { uploadImage } from "@utils/uploadImage";
// import { Indent } from "./Extensions/indent";

interface GetSelectedNodesProps {
  editor: Editor;
}

interface RichTextEditorProps extends ControllerRenderProps<any> {
  content?: string;
}

export interface InsertContentProps {
  value: Content;
  options?: {
    parseOptions?: ParseOptions;
    updateSelection?: boolean;
  };
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
    const pressedKeys = React.useRef<Record<string, any>>({});

    let classes = [
      RichTextEditorStyles["wrapper"],
      "goldenBorder",
      "rounded-md",
    ];

    const [, createImageSignature] = useCreateImageSignatureMutation();
    const editor = useEditor({
      extensions: [
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
      insertContent: (
        value: InsertContentProps["value"],
        options: InsertContentProps["options"]
      ) => {
        editorRef.current?.commands.insertContent(value, options);
      },
      insertContentAt: (
        position: number | Range,
        value: InsertContentProps["value"],
        options: InsertContentProps["options"]
      ) => {
        editorRef.current?.commands.insertContentAt(
          editor?.state.selection.to,
          value,
          options
        );
      },
    }));

    async function upload(file: File) {
      const { data: signatureData } = await createImageSignature();

      if (signatureData) {
        const { signature, timestamp } = signatureData.createImageSignature;

        const data = await uploadImage(file, signature, timestamp);
        return data.secure_url;
      }
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
            onKeyDown={(e) => {
              pressedKeys.current[e.key] = e.key;
              if (
                (pressedKeys.current["["] || pressedKeys.current["]"]) &&
                pressedKeys.current.Meta
              ) {
                e.preventDefault();
              }
            }}
            onKeyUp={() => {
              pressedKeys.current = {};
            }}
          />
        </div>
      </>
    );
  }
);

RichTextEditor.displayName = "RichTextEditor";
