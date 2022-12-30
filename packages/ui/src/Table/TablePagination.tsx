import { PaginationState, Table } from "@tanstack/react-table";
import React from "react";
import { useEffect } from "react";
import { Button } from "../Button";
import { styled } from "../theme";
import { OnChangeProps } from "./Table";
import { usePaginationRange, pagination2 } from "./usePaginationRange";

interface TablePaginationProps {
  table: Table<any>;
  pagination: PaginationState;
}

export const PaginationButton = styled("button", {
  all: "unset",
  height: "32px",
  width: "32px",
  color: "$text200",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "$16",
  "@media (min-width: 768px)": {
    fontSize: "$18",
  },
});
export const PaginationEllipsis = styled("button", {
  all: "unset",
  height: "32px",
  width: "32px",
  color: "$text200",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "$16",
  "@media (min-width: 768px)": {
    fontSize: "$18",
  },
});

export const TablePagination = ({
  table,
  pagination,
}: TablePaginationProps) => {
  // const { items, currentPage } = usePaginationRange({
  //   currentPage: table.getState().pagination.pageIndex,
  //   totalPages: table.getPageCount(),
  // });

  const totalCount = React.useMemo(() => table.getPageCount() - 1, [table]);

  const { pages, currentPage } = pagination2(
    table.getState().pagination.pageIndex,
    table.getPageCount() - 1,
    5,
    9
  );

  const ButtonHandler = ({ page }: { page: string | number }) => {
    if (typeof page === "number") {
      const onClick = () => {
        table.setPageIndex(page);
      };

      return (
        <button
          className={`py-2 px-3 text-sm rounded-lg ${
            currentPage === page ? "bg-blue-600" : "bg-brandLightBlack"
          }  dark:hover:bg-gray-700 dark:hover:text-white`}
          onClick={onClick}
          type="button"
        >
          {page}
        </button>
      );
    }

    return <PaginationEllipsis>{page}</PaginationEllipsis>;
  };

  return (
    <nav
      className="flex justify-between items-center pt-4"
      aria-label="Table navigation"
    >
      <div className="inline-flex items-center -space-x-px text-gray-500 dark:text-gray-400">
        <button
          className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-brandLightBlack dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage() || currentPage === 1}
        >
          {"< Previous"}
        </button>
      </div>

      <div className="inline-flex items-center gap-4 -space-x-px text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex} of {totalCount}
          </strong>
        </span>

        <div className="flex gap-1 items-center">
          {pages.map((page) => (
            <ButtonHandler page={page} key={page} />
          ))}
        </div>

        <select
          className="py-2 px-3 text-sm font-normal rounded-lg bg-brandLightBlack text-gray-500 dark:text-gray-400"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option
              key={pageSize}
              value={pageSize}
              className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-md border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <button
        className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-brandLightBlack dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        onClick={() => table.nextPage()}
        // disabled={!table.getCanNextPage()}
      >
        {"Next >"}
      </button>
    </nav>
  );
};
