import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

type Person = {
  firstName: string;
  lastName: string;
  email: string;
  gamesPlayed: number;
  experiance: string;
  message: string;
};

const defaultData: Person[] = [
  {
    firstName: "tanner",
    lastName: "linsley",
    email: "test.com",
    gamesPlayed: 100,
    experiance: "In Relationship",
    message: "Hey I wanna join",
  },
  {
    firstName: "joe",
    lastName: "dirt",
    email: "thisisalongassemail@email.com",
    gamesPlayed: 100,
    experiance: "In Relationship",
    message: "Hey I wanna join",
  },
  {
    firstName: "bob",
    lastName: "lee",
    email: "test.com",
    gamesPlayed: 100,
    experiance: "In Relationship",
    message: "Hey I wanna join",
  },
];

const columnHelper = createColumnHelper<Person>();

const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  columnHelper.accessor("firstName", {
    cell: (info) => info.getValue(),
    header: () => <span>First Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: "lastName",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("email", {
    header: () => "Email",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
    size: 400,
  }),
  columnHelper.accessor("gamesPlayed", {
    header: () => <span>Games Played</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("experiance", {
    header: "Experiance",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("message", {
    header: () => <span>Message</span>,
    footer: (info) => info.column.id,
  }),
];

export const Table = () => {
  const [data, setData] = React.useState(() => [...defaultData]);
  const rerender = React.useReducer(() => ({}), {})[1];

  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="p-2 text-white">
      <table className="border-separate border-spacing-y-4">
        <thead className="border-b border-t">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className="font-bold p-4 whitespace-nowrap" key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr className=" my-2" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  style={{ backgroundColor: "rgba(24, 24, 24, 1)" }}
                  className="px-4 py-2"
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {/* <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </table>
      <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button>
    </div>
  );
};

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & React.HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer rounded-small"}
      {...rest}
    />
  );
}
