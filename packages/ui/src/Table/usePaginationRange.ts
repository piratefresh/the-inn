type Params = {
  currentPage: number;
  totalPages: number;
};

export const usePaginationRange = ({ currentPage, totalPages }: Params) => {
  const boundaryCount = 1;
  const siblingCount = 0;

  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const startPages = range(1, Math.min(boundaryCount, totalPages));
  const endPages = range(
    Math.max(totalPages - boundaryCount + 1, boundaryCount + 1),
    totalPages
  );

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      // Increment one because the page index from tanstack/table starts with 0
      currentPage + 1 - siblingCount,
      // Lower boundary when page is high
      totalPages - boundaryCount - siblingCount * 2 - 1
    ),
    // Greater than startPages
    boundaryCount + 2
  );

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      // Increment one because the page index from tanstack/table starts with 0
      currentPage + 1 + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2
    ),
    // Less than endPages
    endPages.length > 0 ? endPages[0] - 2 : totalPages - 1
  );

  // Basic list of items to render
  // e.g. itemList = [1, 'ellipsis', 4, 5, 6, 'ellipsis', 10]
  const itemList = [
    ...startPages,
    // Start ellipsis
    ...(siblingsStart > boundaryCount + 2
      ? ["..."]
      : boundaryCount + 1 < totalPages - boundaryCount
      ? [boundaryCount + 1]
      : []),
    // Sibling pages
    ...range(siblingsStart, siblingsEnd),
    // End ellipsis
    ...(siblingsEnd < totalPages - boundaryCount - 1
      ? ["..."]
      : totalPages - boundaryCount > boundaryCount
      ? [totalPages - boundaryCount]
      : []),
    ...endPages,
  ];

  return {
    items: itemList,
    currentPage: currentPage,
  };
};
