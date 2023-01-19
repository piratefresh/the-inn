import React from "react";
import {
  BubbleMenu,
  Content,
  Editor,
  EditorContent,
  useEditor,
} from "@tiptap/react";
import { useCreateImageSignatureMutation } from "generated/graphql";
import { ControllerRenderProps } from "react-hook-form";
import RichTextEditorStyles from "./RichTextEditor.module.scss";
import Toolbar from "./Toolbar";
import { useAppDispatch, useAppSelector } from "@store/store";
import {
  setFontFamily,
  setFontSize,
  setTextType,
} from "@features/richTextEditorSlice/richTextEditorSlice";
import { ParseOptions } from "prosemirror-model";
import { uploadImage } from "@utils/uploadImage";
import clsx from "clsx";
import { extensions } from "./Extensions";
import { MenuBar } from "./Popovers/MenuBar";

interface GetSelectedNodesProps {
  editor: Editor;
}

interface RichTextEditorProps extends ControllerRenderProps<any> {
  content?: string;
  error?: string;
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
    // const fontSize = useAppSelector((state) => state.richTextEditor.fontSize);
    const pressedKeys = React.useRef<Record<string, any>>({});

    let classes = [
      RichTextEditorStyles["wrapper"],
      "goldenBorder",
      "rounded-md",
      props.error && RichTextEditorStyles["error"],
    ];

    const [, createImageSignature] = useCreateImageSignatureMutation();
    const editor = useEditor({
      extensions: extensions({ upload }),
      content: value ? value : " ",
      onBlur() {
        onBlur();
      },
      onUpdate: ({ editor }) => {
        onChange(editor.getHTML());
      },
      onTransaction: ({ editor, transaction }) => {
        if (editor) {
          // Less intensive way to check what font size is on selected node

          const headerLevel = editor.getAttributes("heading").level;
          const isParagraph = editor.getAttributes("paragraph");
          const currentFontSize = editor.getAttributes("textStyle").fontSize;

          console.log("fontFamilySize: ", currentFontSize);

          const currentFontFamily =
            editor.getAttributes("textStyle").fontFamily;
          if (headerLevel)
            return dispatch(
              setTextType({
                textType: {
                  name: `Heading ${headerLevel}`,
                  value: headerLevel,
                },
              })
            );
          if (isParagraph)
            dispatch(
              setTextType({
                textType: { value: "paragraph", name: "Paragraph" },
              })
            );
          if (currentFontSize) {
            dispatch(
              setFontSize({
                font: {
                  value: currentFontSize,
                  name: currentFontSize,
                },
              })
            );
          } else {
            dispatch(
              setFontSize({
                font: {
                  value: "12px",
                  name: "12px",
                },
              })
            );
          }
          if (currentFontFamily) {
            dispatch(
              setFontFamily({
                font: {
                  value: currentFontFamily,
                  name: currentFontFamily,
                },
              })
            );
          } else {
            dispatch(
              setFontFamily({
                font: {
                  value: "Roboto",
                  name: "Roboto",
                },
              })
            );
          }
        }
      },
      parseOptions: {
        preserveWhitespace: true,
      },
    });

    React.useEffect(() => {
      if (editor) {
        editor.view.dom.classList.add("w-full", "p-6");
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
      getHTML: () => {
        const html = editorRef.current?.getHTML();
        return html;
      },
      setContent: (value: InsertContentProps["value"]) => {
        editorRef.current?.commands.setContent(value);
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
      const { data: signatureData } = await createImageSignature({});

      if (signatureData) {
        const { signature, timestamp } = signatureData.createImageSignature;

        const data = await uploadImage(file, signature, timestamp);
        return data.secure_url;
      }
    }

    const editorToolbar = editor ? <Toolbar editor={editor} /> : null;

    if (!editor) return null;
    editorRef.current = editor;

    return (
      <>
        <div className={classes.join(" ")}>
          {editorToolbar}
          <BubbleMenu className="p-4 bg-white" editor={editor}>
            <MenuBar fixed={true} editor={editor} />
          </BubbleMenu>
          <EditorContent
            className={clsx({
              [RichTextEditorStyles["root"]]: true,
            })}
            editor={editor}
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
