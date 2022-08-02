import ButtonsStyles from "./Buttons.module.css";
import { createStyles, Select } from "@mantine/core";
import { Editor } from "@tiptap/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "@store/store";
import {
  IFontOption,
  setFontSize,
} from "@features/richTextEditorSlice/richTextEditorSlice";

interface IFontSizeProps {
  onChange: (e: string | null) => void;
  editor: Editor;
}

const FONT_SIZES = [
  { value: "8", label: "8px", id: 0 },
  { value: "10", label: "10px", id: 1 },
  { value: "12", label: "12px", id: 2 },
  { value: "14", label: "14px", id: 3 },
  { value: "18", label: "18px", id: 4 },
  { value: "24", label: "24px", id: 5 },
  { value: "36", label: "36px", id: 6 },
];

const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    input: {
      border: "none",
    },
  },
}));

export const FontSizeButton = ({ onChange, editor }: IFontSizeProps) => {
  const { classes } = useStyles();

  const dispatch = useAppDispatch();
  const fontSize = useAppSelector((state) => state.richTextEditor.fontSize);

  const handleOnChange = (e: string | null) => {
    onChange(e);
    const fontSize: IFontOption = {
      value: e,
      label: `${e}px`,
      id: e,
    };
    dispatch(setFontSize({ font: fontSize }));

    return fontSize;
  };

  return (
    <div className={ButtonsStyles["fontSizeContainer"]}>
      <Select
        placeholder={fontSize.label}
        defaultValue={fontSize.value}
        onChange={(e) => handleOnChange(e)}
        data={FONT_SIZES}
        className={classes.wrapper}
        value={
          editor.isActive("textStyle", { fontFamily: fontSize.value })
            ? fontSize.value
            : "12px"
        }
      />
    </div>
  );
};
