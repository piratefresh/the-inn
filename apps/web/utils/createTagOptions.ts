export interface TagOptions {
  label: string;
  id: string;
  value: string;
}

export const createTagOptions = (inputString: string): TagOptions => {
  return {
    label: inputString,
    id: inputString,
    value: inputString,
  };
};
