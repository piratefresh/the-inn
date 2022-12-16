import { styled } from "../theme";
import { StyledDivider } from "./StyledDivider";

const StyledH1 = styled("h1", {
  fontFamily: "$fonts$trejanSans",
  textTransform: "uppercase",
  color: "$hiContrast",
});

export interface FormDividerProps {
  label: string;
}

export const FormDivider = ({ label }: FormDividerProps) => (
  <>
    <StyledH1>{label}</StyledH1>
    <StyledDivider />
  </>
);
