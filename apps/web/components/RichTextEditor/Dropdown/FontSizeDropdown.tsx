import { Editor } from "@tiptap/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "@store/store";
import { setFontSize } from "@features/richTextEditorSlice/richTextEditorSlice";
import { SelectOption, Select } from "ui";

interface IFontSizeProps {
  onChange: (e: SelectOption) => void;
  editor: Editor;
}

const OPTIONS = [
  { value: "8px", name: "8px" },
  { value: "10px", name: "10px" },
  { value: "12px", name: "12px" },
  { value: "14px", name: "14px" },
  { value: "16px", name: "16px" },
  { value: "18px", name: "18px" },
  { value: "24px", name: "24px" },
  { value: "36px", name: "36px" },
];

export const FontSizeDropdown = ({ onChange, editor }: IFontSizeProps) => {
  const dispatch = useAppDispatch();
  const fontSize = useAppSelector((state) => state.richTextEditor.fontSize);

  const handleOnChange = (e: SelectOption) => {
    console.log("fontSize component E: ", e);
    onChange(e);

    dispatch(setFontSize({ font: fontSize }));
  };

  console.log("fontSize: ", fontSize);

  return (
    <Select
      placeholder={fontSize.name}
      onChange={handleOnChange}
      options={OPTIONS}
      selected={fontSize}
    />
  );
};
