import Styles from "./styles.module.scss";

import CharacterCount from "@tiptap/extension-character-count";
import Highlight from "@tiptap/extension-highlight";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

import { MenuBar } from "./MenuBar";

export const MessageInput = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Highlight,
      TaskList,
      TaskItem,
      CharacterCount.configure({
        limit: 10000,
      }),
    ],
  });

  return (
    <div className={Styles.editor}>
      {editor && <MenuBar editor={editor} />}
      <EditorContent className={Styles.content} editor={editor} />
      <div className={Styles.footer}></div>
    </div>
  );
};
