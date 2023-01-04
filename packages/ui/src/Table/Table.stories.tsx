import React from "react";
import { Table } from "./Table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Button } from "../Button";
import { IndeterminateCheckbox } from "./IndeterminateCheckbox";
import { makeData, Person } from "./makeData";
import Link from "next/link";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Table> = {
  title: "MGUI/Table",
  component: Table,
};

export default meta;
type Story = StoryObj<typeof Table>;

const columnHelper = createColumnHelper<Person>();

const COLUMNS: ColumnDef<Person, any>[] = [
  {
    id: "select",
    size: 1,
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
      <div className="">
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
  columnHelper.accessor((row) => row.name, {
    id: "name",
    size: 1,
    cell: (info) => (
      <span className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {info.getValue()}
      </span>
    ),
    header: () => <span>Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("message", {
    id: "message",
    size: 300,
    minSize: 150,
    maxSize: 300,
    header: () => <span>Message</span>,
    footer: (info) => info.column.id,
    cell: (info) => (
      <div className="max-h-40 h-full overflow-y-auto w-full">
        {info.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor("gamesPlayed", {
    header: () => <span>Games Played</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("experience", {
    header: "Experiance",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("id", {
    header: "View",
    footer: (info) => info.column.id,
    cell: (info) => (
      <Link href={`/user/${info.getValue()}`}>
        <a>
          <Button size="large">View</Button>
        </a>
      </Link>
    ),
  }),
];

export const Primary: Story = {
  args: {},
  render: (args) => {
    const columns = React.useMemo(() => COLUMNS, []);
    const data = React.useMemo(() => makeData(150), []);
    return <Table pagination={} columns={columns} data={data} />;
  },
};
