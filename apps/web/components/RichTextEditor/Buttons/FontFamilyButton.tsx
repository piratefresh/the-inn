import ButtonsStyles from "./Buttons.module.css";
import { createStyles, Select } from "@mantine/core";
import { Editor } from "@tiptap/react";
import { useState } from "react";

interface IFontSizeProps {
  onChange: (e: string | null) => void;
  editor: Editor;
}

const FONT_FAMILY = [
  { value: "Roboto", label: "Roboto" },
  { value: "Cambria", label: "Cambria" },
  { value: "Inter", label: "Inter" },
  { value: "serif", label: "serif" },
  { value: "Arial", label: "Arial" },
  { value: "'Helvetica Neue'", label: "Helvetica Neue" },
  { value: "'Noto Sans'", label: "Noto Sans" },
  { value: "'Times New Roman'", label: "Times New Roman" },
];

const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    input: {
      border: "none",
    },
  },
}));

export const FontFamilyButton = ({ onChange, editor }: IFontSizeProps) => {
  const { classes } = useStyles();
  const [value, setValue] = useState(FONT_FAMILY[0].value);
  const handleOnChange = (e: string | null) => {
    onChange(e);
  };

  return (
    <div className={ButtonsStyles["fontSizeContainer"]}>
      <Select
        placeholder="Roboto"
        value={
          editor.isActive("textStyle", { fontFamily: value }) ? value : "Roboto"
        }
        onChange={(fontFamily: string) => {
          // handleOnChange(e);
          setValue(fontFamily);
          editor.chain().focus().setFontFamily(fontFamily).run();
        }}
        data={FONT_FAMILY.sort((a, b) => a.label.localeCompare(b.label))}
        className={classes.wrapper}
      />
    </div>
  );
};
