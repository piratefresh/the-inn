import React from "react";
import { Tooltip } from "@mantine/core";
import { OrderedList } from "@components/ui/Icons/OrderedListIcon";
import {
  BoxIcon,
  ImageIcon,
  Link1Icon,
  ListBulletIcon,
  ResetIcon,
  TextAlignJustifyIcon,
} from "@radix-ui/react-icons";
import { Editor } from "@tiptap/react";
import { uploadImage } from "@utils/uploadImage";
import { useCreateImageSignatureMutation } from "generated/graphql";
import {
  CenterAlignment,
  LeftAlignment,
  RightAlignment,
} from "./Buttons/AlignmentButtons";
import { FontFamilyDropdown } from "./Dropdown/FontFamilyDropdown";
import { FontSizeDropdown } from "./Dropdown/FontSizeDropdown";
import { DefaultToolbarButton } from "./Buttons/ListStyleButtons";
import { ToggleQuote } from "./Buttons/QuoteButtons";
import {
  BoldButton,
  ItalicButton,
  StrikeButton,
  UnderlineButton,
} from "./Buttons/TextStyleButtons";
import ToolbarStyles from "./Toolbar.module.scss";
import { HeadlessMenu, Menu, SelectOption, Text } from "ui";
import { TextTypeDropdown } from "./Dropdown/TextTypeDropdown";

type Level = 1 | 2 | 3 | 4 | 5 | 6;

