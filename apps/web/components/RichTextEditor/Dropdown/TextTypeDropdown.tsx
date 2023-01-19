import { setTextType } from "@features/richTextEditorSlice/richTextEditorSlice";
import { useAppDispatch, useAppSelector } from "@store/store";
import { Editor } from "@tiptap/react";
import React from "react";
import { Select, SelectOption } from "ui";

interface TextTypeDropdownProps {
  onChange: (e: SelectOption) => void;
  editor: Editor;
}

const OPTIONS = [
  { value: "paragraph", name: "Paragraph" },
  { value: "1", name: "Heading 1" },
  { value: "2", name: "Heading 2" },
  { value: "3", name: "Heading 3" },
  { value: "4", name: "Heading 4" },
  { value: "5", name: "Heading 5" },
  { value: "6", name: "Heading 6" },
];

export const TextTypeDropdown = ({
  onChange,
  editor,
}: TextTypeDropdownProps) => {
  const dispatch = useAppDispatch();
  const textTypeState = useAppSelector(
    (state) => state.richTextEditor.textType
  );

  const handleOnChange = (e: SelectOption) => {
    console.log("e: ", e);
    onChange(e);
    dispatch(setTextType({ textType: e }));
  };

  return (
    <Select
      options={OPTIONS}
      selected={textTypeState}
      onChange={handleOnChange}
    />
  );
};
