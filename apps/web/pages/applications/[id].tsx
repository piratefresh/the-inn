import { CampaignApplication } from "@components/CampaignApplication";
import { CampaignSideCard } from "@components/CampaignSideCard";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@consts/paging";
import {
  useAddPlayerApplicationMutation,
  useGetApplicationCampaignQuery,
  useGetCampaignQuery,
} from "@generated/graphql";
import { CampaignLayout } from "@layouts/CampaignLayout";
import {
  ColumnDef,
  createColumnHelper,
  PaginationState,
  RowSelectionState,
  SortingState,
} from "@tanstack/react-table";
import { encodeSorting } from "@utils/encodeSorting";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { nextAuthOptions } from "pages/api/auth/[...nextauth]";
import React, { useEffect } from "react";
import { css, IndeterminateCheckbox, Person, Table, Text, Button } from "ui";
import { OnChangeProps } from "ui/src/Table/Table";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "use-query-params";
import { format } from "date-fns";

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
        {`${info.row.original.firstName} ${info.row.original.lastName}`}
      </span>
    ),
    header: () => <span>Name</span>,
    footer: (info) => info.column.id,
    sortingFn: "text",
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
    header: "Experience",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("updatedAt", {
    header: "Updated At",
    footer: (info) => info.column.id,
    cell: (info) => (
      <div>{format(new Date(info.getValue()), "EEE',' MMM dd 'at' h bbb")}</div>
    ),
    sortingFn: "datetime",
  }),
  columnHelper.accessor("id", {
    header: "View",
    footer: (info) => info.column.id,
    cell: (info) => (
      <div className="flex flex-row items-center gap-8">
        <Link href={`/user/${info.getValue()}`} legacyBehavior>
          <Button size="large">View</Button>
        </Link>

        <Button color="blue" size="large">
          Approve
        </Button>
      </div>
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

interface GetPaginedDataProps extends OnChangeProps {
  data: any;
  after?: any;
  getCursor?: () => void;
}

const ApplicationPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [{ data: campaign, fetching }] = useGetCampaignQuery({
    variables: {
      id: id as string,
    },
  });

  // Url Param Query States
  const [params, setParams] = useQueryParams({
    pageSize: withDefault(NumberParam, DEFAULT_PAGE_SIZE),
    page: withDefault(NumberParam, DEFAULT_PAGE_INDEX),
    q: StringParam,
    sort: StringParam,
  });

  const {
    page: pageParam,
    pageSize: pageSizeParam,
    q: qParam,
    sort: sortParam,
  } = params;

  // External Table States
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [currentFilters, setCurrentFilters] = React.useState({});

  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: pageParam === 0 ? 1 : pageParam,
      pageSize: pageSizeParam,
    });

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const [{ data: applications, fetching: fetchingApplications }] =
    useGetApplicationCampaignQuery({
      variables: {
        campaignId: id as string,
        skip: (pagination.pageIndex - 1) * pagination.pageSize,
        take: pagination.pageSize,
        sort: sortParam,
      },
    });

  // DUMMY DATA
  const columns = React.useMemo(() => COLUMNS, []);
  const appData = React.useMemo<Person[]>(
    () =>
      applications
        ? applications.getApplicationCampaign.applications.map((app) => ({
            email: app.user.email,
            experience: app.experience,
            gamesPlayed: app.gamesPlayed,
            id: app.id,
            message: app.message,
            name: app.lastName,
            firstName: app.firstName,
            lastName: app.lastName,
            updatedAt: app.updatedAt,
          }))
        : [],
    [applications]
  );

  useEffect(() => {
    setParams(
      {
        ...params,
        page: pagination.pageIndex === 0 ? 1 : pagination.pageIndex,
        pageSize: pagination.pageSize ?? 10,
        // q: query || undefined,
        sort: encodeSorting(sorting) || undefined,
      },
      "replace"
    );
  }, [pagination, params, setParams, sorting]);

  if (fetching && !campaign && fetchingApplications && !applications)
    return <div>Loading....</div>;

  return (
    <div className="max-w-7xl mx-auto relative py-16">
      <div className="my-8">
        <Text size="7xl" color="lightContrast" className="font-trejanSans">
          Campaign Applications
        </Text>
      </div>

      <Table
        columns={columns}
        data={appData}
        pageCount={applications?.getApplicationCampaign.pageCount + 1}
        pagination={pagination}
        setPagination={setPagination}
        sorting={sorting}
        setSorting={setSorting}
        setRowSelection={setRowSelection}
        rowSelection={rowSelection}
      />
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
