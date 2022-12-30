import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationState,
  RowSelectionState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { TablePagination } from "./TablePagination";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

export interface OnChangeProps {
  pagination: PaginationState;
  query?: string;
  sortBy?: SortingState;
  filters?: { [key: string]: any };
}

export type TableProps<TData extends object> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  onChange?: (values: OnChangeProps) => void;
  pagination: PaginationState;
  pageCount?: number;
  setPagination?: OnChangeFn<PaginationState>;
  searchQuery?: string | null;
  setSorting?: OnChangeFn<SortingState>;
  setRowSelection?: OnChangeFn<RowSelectionState>;
  sorting?: SortingState;
  rowSelection?: RowSelectionState;
};

export const Table = <TData extends object>({
  data,
  columns,
  pagination,
  pageCount,
  onChange,
  setPagination,
  setRowSelection,
  searchQuery,
  setSorting,
  sorting,
  rowSelection,
}: TableProps<TData>) => {
  // const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      sorting,
      pagination,
    },
    pageCount: pageCount ?? -1,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
    manualPagination: true,
  });

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-brandLightBlack dark:text-gray-400">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="p-4 whitespace-nowrap"
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{
                    width:
                      header.getSize() !== 0 ? header.getSize() : undefined,
                  }}
                >
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none flex items-center gap-1"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <ChevronDownIcon className="h-5 w-5" />,
                        desc: <ChevronUpIcon className="h-5 w-5" />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              className="bg-white border-b h-6 max-h-6 overflow-y-hidden text-ellipsis dark:bg-brandLightBlack dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => (
                <td className="p-4 w-4" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <TablePagination table={table} pagination={pagination} />
    </div>
  );
};
