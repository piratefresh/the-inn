import { Link1Icon, TextAlignJustifyIcon } from "@radix-ui/react-icons";
import { Editor } from "@tiptap/react";
import React, { useMemo } from "react";
import { Tooltip } from "ui";
import {
  CenterAlignment,
  LeftAlignment,
  RightAlignment,
} from "../Buttons/AlignmentButtons";
import { DefaultToolbarButton } from "../Buttons/ListStyleButtons";
import { BoldButton, ItalicButton } from "../Buttons/TextStyleButtons";

export function MenuBar({ editor, fixed }: { editor: Editor; fixed: boolean }) {
  const [show, setShow] = React.useState(false);

  const onSetLink = React.useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      // fix later
      // @ts-ignore
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    return editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);

  const onTextAlignLeftChange = () => {
    if (editor.isActive({ textAlign: "left" })) {
      editor.chain().focus().unsetTextAlign().run();
    } else {
      editor.chain().focus().setTextAlign("left").run();
    }
  };
  const onTextAlignCenterChange = () => {
    if (editor.isActive({ textAlign: "center" })) {
      editor.chain().focus().unsetTextAlign().run();
    } else {
      editor.chain().focus().setTextAlign("center").run();
    }
  };
  const onTextAlignRightChange = () => {
    if (editor.isActive({ textAlign: "right" })) {
      editor.chain().focus().unsetTextAlign().run();
    } else {
      editor.chain().focus().setTextAlign("right").run();
    }
  };
  const onTextAlignUnset = () => {
    editor.chain().focus().unsetTextAlign().run();
  };

  if (editor.isActive("paragraph") || editor.isActive("heading"))
    return (
      <div className="flex flex-row gap-2 ">
        <BoldButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="h-5 w-5"
          isActive={editor.isActive("bold")}
        />

        <ItalicButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="h-5 w-5"
          isActive={editor.isActive("italic")}
        />

        <DefaultToolbarButton
          onClick={onSetLink}
          className="h-5 w-5"
          isActive={editor.isActive("link")}
          icon={<Link1Icon />}
        />
        <DefaultToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="h-5 w-5"
          isActive={editor.isActive("heading", { level: 2 })}
          icon={<span>H2</span>}
        />
        <DefaultToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className="h-5 w-5"
          isActive={editor.isActive("heading", { level: 3 })}
          icon={<span>H3</span>}
        />
      </div>
    );

  if (editor.isActive("image"))
    return (
      <div className="flex flex-row gap-2 ">
        <LeftAlignment
          onClick={onTextAlignLeftChange}
          className="h-5 w-5"
          isActive={editor.isActive({ textAlign: "left" })}
        />

        <CenterAlignment
          onClick={onTextAlignCenterChange}
          className="h-5 w-5"
          isActive={editor.isActive({ textAlign: "center" })}
        />

        <RightAlignment
          onClick={onTextAlignRightChange}
          className="h-5 w-5"
          isActive={editor.isActive({ textAlign: "right" })}
        />

        <DefaultToolbarButton
          onClick={onTextAlignUnset}
          className="h-5 w-5"
          isActive={editor.isActive({ textAlign: "" })}
          icon={<TextAlignJustifyIcon />}
        />
      </div>
    );

  return (
    <div
      className="visible absolute z-tooltip"
      style={{ inset: "auto auto 0px 0px" }}
    >
      Menu bar
    </div>
  );
}
