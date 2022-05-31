import ButtonsStyles from "./Buttons.module.css";
import { createStyles, Select } from "@mantine/core";

interface IFontSizeProps {
  onChange: (e: string | null) => void;
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

export const FontFamilyButton = ({ onChange }: IFontSizeProps) => {
  const { classes } = useStyles();
  const handleOnChange = (e: string | null) => {
    onChange(e);
  };
  return (
    <div className={ButtonsStyles["fontSizeContainer"]}>
      <Select
        placeholder="Roboto"
        defaultValue={FONT_FAMILY[0].value}
        onChange={(e) => handleOnChange(e)}
        data={FONT_FAMILY.sort((a, b) => a.label.localeCompare(b.label))}
        className={classes.wrapper}
      />
    </div>
  );
};
