import { SortingState } from "@tanstack/react-table";

export function encodeSorting(sorting: SortingState) {
  const result = sorting.map((item) => {
    if (item.desc) {
      return `${item.id}-desc`;
    }
    return `${item.id}-asc`;
  });
  return result.join(",");
}
