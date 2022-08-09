import FormDividerStyles from "./FormDivider.module.css";

interface FormDividerProps {
  label: string;
}

export const FormDivider = ({ label }: FormDividerProps) => {
  return (
    <>
      <h1 className="font-trejanSans text-2xl text-white my-4 uppercase">
        {label}
      </h1>
      <div className={FormDividerStyles.root}></div>
    </>
  );
};
