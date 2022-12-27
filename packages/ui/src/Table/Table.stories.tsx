import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Table } from "./Table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Button } from "../Button";
import { IndeterminateCheckbox } from "./IndeterminateCheckbox";
import { makeData, Person } from "./makeData";
import Link from "next/link";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "MGUI/Table",
  component: Table,
  parameters: {
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "rgb(13, 10, 0)" },
        { name: "facebook", value: "#3b5998" },
      ],
    },
  },
} as ComponentMeta<typeof Table>;

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
  columnHelper.accessor("experiance", {
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

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Table> = (args) => {
  const columns = React.useMemo(() => COLUMNS, []);
  const data = React.useMemo(() => makeData(150), []);

  return <Table columns={columns} data={data} />;
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};
