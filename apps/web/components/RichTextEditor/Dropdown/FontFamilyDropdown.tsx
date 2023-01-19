import { Editor } from "@tiptap/react";
import { Select, SelectOption } from "ui";
import { setFontFamily } from "@features/richTextEditorSlice/richTextEditorSlice";
import { useAppDispatch, useAppSelector } from "@store/store";

interface IFontSizeProps {
  onChange: (e: SelectOption) => void;
  editor: Editor;
}

const OPTIONS = [
  { value: "Roboto", name: "Roboto" },
  { value: "Cambria", name: "Cambria" },
  { value: "Inter", name: "Inter" },
  { value: "serif", name: "serif" },
  { value: "Arial", name: "Arial" },
  { value: "'Helvetica Neue'", name: "Helvetica Neue" },
  { value: "'Noto Sans'", name: "Noto Sans" },
  { value: "'Times New Roman'", name: "Times New Roman" },
];

export const FontFamilyDropdown = ({ onChange, editor }: IFontSizeProps) => {
  const dispatch = useAppDispatch();
  const fontFamilyState = useAppSelector(
    (state) => state.richTextEditor.fontFamily
  );

  const handleOnChange = (e: SelectOption) => {
    onChange(e);
    dispatch(setFontFamily({ font: e }));
  };

  return (
    <Select
      options={OPTIONS}
      selected={fontFamilyState ?? OPTIONS[0]}
      onChange={handleOnChange}
    />
  );
};
