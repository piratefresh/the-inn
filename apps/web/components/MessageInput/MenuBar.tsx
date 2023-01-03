import Styles from "./MenuBar.module.scss";
import React, { Fragment } from "react";
import {
  FontBoldIcon,
  FontItalicIcon,
  StrikethroughIcon,
  CodeIcon,
  Pencil2Icon,
  HeadingIcon,
  PilcrowIcon,
  ListBulletIcon,
  ResetIcon,
  TextNoneIcon,
  DashIcon,
  QuoteIcon,
  ActivityLogIcon,
} from "@radix-ui/react-icons";
import { MenuItem } from "./MenuItem";

export const MenuBar = ({ editor }) => {
  const items = [
    {
      icon: <FontBoldIcon />,
      title: "Bold",
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive("bold"),
    },
    {
      icon: <FontItalicIcon />,
      title: "Italic",
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive("italic"),
    },
    {
      icon: <StrikethroughIcon />,
      title: "Strike",
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive("strike"),
    },
    {
      icon: <CodeIcon />,
      title: "Code",
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: () => editor.isActive("code"),
    },
    {
      icon: <Pencil2Icon />,
      title: "Highlight",
      action: () => editor.chain().focus().toggleHighlight().run(),
      isActive: () => editor.isActive("highlight"),
    },
    {
      type: "divider",
    },
    {
      icon: <HeadingIcon />,
      title: "Heading 1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <HeadingIcon />,
      title: "Heading 2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <PilcrowIcon />,
      title: "Paragraph",
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: () => editor.isActive("paragraph"),
    },
    {
      icon: <ListBulletIcon />,
      title: "Bullet List",
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
    },
    {
      icon: <ListBulletIcon />,
      title: "Ordered List",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList"),
    },
    {
      icon: <ActivityLogIcon />,
      title: "Task List",
      action: () => editor.chain().focus().toggleTaskList().run(),
      isActive: () => editor.isActive("taskList"),
    },
    {
      icon: <CodeIcon />,
      title: "Code Block",
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive("codeBlock"),
    },
    {
      type: "divider",
    },
    {
      icon: <QuoteIcon />,
      title: "Blockquote",
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive("blockquote"),
    },
    {
      icon: <DashIcon />,
      title: "Horizontal Rule",
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      type: "divider",
    },
    {
      icon: <DashIcon />,
      title: "Hard Break",
      action: () => editor.chain().focus().setHardBreak().run(),
    },
    {
      icon: <TextNoneIcon />,
      title: "Clear Format",
      action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
    },
    {
      type: "divider",
    },
    {
      icon: <ResetIcon />,
      title: "Undo",
      action: () => editor.chain().focus().undo().run(),
    },
    {
      icon: <ResetIcon />,
      title: "Redo",
      action: () => editor.chain().focus().redo().run(),
    },
  ];

  return (
    <div className={Styles.header}>
      {items.map((item, index) => (
        <Fragment key={index}>
          {item.type === "divider" ? (
            <div className={Styles.divider} />
          ) : (
            // fix later
            // @ts-ignore
            <MenuItem {...item} />
          )}
        </Fragment>
      ))}
    </div>
  );
};