const Toolbar = ({ editor }: { editor: Editor }) => {
  let classes = [ToolbarStyles["root"]];

  const [selectedColumns, setSelectedColumns] = React.useState(1);

  const fileInput = React.useRef<HTMLInputElement>(null);
  const [, createImageSignature] = useCreateImageSignatureMutation();

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
    return (
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        // fix later
        // @ts-ignore
        .setLink({ href: url })
        .run()
    );
  }, [editor]);

  const handleImageChange = React.useCallback(async () => {
    const files = fileInput.current?.files;

    const { data: signatureData } = await createImageSignature({});
    if (signatureData && files && files.length > 0) {
      const { signature, timestamp } = signatureData.createImageSignature;

      const image = await uploadImage(files[0], signature, timestamp);

      return editor.chain().focus().setImage({ src: image.secure_url }).run();
    }
  }, [editor, fileInput, createImageSignature]);

  const openFileBrowser = React.useCallback(
    () => fileInput.current?.click(),
    [fileInput]
  );

  const onTextTypeChange = (textType: SelectOption) => {
    console.log("textType: ", textType);
    if (textType.value === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else {
      editor
        .chain()
        .focus()
        .toggleHeading({ level: parseInt(textType.value) as Level })
        .run();
    }
  };
  const onFontSizeChange = (fontSize: SelectOption) => {
    editor.chain().focus().setFontSize(fontSize.value).run();
    editor.chain().focus().run();
  };
  const onFontFamilyChange = (fontFamily: SelectOption) => {
    editor
      .chain()
      .focus()
      .setFontFamily(fontFamily.value as string)
      .run();
    editor.chain().focus().run();
  };
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
  const onBold = () => {
    editor.chain().focus().toggleBold().run();
    editor.chain().focus().run();
  };
  const onItalic = () => {
    editor.chain().focus().toggleItalic().run();
    editor.chain().focus().run();
  };
  const onStrike = () => {
    editor.chain().focus().toggleStrike().run();
    editor.chain().focus().run();
  };
  const onUnderline = () => {
    editor.chain().focus().toggleUnderline().run();
    editor.chain().focus().run();
  };
  const onToggleBlockQuote = () => {
    editor.chain().focus().toggleBlockquote().run();
  };
  const onToggleBulletList = () => {
    editor.chain().focus().toggleBulletList().run();
  };
  const onToggleOrderedList = () => {
    editor.chain().focus().toggleOrderedList().run();
  };
  const unsetColumns = (n: number) => {
    editor.chain().focus().unsetColumns().run();
  };
  const setColumns = (n: number) => {
    editor.chain().focus().setColumns(n).run();
  };
  const onColumns = (n: number) => {
    editor.isActive("columns");
  };

  if (!editor) {
    return null;
  }

  return (
    <div className={classes.join(" ")}>
      <DefaultToolbarButton
        onClick={() => {}}
        className={ToolbarStyles.button}
        isActive={false}
        icon={<ResetIcon />}
      />
      {/* TEXT STYLES */}
      <div className="flex flex-row mr-4">
        <Tooltip label="Bold" position="bottom" withArrow>
          <BoldButton
            onClick={onBold}
            className={ToolbarStyles.button}
            isActive={editor.isActive("bold")}
          />
        </Tooltip>
        <Tooltip label="Italic" position="bottom" withArrow>
          <ItalicButton
            onClick={onItalic}
            className={ToolbarStyles.button}
            isActive={editor.isActive("italic")}
          />
        </Tooltip>
        <Tooltip label="Strikethrough" position="bottom" withArrow>
          <StrikeButton
            onClick={onStrike}
            className={ToolbarStyles.button}
            isActive={editor.isActive("strike")}
          />
        </Tooltip>
        <Tooltip label="Underline" position="bottom" withArrow>
          <UnderlineButton
            onClick={onUnderline}
            className={ToolbarStyles.button}
            isActive={editor.isActive("underline")}
          />
        </Tooltip>
      </div>

      <div className="flex flex-row mr-4 gap-2">
        {/* FONT SIZE AND FAMILY */}
        <Tooltip label="Text Type" position="bottom" withArrow>
          <TextTypeDropdown editor={editor} onChange={onTextTypeChange} />
        </Tooltip>
        <Tooltip label="Font Size" position="bottom" withArrow>
          <FontSizeDropdown editor={editor} onChange={onFontSizeChange} />
        </Tooltip>
        <Tooltip label="Font Family" position="bottom" withArrow>
          <FontFamilyDropdown onChange={onFontFamilyChange} editor={editor} />
        </Tooltip>
      </div>

      <div className="flex flex-row mr-4">
        {/* LIST */}
        <Tooltip label="Bullet List" position="bottom" withArrow>
          <DefaultToolbarButton
            onClick={onToggleBulletList}
            className={ToolbarStyles.button}
            isActive={editor.isActive("bulletList")}
            icon={<ListBulletIcon />}
          />
        </Tooltip>
        <Tooltip label="Numbered List" position="bottom" withArrow>
          <DefaultToolbarButton
            onClick={onToggleOrderedList}
            className={ToolbarStyles.button}
            isActive={editor.isActive("orderedList")}
            icon={<OrderedList />}
          />
        </Tooltip>
      </div>

      <div className="flex flex-row mr-4">
        <Tooltip label="Add Image" position="bottom" withArrow>
          <DefaultToolbarButton
            onClick={openFileBrowser}
            className={ToolbarStyles.button}
            isActive={editor.isActive("image")}
            icon={<ImageIcon />}
          />
        </Tooltip>
        <Tooltip label="Quote" position="bottom" withArrow>
          <ToggleQuote
            onClick={onToggleBlockQuote}
            className={ToolbarStyles.button}
            isActive={editor.isActive("blockquote")}
          />
        </Tooltip>
        <Tooltip label="Add Link" position="bottom" withArrow>
          <DefaultToolbarButton
            onClick={onSetLink}
            className={ToolbarStyles.button}
            isActive={editor.isActive("link")}
            icon={<Link1Icon />}
          />
        </Tooltip>
      </div>

      {/* Alignment */}
      <div className="flex flex-row mr-4">
        <Tooltip label="Left Alignment" position="bottom" withArrow>
          <LeftAlignment
            onClick={onTextAlignLeftChange}
            className={ToolbarStyles.button}
            isActive={editor.isActive({ textAlign: "left" })}
          />
        </Tooltip>
        <Tooltip label="Center Alignment" position="bottom" withArrow>
          <CenterAlignment
            onClick={onTextAlignCenterChange}
            className={ToolbarStyles.button}
            isActive={editor.isActive({ textAlign: "center" })}
          />
        </Tooltip>
        <Tooltip label="Right Alignment" position="bottom" withArrow>
          <RightAlignment
            onClick={onTextAlignRightChange}
            className={ToolbarStyles.button}
            isActive={editor.isActive({ textAlign: "right" })}
          />
        </Tooltip>
        <Tooltip label="Justify Alignment" position="bottom" withArrow>
          <DefaultToolbarButton
            onClick={onTextAlignUnset}
            className={ToolbarStyles.button}
            isActive={editor.isActive({ textAlign: "" })}
            icon={<TextAlignJustifyIcon />}
          />
        </Tooltip>
      </div>

      {/* WIP */}
      {/* <div className="flex flex-row mr-4">
        <Menu trigger={<Text color="hiContrast">Columns</Text>}>
          <HeadlessMenu.Item>
            <div className="flex p-4">
              <div className="flex flex-row items-center">
                {Array(4)
                  .fill(0)
                  .map((col, i) => (
                    <div
                      className={`${
                        ToolbarStyles[`tableSelection${selectedColumns}`]
                      }`}
                      onMouseOver={() => setSelectedColumns(i + 1)}
                      onClick={() => setColumns(i + 1)}
                    >
                      <BoxIcon fill="currentColor" />
                    </div>
                  ))}
                {`${selectedColumns}x4`}
              </div>
            </div>
          </HeadlessMenu.Item>
        </Menu>
      </div> */}

      <div onClick={() => editor.chain().focus().toggleBookmark().run()}>
        Bookmark
      </div>

      <input
        ref={fileInput}
        onChange={handleImageChange}
        id="file-input"
        type="file"
        name="name"
        hidden
      />
    </div>
  );
};

export default Toolbar;
