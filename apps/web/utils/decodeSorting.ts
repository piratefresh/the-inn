import { SortingState } from "@tanstack/react-table";

export function decodeSorting(sorting: string): SortingState {
  const splited = sorting.split(",");
  const result = splited.map((item) => {
    return item
      ? {
          id: item.includes("-") ? item.substring(1) : item,
          desc: item.includes("-"),
        }
      : null;
  });
  return result.filter(Boolean) as SortingState;
}
