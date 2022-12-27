import { CampaignApplication } from "@components/CampaignApplication";
import { CampaignSideCard } from "@components/CampaignSideCard";
import {
  useAddPlayerApplicationMutation,
  useGetApplicationCampaignQuery,
  useGetCampaignQuery,
} from "@generated/graphql";
import { CampaignLayout } from "@layouts/CampaignLayout";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { nextAuthOptions } from "pages/api/auth/[...nextauth]";
import React from "react";
import {
  css,
  IndeterminateCheckbox,
  Person,
  Table,
  Text,
  Button,
  makeData,
} from "ui";

const root = css({
  background:
    "linear-gradient(179.62deg, #0E0A00 -79.35%, #25120E -3.81%, #25120E 25.17%, #0D0A00 68.63%)",
});

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

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    req,
    res,
    nextAuthOptions(req, res)
  );
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

const ApplicationPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [{ data: campaign, fetching }] = useGetCampaignQuery({
    variables: {
      id: id as string,
    },
  });

  const [{ data: applications, fetching: fetchingApplications }] =
    useGetApplicationCampaignQuery({
      variables: {
        campaignId: id as string,
      },
    });

  // DUMMY DATA
  const columns = React.useMemo(() => COLUMNS, []);
  const data = React.useMemo(() => makeData(150), []);

  if (fetching && !campaign && fetchingApplications && !applications)
    return <div>Loading....</div>;

  return (
    <div className="max-w-7xl mx-auto relative py-16">
      <div className="my-8">
        <Text size="7xl" color="lightContrast" className="font-trejanSans">
          Campaign Applications
        </Text>
      </div>

      <Table columns={columns} data={data} />
    </div>
  );
};

ApplicationPage.layoutProps = {
  meta: {
    title: "campaign",
  },
  Layout: CampaignLayout,
};

export default ApplicationPage;
