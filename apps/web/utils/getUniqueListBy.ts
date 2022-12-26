export function getUniqueListBy(
  arr: { [key: string]: string }[],
  key: string
): Record<string, string>[] {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}
